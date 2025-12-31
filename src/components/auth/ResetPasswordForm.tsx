import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";

import Button from "../ui/button/Button";

import apiClient, { slowApiClient } from "@/API/ApiClient";
import { AxiosError } from "axios";
import {
  otpSchema,
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "./AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [loader, setLoader] = useState({
    generateOtp: false,
    verifyOtp: false,
    reset: false,
  });
  const [isEmailVerified, setIsEmailVerified] = useState({
    verified: false,
    token: null,
  });

  const navigate = useNavigate();
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    register: registerOtp,
    watch: watchOtp,
    setValue: setValueOtp,
    trigger: triggerOtp,
    formState: { errors: otpErrors },
  } = useForm<{ otp: string }>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleGenerateOtp = async () => {
    try {
      setLoader((prev) => ({ ...prev, generateOtp: true }));
      const email = watch("email");
      const valid = await trigger("email");
      if (!valid) return;
      const res = await slowApiClient.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
      setOtpGenerated(true);
      setCountdown(30);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as AxiosError<any>;
      if (error?.response?.data?.message) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message || "Failed to send OTP");
      }
    } finally {
      setLoader((prev) => ({ ...prev, generateOtp: false }));
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoader((prev) => ({ ...prev, verifyOtp: true }));
      const email = watch("email");
      const otp = watchOtp("otp");

      const valid = (await trigger("email")) && (await triggerOtp("otp"));

      if (!valid) return;

      const res = await apiClient.post("/auth/verify-forgot-otp", {
        email,
        otp,
      });
      toast.success(res.data.message);
      setIsEmailVerified({
        verified: true,
        token: res.data.otpToken,
      });
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as AxiosError<any>;
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message || "Failed to verify OTP");
      }
    } finally {
      setLoader((prev) => ({ ...prev, verifyOtp: false }));
    }
  };

  const handleReset = async (data: ResetPasswordSchemaType) => {
    try {
      setLoader((prev) => ({ ...prev, reset: true }));
      setServerError(null);
      const res = await slowApiClient.post(
        "/auth/reset-password",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "x-otp-verify-token": isEmailVerified.token,
          },
        }
      );
      toast.success(res.data.message);
      navigate("/signin");
      console.log(data);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as AxiosError<any>;
      if (error?.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Something went wrong");
      }
    } finally {
      setLoader((prev) => ({ ...prev, reset: false }));
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to VirtuStock
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Forgot Password
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(handleReset)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="ms2.o@gmail.com"
                    {...register("email")}
                    error={!!errors.email}
                    hint={errors.email?.message}
                  />
                </div>

                {!isEmailVerified.verified && otpGenerated && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <Input
                        maxLength={6}
                        inputMode="numeric"
                        placeholder="Enter OTP"
                        {...registerOtp("otp")}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setValueOtp("otp", value);
                        }}
                        error={!!otpErrors.otp}
                        hint={otpErrors.otp?.message}
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleVerifyOtp}
                      >
                        {loader.verifyOtp ? "verifying..." : "Verify Otp"}
                      </Button>
                    </div>
                  </div>
                )}

                {!isEmailVerified.verified && (
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateOtp}
                      disabled={loader.generateOtp || countdown > 0}
                    >
                      {loader.generateOtp
                        ? "Sending..."
                        : countdown > 0
                        ? `Resend in ${countdown}s`
                        : "Generate OTP"}
                    </Button>
                  </div>
                )}

                {isEmailVerified.verified && (
                  <>
                    <div>
                      <Label>
                        Password <span className="text-error-500">*</span>{" "}
                      </Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...register("password")}
                          error={!!errors.password}
                          hint={errors.password?.message}
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label>
                        Confirm Password{" "}
                        <span className="text-error-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...register("confirmPassword")}
                          error={!!errors.confirmPassword}
                          hint={errors.confirmPassword?.message}
                        />
                        <span
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showConfirmPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          )}
                        </span>
                      </div>
                    </div>
                    {serverError && (
                      <p className="text-error-500 text-sm mb-3 mt-3">
                        {serverError}
                      </p>
                    )}
                    <div>
                      <Button
                        type="submit"
                        className="w-full"
                        size="sm"
                        disabled={loader.reset}
                      >
                        {loader.reset ? "Resetting Password..." : "Reset"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

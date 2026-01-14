/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { UserInterface } from "@/Interface/IPO";
import { userSchema, userSchemaType } from "./UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import apiClient from "@/API/ApiClient";
import { AxiosError } from "axios";
import { toast } from "sonner";
import FileInput from "@/components/form/input/FileInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Store";
import { login } from "@/Store/authSlice";

interface UserMetaCardProps {
  user: UserInterface;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>;
}

export default function UserInfoCard({ user, setUser }: UserMetaCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const initialValuesRef = useRef<{
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    instagramUrl: string | undefined;
    linkedinUrl: string | undefined;
  } | null>(null);
  const [loader, setLoader] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
  const hasInitialized = useRef(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userSchemaType>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (user && !hasInitialized.current) {
      const initial = {
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        email: user.email || undefined,
        phone: user.phone || undefined,
        instagramUrl: user.instagramUrl || undefined,
        linkedinUrl: user.linkedinUrl || undefined,
      };
      initialValuesRef.current = initial;
      reset(initial);
      hasInitialized.current = true;
    }
  }, [user, reset]);

  const handleSave = async (values: userSchemaType) => {
    setLoader(true);
    const initial = initialValuesRef.current!;
    const changed: Partial<userSchemaType> = {};

    for (const key in values) {
      const typedKey = key as keyof userSchemaType;

      if (values[typedKey] !== initial[typedKey]) {
        changed[typedKey] = values[typedKey];
      }
    }

    try {
      setServerError(null);
      const formData = new FormData();
      formData.append(
        "updates",
        JSON.stringify(Object.keys(changed).length ? changed : {})
      );

      if (profilePic) {
        formData.append("file", profilePic);
      }
      const res = await apiClient.patch("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 0,
      });

      const refreshRes = await apiClient.post("/user/refresh-token");
      dispatch(login({ token: refreshRes.data["virtustock-token"] }));
      setUser((prev) => ({ ...prev, ...res.data.user }));
      toast.success(res.data.message);
      closeModal();
    } catch (err) {
      const error = err as AxiosError<any>;
      if (error?.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Something went wrong");
      }
    } finally {
      setLoader(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only PNG, JPG, and JPEG files are allowed");
      e.target.value = "";
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be under 2MB");
      e.target.value = "";
      return;
    }
    setProfilePic(file);
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg mb-2 font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user.firstName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user.lastName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user.phone}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <form onSubmit={handleSubmit(handleSave)} className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      {...register("firstName")}
                      error={!!errors.firstName}
                      hint={errors.firstName?.message}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input
                      {...register("lastName")}
                      error={!!errors.lastName}
                      hint={errors.lastName?.message}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input
                      maxLength={10}
                      {...register("phone", {
                        onChange: (e) => {
                          e.target.value = e.target.value.replace(/\D/g, "");
                        },
                      })}
                      error={!!errors.phone}
                      hint={errors.phone?.message}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Profile Pic</Label>
                    <FileInput
                      onChange={handleFileChange}
                      className="custom-class"
                    />
                  </div>
                </div>
                <div>
                  <h5 className="mt-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Social Links
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div>
                      <Label>Linkedin</Label>
                      <Input
                        type="text"
                        {...register("linkedinUrl")}
                        error={!!errors.linkedinUrl}
                        hint={errors.linkedinUrl?.message}
                      />
                    </div>

                    <div>
                      <Label>Instagram</Label>
                      <Input
                        type="text"
                        {...register("instagramUrl")}
                        error={!!errors.instagramUrl}
                        hint={errors.instagramUrl?.message}
                      />
                    </div>
                  </div>
                </div>
                {serverError && (
                  <p className="text-error-500 text-sm mb-3 mt-3">
                    {serverError}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeModal}
                disabled={loader}
              >
                Close
              </Button>
              <Button size="sm" type="submit">
                {loader ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

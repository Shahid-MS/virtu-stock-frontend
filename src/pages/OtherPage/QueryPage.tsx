/* eslint-disable @typescript-eslint/no-explicit-any */
import { slowApiClient } from "@/API/ApiClient";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EnvelopeIcon } from "@/icons";
import { RootState } from "@/Store";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
export interface QueryPayload {
  message: string;
  email?: string;
}
const QueryPage = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { token } = useSelector((state: RootState) => state.auth);

  let roles: string[] = [];
  if (token) {
    const decoded = jwtDecode<{ roles: string[] }>(token);
    roles = decoded.roles;
  }

  const isLoggedin = roles.includes("ROLE_USER");
  const submitQuery = async (payload: QueryPayload) => {
    const res = await slowApiClient.post("/feedback/query", payload);
    return res.data;
  };

  const handleSubmit = () => {
    if (!isLoggedin) {
      if (!email.trim()) {
        toast.error("Email is required");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Email is invalid");
        return;
      }
    }

    if (!message.trim()) {
      toast.error("Message is required");
      return;
    }

    sendQuery({
      message,
      ...(isLoggedin ? {} : { email }),
    });
  };

  const { mutate: sendQuery, isPending } = useMutation({
    mutationFn: submitQuery,
    onSuccess: (data) => {
      setMessage("");
      setEmail("");
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to send query");
    },
  });

  return (
    <>
      <ComponentCard title="Query">
        <div className="space-y-6">
          {!isLoggedin && (
            <div>
              <Label>Email</Label>
              <div className="relative">
                <Input
                  value={email}
                  placeholder="ms2.o@gmail.com"
                  type="email"
                  className="pl-[62px]"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <EnvelopeIcon className="size-6" />
                </span>
              </div>
            </div>
          )}
          <div>
            <Label>Message</Label>
            <TextArea
              value={message}
              onChange={(value) => setMessage(value)}
              rows={4}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button variant="outline" disabled={isPending} onClick={handleSubmit}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </ComponentCard>
    </>
  );
};

export default QueryPage;

import NotFound from "../../OtherPage/NotFound";
import { useParams } from "react-router";
import { FormEvent, useEffect, useState } from "react";

import { IPOInterface } from "../../../Interface/IPO";
import Loading from "../../OtherPage/Loading";
import Button from "../../../components/ui/button/Button";
import GMPForm from "./Update IPO Form Elements/GMPForm";
import SubscriptionsForm from "./Update IPO Form Elements/SubscriptionsForm";
import IssueSizeForm from "./Update IPO Form Elements/IssueSizeForm";
import VerdictForm from "./Update IPO Form Elements/VerdictForm";
import apiClient from "../../../API/ApiClient";
import IPOHeader from "@/pages/IPO/IPOHeader";
import { updateIpoSchema, updateIpoSchemaSchemaType } from "./UpdateIpoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function UpdateIPO() {
  const { id } = useParams();
  const [ipo, setIpo] = useState<IPOInterface>();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<updateIpoSchemaSchemaType>({
    resolver: zodResolver(updateIpoSchema),
  });

  useEffect(() => {
    const fetchIpo = async () => {
      try {
        const res = await apiClient.get(`/ipo/${id}`);
        setIpo(res.data);
      } catch {
        setIpo(undefined);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 250);
      }
    };
    fetchIpo();
  }, [id]);

  const onSubmit = async (data: updateIpoSchemaSchemaType) => {
    console.log(data);
    try {
      const res = await apiClient.put(`/admin/ipo/${ipo?.id}`, data);
      toast.success(res.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (ipo === undefined || ipo === null) {
    return <NotFound />;
  }

  return (
    <>
      <div className="space-y-6">
        <IPOHeader ipo={ipo} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-6">
              <SubscriptionsForm
                ipo={ipo}
                setIpo={setIpo}
                register={register}
                setValue={setValue}
                errors={errors}
              />

              <IssueSizeForm
                ipo={ipo}
                setIpo={setIpo}
                register={register}
                setValue={setValue}
                errors={errors}
              />
            </div>

            <div className="space-y-6">
              {/* <GMPForm
                ipo={ipo}
                setIpo={setIpo}
                setUpdatedFields={setUpdatedFields}
              /> */}

              {/* <VerdictForm
                ipo={ipo}
                setIpo={setIpo}
                setUpdatedFields={setUpdatedFields}
              /> */}
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <Button className="w-1/4" variant="outline" type="submit">
              Update IPO
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

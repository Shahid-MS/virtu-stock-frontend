import React, { useEffect, useState } from "react";
import ComponentCard from "../../../../components/common/ComponentCard";
import { AppliedIPOInterface } from "../../../../Interface/IPO";
import apiClient from "../../../../API/ApiClient";
import { useParams } from "react-router";
import Button from "../../../../components/ui/button/Button";
import IPOHeader from "@/pages/IPO/IPOHeader";
import Loading from "@/pages/OtherPage/Loading";

const UpdateAppliedIPO = () => {
  const { id } = useParams();
  const [appliedIpo, setAppliedIpo] = useState<AppliedIPOInterface>();
  const [loading, setLoading] = useState(true);
  const [updatedFields, setUpdatedFields] =
    useState<Partial<AppliedIPOInterface>>();

  useEffect(() => {
    const fetchAppliedIpo = async () => {
      try {
        const res = await apiClient.get(`/user/applied-ipo/${id}`);
        setAppliedIpo(res.data);
      } catch {
        // setAppliedIpo(undefined);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 250);
      }
    };
    fetchAppliedIpo();
  }, [id]);

  console.log(appliedIpo);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="space-y-6">
        <IPOHeader ipo={appliedIpo?.ipo} />
      </div>

      {/* <form
        className="space-y-6"
        //    onSubmit={handleSubmit}
      >
        <ComponentCard
          title={
            appliedIpo?.ipo.name !== undefined ? appliedIpo.ipo.name : "Hello"
          }
        >
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-6"> */}
      {/* <SubscriptionsForm
                ipo={ipo}
                setIpo={setIpo}
                setUpdatedFields={setUpdatedFields}
              />
              <IssueSizeForm
                ipo={ipo}
                setIpo={setIpo}
                setUpdatedFields={setUpdatedFields}
              />
            </div>

            <div className="space-y-6">
              <GMPForm
                ipo={ipo}
                setIpo={setIpo}
                setUpdatedFields={setUpdatedFields}
              />

              <VerdictForm
                ipo={ipo}
                setIpo={setIpo}
                setUpdatedFields={setUpdatedFields}
              /> */}
      {/* </div>
          </div>
        </ComponentCard>
        <div className="pt-4 flex justify-center">
          <Button className="w-1/4" variant="outline" type="submit">
            Update Applied
          </Button>
        </div>
      </form> */}
    </>
  );
};

export default UpdateAppliedIPO;

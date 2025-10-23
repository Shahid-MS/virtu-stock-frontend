import NotFound from "../../OtherPage/NotFound";
import { useParams } from "react-router";
import { FormEvent, useEffect, useState } from "react";

import { apiClient } from "../../../API/ApiClient";
import { IPOInterface } from "../../../Interface/IPO";
import Loading from "../../OtherPage/Loading";
import ComponentCard from "../../../components/common/ComponentCard";

import Button from "../../../components/ui/button/Button";
import GMPForm from "./Update IPO Form Elements/GMPForm";
import SubscriptionsForm from "./Update IPO Form Elements/SubscriptionsForm";
import IssueSizeForm from "./Update IPO Form Elements/IssueSizeForm";
import VerdictForm from "./Update IPO Form Elements/VerdictForm";

export default function UpdateIPO() {
  const { id } = useParams();
  const [ipo, setIpo] = useState<IPOInterface>();
  const [loading, setLoading] = useState(true);
  const [updatedFields, setUpdatedFields] = useState<Partial<IPOInterface>>();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!updatedFields || Object.keys(updatedFields).length === 0) {
      alert("No changes detected.");
      return;
    }
    const confirmed = window.confirm(
      `Are you sure you want to update the IPO"?`
    );
    if (!confirmed) return;
    e.preventDefault();
    if (!ipo) return;

    try {
      console.log(updatedFields);
      await apiClient.put(`/admin/ipo/${ipo.id}`, updatedFields);
      alert("IPO updated successfully ✅");
      setUpdatedFields({});
    } catch (error) {
      console.error("Error updating IPO:", error);
      alert("Failed to update IPO ❌");
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
      <form className="space-y-6" onSubmit={handleSubmit}>
        <ComponentCard title={ipo.name}>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-6">
              <SubscriptionsForm
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
              />
            </div>
          </div>
        </ComponentCard>
        <div className="pt-4 flex justify-center">
          <Button className="w-1/4" variant="outline" type="submit">
            Update IPO
          </Button>
        </div>
      </form>
    </>
  );
}

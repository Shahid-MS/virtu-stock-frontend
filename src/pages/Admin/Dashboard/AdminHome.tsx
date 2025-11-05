
import apiClient from "../../../API/ApiClient";
import ComponentCard from "../../../components/common/ComponentCard";
import { IPOInterface } from "../../../Interface/IPO";
import Loading from "../../OtherPage/Loading";
import NotFound from "../../OtherPage/NotFound";
import AdminHomeIPO from "./AdminHomeIPO";
import { useEffect, useState } from "react";

export default function AdminHome() {
  const [ipos, setIpos] = useState<IPOInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchIpos = async () => {
      const res = await apiClient.get("/ipo");
      setIpos(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 250);
    };
    fetchIpos();
  }, []);
  if (loading) {
    return <Loading />;
  }

  if (!ipos || ipos.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="IPOs">
          <AdminHomeIPO ipos={ipos} />
        </ComponentCard>
      </div>
    </>
  );
}

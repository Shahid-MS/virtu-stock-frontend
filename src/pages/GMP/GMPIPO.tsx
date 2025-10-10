import NotFound from "../OtherPage/NotFound";
import { useParams } from "react-router";
import GMPHeader from "./GMPHeader";
import GMPTable from "./GMPTable";
import { useEffect, useState } from "react";
import { apiClient } from "../../API/ApiClient";
import { IPOInterface } from "../../Interface/IPO";
import Loading from "../OtherPage/Loading";

export default function GMPIPO() {
  const { id } = useParams();
  const [ipo, setIpo] = useState<IPOInterface>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIpo = async () => {
      const res = await apiClient.get(`/ipo/${id}`);
      setIpo(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 250);
    };
    fetchIpo();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (ipo === undefined || ipo === null) {
    return <NotFound />;
  }

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <GMPHeader ipo={ipo} />
          <GMPTable ipo={ipo} />
        </div>
      </div>
    </>
  );
}

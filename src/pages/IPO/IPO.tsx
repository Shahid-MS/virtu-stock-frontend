import IPOHeader from "./IPOHeader";
import IPODetails from "./IPODetails";
import StrengthRisks from "./StrengthRisks";
import NotFound from "../OtherPage/NotFound";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { IPOInterface } from "../../Interface/IPO";
import Loading from "../OtherPage/Loading";
import apiClient from "../../API/ApiClient";

export default function IPO() {
  const { id } = useParams();
  const [ipo, setIpo] = useState<IPOInterface | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIpo = async () => {
      try {
        const res = await apiClient.get(`/ipo/${id}`);
        setIpo(res.data);
      } catch {
        setIpo(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 250);
      }
    };
    fetchIpo();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!ipo) {
    return <NotFound />;
  }

  return (
    <>
      <div className="space-y-6">
        <IPOHeader ipo={ipo} />
        <IPODetails ipo={ipo} />
        <StrengthRisks ipo={ipo} />
      </div>
    </>
  );
}

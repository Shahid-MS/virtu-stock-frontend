import HomeIPO from "./HomeIPO";
import { useEffect, useState } from "react";

import { IPOInterface } from "../../Interface/IPO";
import Loading from "../OtherPage/Loading";
import NotFound from "../OtherPage/NotFound";
import apiClient from "../../API/ApiClient";

export default function Home() {
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
        <HomeIPO ipos={ipos} />
      </div>
    </>
  );
}

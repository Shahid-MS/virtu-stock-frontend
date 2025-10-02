import ipos from "../../Data/ipos";
import NotFound from "../OtherPage/NotFound";
import { useParams } from "react-router";
import GMPHeader from "./GMPHeader";
import GMPTable from "./GMPTable";

export default function GMPIPO() {
  const { id } = useParams();
  const ipo = ipos.find((item) => item.id === id);
  if (!ipo) {
    return <NotFound />;
  }
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <GMPHeader />
          <GMPTable />
        </div>
      </div>
    </>
  );
}

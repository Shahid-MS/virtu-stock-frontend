import IPOHeader from "./IPOHeader";
import IPODetails from "./IPODetails";

export default function IPO() {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <IPOHeader />
          <IPODetails />
        </div>
      </div>
    </>
  );
}


import AppliedIPO from "./AppliedIPO";
import IPOAlloted from "./IPOAlloted";
import MonthlyProfit from "./MonthlyProfit";

export default function UserHome() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <IPOAlloted />
        </div>

        <div className=" col-span-12  md:col-span-6 md:order-2">
          <MonthlyProfit />
        </div>
        <div className=" col-span-12  md:col-span-6 md:order-1">
          <AppliedIPO />
        </div>
      </div>
    </>
  );
}

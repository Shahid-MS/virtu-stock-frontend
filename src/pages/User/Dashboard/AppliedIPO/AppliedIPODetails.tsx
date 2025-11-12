import { AppliedIPOInterface } from "../../../../Interface/IPO";
import { Dispatch, SetStateAction } from "react";

import AppliedIPOdetail from "./AppliedIPOdetail";
interface AppliedIPODetailsInterface {
  appliedIpo: AppliedIPOInterface;
  setAppliedIpo: Dispatch<SetStateAction<AppliedIPOInterface | undefined>>;
}
export default function AppliedIPODetails({
  appliedIpo,
  setAppliedIpo,
}: AppliedIPODetailsInterface) {
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
              <AppliedIPOdetail
                appliedIpo={appliedIpo}
                setAppliedIpo={setAppliedIpo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

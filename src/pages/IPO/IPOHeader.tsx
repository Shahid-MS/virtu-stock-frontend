import { useParams } from "react-router";
import ipos from "../../Data/ipos";
import { INRFormat } from "../../Helper/INRHelper";

export default function UserMetaCard() {
  const { id } = useParams();
  const ipo = ipos.find((item) => item.id === id);

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img
                className="w-full h-full object-contain"
                src={ipo?.logo}
                alt={ipo?.name}
              />
            </div>
            <div className="order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {ipo?.name}
              </h4>
              <div className=" hidden xl:flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {ipo?.symbol}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {ipo?.status}
                </p>
              </div>
            </div>
            <div className="flex items-center order-3 gap-2 grow  xl:justify-end">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="text-2xl font-medium text-gray-800 dark:text-white/90">
                    {INRFormat(ipo?.minAmount)}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      / {ipo?.minQty} shares
                    </span>
                  </p>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Minimum Investment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

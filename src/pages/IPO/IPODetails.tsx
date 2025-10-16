import { dateFormat } from "../../Helper/dateHelper";
import SubscriptionRateTable from "./SubscriptionRateTable";
import { IPOProps } from "../../Interface/IPO";
import { Link } from "react-router";
import { INRFormat } from "../../Helper/INRHelper";

export default function IPODetails({ ipo }: IPOProps) {
  console.log(ipo.issueSize);
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Bidding Dates
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {dateFormat(ipo?.startDate)}
                  <span className="mx-1 text-gray-400 dark:text-gray-500">
                    -
                  </span>
                  {dateFormat(ipo?.endDate)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Price Range
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {INRFormat(ipo?.minPrice)} - {ipo?.maxPrice}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Minimum Investment
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {INRFormat(ipo?.minPrice * ipo?.minQty)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Lot
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {ipo?.minQty}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Issue Size
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  ₹ {ipo.issueSize.totalIssueSize}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Listing Date
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {dateFormat(ipo?.listingDate)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  IPO Doc
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  <a
                    href={ipo?.prospectusUrl}
                    className="text-green-600 underline hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    target="_blank"
                  >
                    Link
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  GMP
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  <Link
                    to={`/ipo/gmp/${ipo?.id}`}
                    className="text-green-600 underline hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    Link
                  </Link>
                </p>
              </div>

              <div className="col-span-2 lg:col-span-4">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90 mb-2">
                  Subscription Rate
                </p>
                <SubscriptionRateTable subscription={ipo.subscriptions} />
              </div>

              <div className="col-span-2 lg:col-span-4">
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  About
                </p>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  {ipo?.about}
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://groww.in/"
            target="_blank"
            className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <img src="\images\icons\GrowwLogo.png" className="w-4 h-4" />
            Apply Now
          </a>
        </div>
      </div>
    </>
  );
}

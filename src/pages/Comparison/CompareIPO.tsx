import { Link, useLocation } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";

import Loading from "../OtherPage/Loading";
import { verdictColorMap } from "../../Enum/Verdict";
import { INRFormat } from "../../Helper/INRHelper";

import NotFound from "../OtherPage/NotFound";
import Pagination from "@/Pagination/Pagination";
import { usePagination } from "@/Pagination/IpoPaginationContext";
import { useEffect } from "react";

export default function CompareIPO() {
  const { ipos, loading, pagination, setPageNumber } = usePagination();
  const location = useLocation();
  useEffect(() => {
    setPageNumber(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (loading) return <Loading />;

  if (!ipos.length) return <NotFound />;
  return (
    <>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    rowSpan={2}
                  >
                    Company
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    rowSpan={2}
                  >
                    Issue Price
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                    colSpan={3}
                  >
                    IssueSize
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    rowSpan={2}
                  >
                    GMP
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    rowSpan={2}
                  >
                    Retailer Subs Rate
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    rowSpan={2}
                  >
                    Lot
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    rowSpan={2}
                  >
                    Expected Profit
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    rowSpan={2}
                  >
                    Review
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Fresh
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Offer for Sale
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-3 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {ipos.map((ipo) => (
                  <TableRow key={ipo.id}>
                    <TableCell className="px-3 py-3 sm:px-6 text-start">
                      <Link to={`/ipo/${ipo.id}`}>
                        <div className="flex items-center gap-3">
                          <div className="h-[40px] w-[40px] overflow-hidden rounded-md">
                            <img
                              src={ipo.logo}
                              className="h-[40px] w-[40px]"
                              alt={ipo.name}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {ipo.name.split(" ")[0]}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="px-3 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {INRFormat(ipo?.minPrice)} - {ipo?.maxPrice}
                    </TableCell>

                    <TableCell className="px-3 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {ipo.issueSize.fresh}
                    </TableCell>
                    <TableCell className="px-3 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {ipo.issueSize.offerForSale}
                    </TableCell>
                    <TableCell className="px-3 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {ipo.issueSize.totalIssueSize}
                    </TableCell>
                    <TableCell className="px-3 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Link
                        to={`/ipo/gmp/${ipo.id}`}
                        className="flex flex-col items-start"
                      >
                        <span>{INRFormat(ipo.gmp[0].gmp)}</span>
                        <span className="text-gray-400 text-xs">
                          {((ipo.gmp[0].gmp / ipo.maxPrice) * 100).toFixed(2)}%
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="px-3 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {ipo.subscriptions[2].subsvalue}x
                    </TableCell>

                    <TableCell className="px-3 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                      {ipo.minQty}
                    </TableCell>

                    <TableCell className="px-3 py-3  text-center text-gray-500 text-theme-sm dark:text-gray-400">
                      {INRFormat(ipo.gmp[0].gmp * ipo.minQty)}
                    </TableCell>

                    <TableCell className="px-3 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={verdictColorMap[ipo.verdict] || "light"}
                      >
                        {ipo.verdict.replace("_", " ")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination
            pageNumber={pagination.pageNumber}
            pageSize={pagination.pageSize}
            totalPages={pagination.totalPages}
            totalElements={pagination.totalElements}
            onPageChange={setPageNumber}
          />
        </div>
      </div>
    </>
  );
}

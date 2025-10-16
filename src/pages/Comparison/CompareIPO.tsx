import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { useEffect, useState } from "react";
import { apiClient } from "../../API/ApiClient";
import { IPOInterface } from "../../Interface/IPO";
import Loading from "../OtherPage/Loading";
import { verdictColorMap } from "../../Enum/Verdict";
import { INRFormat } from "../../Helper/INRHelper";

export default function CompareIPO() {
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
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Compare IPO
        </h3>
        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      rowSpan={2}
                    >
                      Company
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      rowSpan={2}
                    >
                      Issue Price
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                      colSpan={3}
                    >
                      IssueSize
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      rowSpan={2}
                    >
                      GMP
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      rowSpan={2}
                    >
                      Retailer Subs Rate
                    </TableCell>

                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      rowSpan={2}
                    >
                      Verdict
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Fresh
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Offer for Sale
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {ipos.map((ipo) => (
                    <TableRow key={ipo.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <Link to={`/ipo/${ipo.id}`}>
                          <div className="flex items-center gap-3">
                            <div>
                              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                {ipo.name}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {INRFormat(ipo?.minPrice)} - {ipo?.maxPrice}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        {ipo.issueSize.fresh}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        {ipo.issueSize.offerForSale}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        {ipo.issueSize.totalIssueSize}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <Link
                          to={`/ipo/gmp/${ipo.id}`}
                          className="flex flex-col items-start"
                        >
                          <span>{INRFormat(ipo.gmp[0].gmp)}</span>
                          <span className="text-gray-400 text-xs">
                            {((ipo.gmp[0].gmp / ipo.maxPrice) * 100).toFixed(2)}
                            %
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                        {ipo.subscriptions[1].subsvalue}x
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={verdictColorMap[ipo.verdict] || "light"}
                        >
                          {ipo.verdict}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

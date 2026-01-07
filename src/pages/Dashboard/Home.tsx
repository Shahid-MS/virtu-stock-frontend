import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import Badge from "../../components/ui/badge/Badge";
import { dateFormat } from "../../Helper/dateHelper";
import { Link } from "react-router";
import { IPOStatusColorMap } from "../../Enum/IPOStatus";
import Pagination from "../../Pagination/Pagination";

import Loading from "../OtherPage/Loading";
import NotFound from "../OtherPage/NotFound";
import InternalServerError from "../OtherPage/InternalServerError";
import { usePagination } from "@/Pagination/IpoPaginationContext";

export const Home = () => {
  const { ipos, error, loading, pagination, setPageNumber } = usePagination();

  if (loading) return <Loading />;
  if (error) return <InternalServerError />;
  if (!ipos.length) return <NotFound />;
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Company
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Type
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Open Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Close Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {ipos.map((ipo) => (
                <TableRow key={ipo.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Link to={`/ipo/${ipo.id}`}>
                      <div className="flex items-center gap-3">
                        <div className="h-[40px] w-[40px] shrink-0 overflow-hidden rounded-md">
                          <img
                            src={ipo.logo}
                            className="h-[40px] w-[40px] object-contain"
                            alt={ipo.name}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {ipo.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={ipo.type === "EQ" ? "success" : "warning"}
                    >
                      {ipo.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {dateFormat(ipo.startDate)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {dateFormat(ipo.endDate)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={IPOStatusColorMap[ipo.status] || "light"}
                    >
                      {ipo.status}
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
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import Badge from "../../../components/ui/badge/Badge";
import { dateFormat } from "../../../Helper/dateHelper";
import { IPOStatusColorMap } from "../../../Enum/IPOStatus";
import Loading from "@/pages/OtherPage/Loading";
import NotFound from "@/pages/OtherPage/NotFound";
import InternalServerError from "@/pages/OtherPage/InternalServerError";

import Pagination from "@/Pagination/Pagination";
import { usePagination } from "@/Pagination/IpoPaginationContext";
import { TrashBinIcon } from "@/icons";
import { confirmDialog } from "primereact/confirmdialog";
import apiClient from "@/API/ApiClient";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const AdminIpo = () => {
  const { ipos, loading, error, pagination, setPageNumber } = usePagination();

  const queryClient = useQueryClient();
  const handleDeleteIpo = (ipoId: string, name: string) => {
    confirmDialog({
      message: `Are you sure you want to delete ${name}?`,
      header: "Confirm Action",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes",
      rejectLabel: "No",

      accept: async () => {
        try {
          const res = await apiClient.delete(`/admin/ipo/${ipoId}`);
          toast.success(res.data.message);
          if (ipos.length === 1 && pagination.pageNumber > 0) {
            setPageNumber(pagination.pageNumber - 1);
          } else {
            queryClient.invalidateQueries({ queryKey: ["ipos"] });
          }
        } catch (err) {
          const error = err as AxiosError<any>;
          if (error?.response?.data?.message) {
            toast.error(error.response.data.message || "Failed to fetch");
          }
        }
      },
    });
  };

  if (loading) return <Loading />;
  if (error) return <InternalServerError />;
  if (!ipos.length) return <NotFound />;
  return (
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
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {ipos.map((ipo) => (
              <TableRow key={ipo.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <Link to={`/admin/ipo/${ipo.id}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-15 h-10 overflow-hidden">
                        <img src={ipo.logo} alt={ipo.name} />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {ipo.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {ipo.symbol}
                        </span>
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
                <TableCell className="px-4 py-3 text-gray-500 text-theme-lg dark:text-gray-400 ">
                  <button onClick={() => handleDeleteIpo(ipo.id, ipo.name)}>
                    <TrashBinIcon />
                  </button>
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
  );
};

export default AdminIpo;

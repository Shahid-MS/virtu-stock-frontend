import apiClient from "@/API/ApiClient";
import { IPOInterface } from "@/Interface/IPO";
import { createContext, useContext, useEffect, useState } from "react";

interface PaginationState {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  lastPage: boolean;
}

interface PaginationContextType {
  ipos: IPOInterface[];
  loading: boolean;
  pagination: PaginationState;
  setPageNumber: (page: number) => void;
}

export const PaginationContext = createContext<PaginationContextType | null>(
  null
);

export const usePagination = () => useContext(PaginationContext)!;

export const PaginationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ipos, setIpos] = useState<IPOInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState<PaginationState>({
    pageNumber: 0,
    pageSize: 7,
    totalPages: 0,
    totalElements: 0,
    lastPage: false,
  });

  const fetchIpos = async () => {
    setLoading(true);
    const res = await apiClient.get("/ipo", {
      params: {
        page: pagination.pageNumber,
        size: pagination.pageSize,
      },
    });
    setIpos(res.data.content);
    setPagination((prev) => ({
      ...prev,
      totalPages: res.data.totalPages,
      totalElements: res.data.totalElements,
      lastPage: res.data.lastPage,
    }));

    setTimeout(() => setLoading(false), 300);
  };

  useEffect(() => {
    fetchIpos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageNumber]);

  const setPageNumber = (p: number) => {
    setPagination((prev) => ({ ...prev, pageNumber: p }));
  };

  return (
    <PaginationContext.Provider
      value={{
        ipos,
        loading,
        pagination,
        setPageNumber,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

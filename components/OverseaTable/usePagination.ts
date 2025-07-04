import React from 'react';
import { PaginationProps } from './types';

interface UsePaginationProps<T> {
  dataSource: T[];
  pagination?: PaginationProps | false;
  pageSize: number;
}

export function usePagination<T>({
  dataSource,
  pagination,
  pageSize,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(
    pagination !== false ? pagination?.page || 1 : 1
  );

  const paginatedData = React.useMemo(() => {
    if (pagination === false) {
      return dataSource;
    }

    if (pagination && pagination.total !== undefined) {
      return dataSource;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return dataSource.slice(startIndex, endIndex);
  }, [dataSource, currentPage, pageSize, pagination]);

  const totalPages = React.useMemo(() => {
    if (pagination === false) return 0;
    if (pagination && pagination.total !== undefined) {
      return pagination.total;
    }
    return Math.ceil(dataSource.length / pageSize);
  }, [dataSource.length, pageSize, pagination]);

  const handlePageChange = React.useCallback(
    (page: number) => {
      setCurrentPage(page);
      if (pagination !== false) {
        pagination?.onChange?.(page);
      }
    },
    [pagination]
  );

  React.useEffect(() => {
    if (pagination !== false && pagination?.page !== undefined) {
      setCurrentPage(pagination.page);
    }
  }, [pagination]);

  return {
    currentPage,
    paginatedData,
    totalPages,
    handlePageChange,
  };
}
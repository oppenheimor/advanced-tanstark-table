import React from 'react';
import { PaginationProps } from './types';

interface UsePaginationProps<T> {
  dataSource: T[];
  pagination?: PaginationProps | false;
  pageSize?: number; // Deprecated fallback
}

export function usePagination<T>({
  dataSource,
  pagination,
  pageSize: deprecatedPageSize,
}: UsePaginationProps<T>) {
  // Determine the actual pageSize to use
  const actualPageSize = pagination !== false && pagination?.pageSize 
    ? pagination.pageSize 
    : deprecatedPageSize || 10;
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

    const startIndex = (currentPage - 1) * actualPageSize;
    const endIndex = startIndex + actualPageSize;
    return dataSource.slice(startIndex, endIndex);
  }, [dataSource, currentPage, actualPageSize, pagination]);

  const totalPages = React.useMemo(() => {
    if (pagination === false) return 0;
    if (pagination && pagination.total !== undefined) {
      return pagination.total;
    }
    return Math.ceil(dataSource.length / actualPageSize);
  }, [dataSource.length, actualPageSize, pagination]);

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
    pageSize: actualPageSize,
  };
}
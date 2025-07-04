import React from 'react';
// @ts-expect-error no declaration file
import Pagination from '@oversea/pagination';
import { PaginationProps } from './types';

interface TablePaginationProps {
  pagination?: PaginationProps | false;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  pagination,
  totalPages,
  currentPage,
  onPageChange,
}: TablePaginationProps) {
  if (pagination === false || totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4">
      <Pagination
        total={totalPages}
        page={currentPage}
        onChange={onPageChange}
        siblings={pagination?.siblings || 1}
        boundaries={pagination?.boundaries || 1}
      />
    </div>
  );
}
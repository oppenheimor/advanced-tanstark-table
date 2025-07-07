import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { OverseaTableProps } from './types';
import { usePagination } from './usePagination';
import { useSorting } from './useSorting';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';

export function OverseaTable<T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey = 'id',
  loading = false,
  size = 'middle',
  bordered = true,
  className = '',
  pagination,
  pageSize = 10,
  sortConfig,
  onSortChange,
}: OverseaTableProps<T>) {
  const { sortedData } = useSorting({
    dataSource,
    sortConfig,
    columns,
  });

  const {
    currentPage,
    paginatedData,
    totalPages,
    handlePageChange,
  } = usePagination({
    dataSource: sortedData,
    pagination,
    pageSize,
  });

  const tanstackColumns: ColumnDef<T>[] = React.useMemo(() => {
    return columns.map((col) => ({
      id: String(col.key),
      accessorKey: col.dataIndex || col.key,
      header: col.title,
      cell: (info) => {
        const value = info.getValue();
        const record = info.row.original;
        const index = info.row.index;

        if (col.render) {
          return col.render(value, record, index);
        }

        return value;
      },
      size: typeof col.width === 'number' ? col.width : undefined,
    }));
  }, [columns]);

  const table = useReactTable({
    data: paginatedData,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <LoadingSpinner className={className} />;
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto">
        <table className={`min-w-full bg-white rounded-lg shadow-sm ${
          bordered ? 'border border-gray-200' : ''
        }`}>
          <TableHeader
            headerGroups={table.getHeaderGroups()}
            columns={columns}
            bordered={bordered}
            size={size}
            sortConfig={sortConfig}
            onSortChange={onSortChange}
          />
          <TableBody
            rows={table.getRowModel().rows}
            columns={columns}
            size={size}
            rowKey={rowKey}
          />
        </table>

        {paginatedData.length === 0 && <EmptyState />}
      </div>

      <TablePagination
        pagination={pagination}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default OverseaTable;
export type { OverseaTableProps, OverseaColumnConfig, PaginationProps, SortConfig, SortOrder } from './types';
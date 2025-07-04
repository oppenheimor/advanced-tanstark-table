import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
// @ts-expect-error no declaration file
import Pagination from '@oversea/pagination';

export interface OverseaColumnConfig<T = Record<string, unknown>> {
  key: keyof T;
  title: string;
  dataIndex?: keyof T;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  sorter?: boolean;
  fixed?: 'left' | 'right';
}

export interface PaginationProps {
  total?: number;
  page?: number;
  siblings?: number;
  boundaries?: number;
  onChange?: (page: number) => void;
}

export interface OverseaTableProps<T = Record<string, unknown>> {
  columns: OverseaColumnConfig<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T) => string | number);
  loading?: boolean;
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  className?: string;
  pagination?: PaginationProps | false;
  pageSize?: number;
}

function OverseaTable<T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey = 'id',
  loading = false,
  size = 'middle',
  bordered = true,
  className = '',
  pagination,
  pageSize = 10,
}: OverseaTableProps<T>) {
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
  
  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(page);
    if (pagination !== false) {
      pagination?.onChange?.(page);
    }
  }, [pagination]);
  
  React.useEffect(() => {
    if (pagination !== false && pagination?.page !== undefined) {
      setCurrentPage(pagination.page);
    }
  }, [pagination]);
  
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

  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    const keyValue = record[rowKey];
    return (keyValue as string | number) || index;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-xs';
      case 'large':
        return 'px-8 py-5 text-base';
      default:
        return 'px-6 py-4 text-sm';
    }
  };

  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  const renderPagination = () => {
    if (pagination === false || totalPages <= 1) return null;
    
    return (
      <div className="flex justify-center mt-4">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          siblings={pagination?.siblings || 1}
          boundaries={pagination?.boundaries || 1}
        />
      </div>
    );
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto">
        <table className={`min-w-full bg-white rounded-lg shadow-sm ${
          bordered ? 'border border-gray-200' : ''
        }`}>
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const columnConfig = columns[index];
                  return (
                    <th
                      key={header.id}
                      className={`${getSizeClasses()} font-medium text-gray-500 uppercase tracking-wider ${
                        bordered ? 'border-b border-gray-200' : ''
                      } ${getAlignClass(columnConfig?.align)}`}
                      style={{ width: columnConfig?.width }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={getRowKey(row.original, rowIndex)} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell, cellIndex) => {
                  const columnConfig = columns[cellIndex];
                  return (
                    <td
                      key={cell.id}
                      className={`${getSizeClasses()} whitespace-nowrap text-gray-900 ${getAlignClass(
                        columnConfig?.align
                      )}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        
        {paginatedData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            暂无数据
          </div>
        )}
      </div>
      
      {renderPagination()}
    </div>
  );
}

export default OverseaTable;
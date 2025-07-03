import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

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

export interface OverseaTableProps<T = Record<string, unknown>> {
  columns: OverseaColumnConfig<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T) => string | number);
  loading?: boolean;
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  className?: string;
}

function OverseaTable<T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey = 'id',
  loading = false,
  size = 'middle',
  bordered = true,
  className = '',
}: OverseaTableProps<T>) {
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
    data: dataSource,
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

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
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
      
      {dataSource.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          暂无数据
        </div>
      )}
    </div>
  );
}

export default OverseaTable;
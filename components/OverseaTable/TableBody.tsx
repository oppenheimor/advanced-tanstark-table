import React from 'react';
import { flexRender, Row } from '@tanstack/react-table';
import { OverseaColumnConfig } from './types';
import { getSizeClasses, getAlignClass, getRowKey } from './utils';

interface TableBodyProps<T extends Record<string, unknown>> {
  rows: Row<T>[];
  columns: OverseaColumnConfig<T>[];
  size: 'small' | 'middle' | 'large';
  rowKey: keyof T | ((record: T) => string | number);
}

export function TableBody<T extends Record<string, unknown>>({
  rows,
  columns,
  size,
  rowKey,
}: TableBodyProps<T>) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.map((row, rowIndex) => (
        <tr key={getRowKey(row.original, rowIndex, rowKey)} className="hover:bg-gray-50">
          {row.getVisibleCells().map((cell, cellIndex) => {
            const columnConfig = columns[cellIndex];
            return (
              <td
                key={cell.id}
                className={`${getSizeClasses(size)} whitespace-nowrap text-gray-900 ${getAlignClass(
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
  );
}
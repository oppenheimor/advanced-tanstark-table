import React from 'react';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { OverseaColumnConfig } from './types';
import { getSizeClasses, getAlignClass } from './utils';

interface TableHeaderProps<T extends Record<string, unknown>> {
  headerGroups: HeaderGroup<T>[];
  columns: OverseaColumnConfig<T>[];
  bordered: boolean;
  size: 'small' | 'middle' | 'large';
}

export function TableHeader<T extends Record<string, unknown>>({
  headerGroups,
  columns,
  bordered,
  size,
}: TableHeaderProps<T>) {
  return (
    <thead className="bg-gray-50">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            const columnConfig = columns[index];
            return (
              <th
                key={header.id}
                className={`${getSizeClasses(size)} font-medium text-gray-500 uppercase tracking-wider ${
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
  );
}
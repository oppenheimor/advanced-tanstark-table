import React from 'react';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { OverseaColumnConfig, SortConfig, SortOrder } from './types';
import { getSizeClasses, getAlignClass } from './utils';

interface TableHeaderProps<T extends Record<string, unknown>> {
  headerGroups: HeaderGroup<T>[];
  columns: OverseaColumnConfig<T>[];
  bordered: boolean;
  size: 'small' | 'middle' | 'large';
  sortConfig?: SortConfig<T> | null;
  onSortChange?: (sortConfig: SortConfig<T> | null) => void;
}

const SortIcon = ({ order }: { order?: SortOrder }) => {
  if (order === 'asc') {
    return (
      <svg className="w-3 h-3 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  }
  
  if (order === 'desc') {
    return (
      <svg className="w-3 h-3 ml-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  
  return (
    <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
  );
};

export function TableHeader<T extends Record<string, unknown>>({
  headerGroups,
  columns,
  bordered,
  size,
  sortConfig,
  onSortChange,
}: TableHeaderProps<T>) {
  const handleSort = (columnConfig: OverseaColumnConfig<T>) => {
    if (!columnConfig.sorter || !onSortChange) return;
    
    const currentSortOrder = sortConfig?.key === columnConfig.key ? sortConfig.order : null;
    const sortCycle = columnConfig.sortCycle || 'default';
    let newSortConfig: SortConfig<T> | null = null;
    
    if (sortCycle === 'loop') {
      // Loop mode: asc -> desc -> asc -> desc ...
      if (currentSortOrder === null || currentSortOrder === 'desc') {
        newSortConfig = { key: columnConfig.key, order: 'asc' };
      } else {
        newSortConfig = { key: columnConfig.key, order: 'desc' };
      }
    } else {
      // Default mode: null -> asc -> desc -> null
      if (currentSortOrder === null) {
        newSortConfig = { key: columnConfig.key, order: 'asc' };
      } else if (currentSortOrder === 'asc') {
        newSortConfig = { key: columnConfig.key, order: 'desc' };
      } else {
        newSortConfig = null;
      }
    }
    
    onSortChange(newSortConfig);
  };

  return (
    <thead className="bg-gray-50">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            const columnConfig = columns[index];
            const isSortable = !!columnConfig?.sorter;
            const currentSortOrder = sortConfig?.key === columnConfig?.key ? sortConfig.order : undefined;
            
            return (
              <th
                key={header.id}
                className={`${getSizeClasses(size)} font-medium text-gray-500 uppercase tracking-wider ${
                  bordered ? 'border-b border-gray-200' : ''
                } ${getAlignClass(columnConfig?.align)} ${
                  isSortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''
                }`}
                style={{ width: columnConfig?.width }}
                onClick={() => isSortable && handleSort(columnConfig)}
              >
                <div className="flex items-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {isSortable && <SortIcon order={currentSortOrder} />}
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
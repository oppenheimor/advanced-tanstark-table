import React from 'react';
import { OverseaColumnConfig, SortConfig } from './types';

interface UseSortingProps<T> {
  dataSource: T[];
  sortConfig?: SortConfig<T> | null;
  columns: OverseaColumnConfig<T>[];
}

export function useSorting<T extends Record<string, unknown>>({
  dataSource,
  sortConfig,
  columns,
}: UseSortingProps<T>) {
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return dataSource;
    
    const sortedArray = [...dataSource].sort((a, b) => {
      const column = columns.find(col => col.key === sortConfig.key);
      if (!column) return 0;
      
      if (typeof column.sorter === 'function') {
        const result = column.sorter(a, b);
        return sortConfig.order === 'desc' ? -result : result;
      }
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.localeCompare(bValue);
        return sortConfig.order === 'desc' ? -result : result;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const result = aValue - bValue;
        return sortConfig.order === 'desc' ? -result : result;
      }
      
      const aStr = String(aValue);
      const bStr = String(bValue);
      const result = aStr.localeCompare(bStr);
      return sortConfig.order === 'desc' ? -result : result;
    });
    
    return sortedArray;
  }, [dataSource, sortConfig, columns]);

  return { sortedData };
}
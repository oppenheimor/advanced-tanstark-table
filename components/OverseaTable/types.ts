import React from 'react';

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
  pageSize?: number;
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
  pageSize?: number; // Deprecated: use pagination.pageSize instead
}

export type TableSize = 'small' | 'middle' | 'large';
export type TableAlign = 'left' | 'center' | 'right';
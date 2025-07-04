import { TableSize, TableAlign } from './types';

export const getRowKey = <T extends Record<string, unknown>>(
  record: T,
  index: number,
  rowKey: keyof T | ((record: T) => string | number)
): string | number => {
  if (typeof rowKey === 'function') {
    return rowKey(record);
  }
  const keyValue = record[rowKey];
  return (keyValue as string | number) || index;
};

export const getSizeClasses = (size: TableSize): string => {
  switch (size) {
    case 'small':
      return 'px-3 py-2 text-xs';
    case 'large':
      return 'px-8 py-5 text-base';
    default:
      return 'px-6 py-4 text-sm';
  }
};

export const getAlignClass = (align?: TableAlign): string => {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
};
import React from 'react';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = '暂无数据' }: EmptyStateProps) {
  return (
    <div className="text-center py-8 text-gray-500">
      {message}
    </div>
  );
}
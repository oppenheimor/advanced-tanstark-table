# Advanced TanStack Table

A high-performance, feature-rich table component built with Next.js 15, TypeScript, and TanStack Table. This project showcases an advanced data table implementation with sorting, pagination, and customizable styling.

## Features

- 🚀 **High Performance**: Built on TanStack Table for optimal performance
- 📊 **Advanced Sorting**: Supports both default and loop sorting modes
- 📄 **Flexible Pagination**: Frontend and backend pagination support
- 🎨 **Customizable Styling**: Tailwind CSS with responsive design
- 🔧 **TypeScript Support**: Full type safety and IntelliSense
- 📱 **Mobile Responsive**: Works seamlessly across all devices

## OverseaTable Component

The `OverseaTable` component is a powerful and flexible table solution with the following capabilities:

### Basic Usage

```tsx
import { OverseaTable, OverseaColumnConfig } from '@/components/OverseaTable';

const columns: OverseaColumnConfig<DataType>[] = [
  {
    key: 'name',
    title: 'Name',
    width: 200,
    sorter: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 100,
    align: 'right',
    sorter: true,
    render: (value) => `$${(value as number).toFixed(2)}`,
  },
];

<OverseaTable
  columns={columns}
  dataSource={data}
  rowKey="id"
  pagination={{ pageSize: 10 }}
/>
```

### Column Configuration

```tsx
interface OverseaColumnConfig<T> {
  key: keyof T;                    // Data key
  title: string;                   // Column header text
  width?: number | string;         // Column width
  align?: 'left' | 'center' | 'right'; // Text alignment
  sorter?: boolean | ((a: T, b: T) => number); // Sorting configuration
  sortCycle?: 'default' | 'loop';  // Sorting behavior mode
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  fixed?: 'left' | 'right';        // Fixed column position
}
```

### Sorting Modes

The component supports two sorting modes:

#### Default Mode (`sortCycle: 'default'`)
- Click sequence: `No Sort → Ascending → Descending → No Sort`
- Allows clearing the sort state
- Best for most use cases

#### Loop Mode (`sortCycle: 'loop'`)
- Click sequence: `Ascending → Descending → Ascending → Descending`
- Continuous sorting without clearing
- Ideal for columns that should always be sorted

```tsx
const columns = [
  {
    key: 'symbol',
    title: 'Symbol',
    sorter: true,
    sortCycle: 'loop', // Loop between asc/desc
  },
  {
    key: 'price',
    title: 'Price',
    sorter: true,
    sortCycle: 'default', // Default: can clear sorting
  },
];
```

### Pagination Options

#### Frontend Pagination
```tsx
<OverseaTable
  pagination={{
    pageSize: 10,
    siblings: 1,
    boundaries: 1,
  }}
/>
```

#### Backend Pagination
```tsx
<OverseaTable
  pagination={{
    pageSize: 10,
    page: currentPage,
    total: totalPages,
    onChange: handlePageChange,
  }}
/>
```

### Props API

```tsx
interface OverseaTableProps<T> {
  columns: OverseaColumnConfig<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T) => string | number);
  loading?: boolean;
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  className?: string;
  pagination?: PaginationProps | false;
  sortConfig?: SortConfig<T> | null;
  onSortChange?: (sortConfig: SortConfig<T> | null) => void;
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

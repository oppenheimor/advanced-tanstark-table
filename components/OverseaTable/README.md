# OverseaTable Component

A powerful and flexible table component built with React and TanStack Table, designed for modern web applications.

## Features

- **Flexible Column Configuration**: Support for custom rendering, alignment, and sizing
- **Built-in Pagination**: Configurable pagination with customizable controls
- **Loading States**: Built-in loading spinner and empty state handling
- **Responsive Design**: Mobile-friendly with horizontal scrolling
- **TypeScript Support**: Full TypeScript support with proper type definitions
- **Customizable Styling**: Tailwind CSS classes with size variants
- **Row Key Support**: Flexible row key configuration for optimal performance

## Usage

```tsx
import OverseaTable from '@/components/OverseaTable';
import type { OverseaColumnConfig } from '@/components/OverseaTable';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

const columns: OverseaColumnConfig<User>[] = [
  {
    key: 'id',
    title: 'ID',
    width: 80,
    align: 'center',
  },
  {
    key: 'name',
    title: 'Name',
    width: 200,
  },
  {
    key: 'email',
    title: 'Email',
    width: 300,
  },
  {
    key: 'status',
    title: 'Status',
    width: 120,
    align: 'center',
    render: (value, record) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        record.status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    ),
  },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
];

function MyComponent() {
  return (
    <OverseaTable
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        page: 1,
        pageSize: 10,
        onChange: (page) => console.log('Page changed:', page),
      }}
    />
  );
}
```

## Props

### OverseaTableProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `OverseaColumnConfig<T>[]` | - | Column configuration array |
| `dataSource` | `T[]` | - | Data source array |
| `rowKey` | `keyof T \| ((record: T) => string \| number)` | `'id'` | Row key for React keys |
| `loading` | `boolean` | `false` | Show loading state |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` | Table size variant |
| `bordered` | `boolean` | `true` | Show table borders |
| `className` | `string` | `''` | Additional CSS classes |
| `pagination` | `PaginationProps \| false` | - | Pagination configuration |
| `pageSize` | `number` | `10` | **Deprecated**: Use `pagination.pageSize` instead |

### OverseaColumnConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `keyof T` | - | Column key (required) |
| `title` | `string` | - | Column title (required) |
| `dataIndex` | `keyof T` | - | Data index (defaults to key) |
| `width` | `number \| string` | - | Column width |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `render` | `(value: unknown, record: T, index: number) => React.ReactNode` | - | Custom render function |
| `sorter` | `boolean` | - | Enable sorting (future feature) |
| `fixed` | `'left' \| 'right'` | - | Fixed column position (future feature) |

### PaginationProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | - | Total number of items |
| `page` | `number` | `1` | Current page number |
| `pageSize` | `number` | `10` | Number of items per page |
| `siblings` | `number` | `1` | Number of sibling pages |
| `boundaries` | `number` | `1` | Number of boundary pages |
| `onChange` | `(page: number) => void` | - | Page change callback |

## Architecture

The component is built with a modular architecture:

```
components/OverseaTable/
├── index.tsx           # Main component
├── types.ts            # TypeScript type definitions
├── utils.ts            # Utility functions
├── usePagination.ts    # Pagination hook
├── TableHeader.tsx     # Header component
├── TableBody.tsx       # Body component
├── TablePagination.tsx # Pagination component
├── LoadingSpinner.tsx  # Loading state component
├── EmptyState.tsx      # Empty state component
└── README.md          # Documentation
```

## Advanced Usage

### Custom Rendering

```tsx
const columns: OverseaColumnConfig<User>[] = [
  {
    key: 'avatar',
    title: 'Avatar',
    render: (value, record) => (
      <img 
        src={record.avatarUrl} 
        alt={record.name}
        className="w-8 h-8 rounded-full"
      />
    ),
  },
  {
    key: 'actions',
    title: 'Actions',
    render: (value, record) => (
      <div className="flex space-x-2">
        <button onClick={() => handleEdit(record)}>Edit</button>
        <button onClick={() => handleDelete(record)}>Delete</button>
      </div>
    ),
  },
];
```

### Server-side Pagination

```tsx
const [currentPage, setCurrentPage] = useState(1);
const [total, setTotal] = useState(0);

<OverseaTable
  columns={columns}
  dataSource={data}
  pagination={{
    page: currentPage,
    total: total,
    pageSize: 20,
    onChange: (page) => {
      setCurrentPage(page);
      // Fetch data for new page
      fetchData(page);
    },
  }}
/>
```

### Loading State

```tsx
const [loading, setLoading] = useState(false);

<OverseaTable
  columns={columns}
  dataSource={data}
  loading={loading}
/>
```

## Styling

The component uses Tailwind CSS classes and supports three size variants:

- **Small**: `px-3 py-2 text-xs`
- **Middle**: `px-6 py-4 text-sm` (default)
- **Large**: `px-8 py-5 text-base`

## Dependencies

- React 18+
- @tanstack/react-table
- @oversea/pagination
- Tailwind CSS

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
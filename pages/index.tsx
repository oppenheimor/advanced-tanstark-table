import { Geist, Geist_Mono } from "next/font/google";
import OverseaTable, { OverseaColumnConfig } from "@/components/OverseaTable";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface Person extends Record<string, unknown> {
  id: number;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
}

const mockData: Person[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 28,
    email: 'john@example.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 32,
    email: 'jane@example.com',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    age: 25,
    email: 'bob@example.com',
    status: 'active',
  },
  {
    id: 4,
    name: 'Alice Brown',
    age: 35,
    email: 'alice@example.com',
    status: 'active',
  },
];

const columns: OverseaColumnConfig<Person>[] = [
  {
    key: 'id',
    title: 'ID',
    width: 80,
    align: 'center',
  },
  {
    key: 'name',
    title: '姓名',
    width: 120,
  },
  {
    key: 'age',
    title: '年龄',
    width: 80,
    align: 'center',
  },
  {
    key: 'email',
    title: '邮箱',
    width: 200,
  },
  {
    key: 'status',
    title: '状态',
    width: 100,
    align: 'center',
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {value === 'active' ? '激活' : '未激活'}
      </span>
    ),
  },
];

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Advanced TanStack Table
          </h1>
          <p className="text-gray-600">
            A simple and extensible table component built with TanStack Table
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            OverseaTable 配置型驱动示例
          </h2>
          <OverseaTable<Person>
            columns={columns}
            dataSource={mockData}
            rowKey="id"
            size="middle"
            bordered={true}
          />
        </div>
      </main>
    </div>
  );
}

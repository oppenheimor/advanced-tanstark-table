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

interface StockData extends Record<string, unknown> {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: number;
  relVolume: number;
  marketCap: number;
  pe: number;
  epsDiluted: number;
  epsGrowth: number;
  dividendYield: number;
  sector: string;
  analystRating: 'Strong buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong sell';
}

const stockMockData: StockData[] = [
  {
    symbol: 'GOOGL',
    name: 'Apple Inc. Apple Inc. Apple...',
    price: 336.51,
    changePercent: 2.44,
    volume: 35.46,
    relVolume: 1.04,
    marketCap: 3.63,
    pe: 38.33,
    epsDiluted: 6.30,
    epsGrowth: -1.95,
    dividendYield: 0.42,
    sector: 'Electronic technolo...',
    analystRating: 'Strong buy',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc. Apple Inc. Apple...',
    price: 336.51,
    changePercent: 2.44,
    volume: 35.46,
    relVolume: 1.04,
    marketCap: 3.63,
    pe: 38.33,
    epsDiluted: 6.30,
    epsGrowth: -1.95,
    dividendYield: 2.44,
    sector: 'Consumer Staples',
    analystRating: 'Buy',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 336.51,
    changePercent: 2.44,
    volume: 35.46,
    relVolume: 1.04,
    marketCap: 3.63,
    pe: 38.33,
    epsDiluted: 6.30,
    epsGrowth: -1.95,
    dividendYield: 2.44,
    sector: 'Consumer Durables',
    analystRating: 'Strong buy',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 336.51,
    changePercent: 2.44,
    volume: 35.46,
    relVolume: 1.04,
    marketCap: 3.63,
    pe: 38.33,
    epsDiluted: 6.30,
    epsGrowth: -1.95,
    dividendYield: 2.44,
    sector: 'Technology Services',
    analystRating: 'Strong buy',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 336.51,
    changePercent: 2.44,
    volume: 35.46,
    relVolume: 1.04,
    marketCap: 3.63,
    pe: 38.33,
    epsDiluted: 6.30,
    epsGrowth: -1.95,
    dividendYield: 2.44,
    sector: 'Retail Trade',
    analystRating: 'Strong buy',
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 336.51,
    changePercent: 2.44,
    volume: 35.46,
    relVolume: 1.04,
    marketCap: 3.63,
    pe: 38.33,
    epsDiluted: 6.30,
    epsGrowth: -1.95,
    dividendYield: 2.44,
    sector: 'Health Services',
    analystRating: 'Strong buy',
  },
  {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    price: 336.51,
    changePercent: 2.44,
    volume: 35.46,
    relVolume: 1.04,
    marketCap: 3.63,
    pe: 38.33,
    epsDiluted: 6.30,
    epsGrowth: -1.95,
    dividendYield: 2.44,
    sector: 'Electronic technolo...',
    analystRating: 'Strong buy',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 336.51,
    changePercent: 2.44,
    volume: 35.46,
    relVolume: 1.04,
    marketCap: 3.63,
    pe: 38.33,
    epsDiluted: 6.30,
    epsGrowth: -1.95,
    dividendYield: 2.44,
    sector: 'Finance',
    analystRating: 'Strong buy',
  },
];

const stockColumns: OverseaColumnConfig<StockData>[] = [
  {
    key: 'symbol',
    title: 'Symbol',
    width: 80,
    align: 'left',
    render: (value) => (
      <span className="font-mono font-semibold text-blue-600">
        {value as string}
      </span>
    ),
  },
  {
    key: 'price',
    title: 'Price',
    width: 100,
    align: 'right',
    render: (value) => (
      <span className="font-mono">
        {(value as number).toFixed(2)}
      </span>
    ),
  },
  {
    key: 'changePercent',
    title: 'Change%',
    width: 100,
    align: 'right',
    render: (value) => {
      const changePercent = value as number;
      const isPositive = changePercent >= 0;
      return (
        <span className={`font-mono ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
      );
    },
  },
  {
    key: 'volume',
    title: 'Volume',
    width: 100,
    align: 'right',
    render: (value) => (
      <span className="font-mono">
        {(value as number).toFixed(2)}M
      </span>
    ),
  },
  {
    key: 'relVolume',
    title: 'Rel Volume',
    width: 100,
    align: 'right',
    render: (value) => (
      <span className="font-mono">
        {(value as number).toFixed(2)}
      </span>
    ),
  },
  {
    key: 'marketCap',
    title: 'Market cap',
    width: 100,
    align: 'right',
    render: (value) => (
      <span className="font-mono">
        {(value as number).toFixed(2)}T
      </span>
    ),
  },
  {
    key: 'pe',
    title: 'P/E',
    width: 80,
    align: 'right',
    render: (value) => (
      <span className="font-mono">
        {(value as number).toFixed(2)}
      </span>
    ),
  },
  {
    key: 'epsDiluted',
    title: 'EPS dil',
    width: 80,
    align: 'right',
    render: (value) => (
      <span className="font-mono">
        {(value as number).toFixed(2)}
      </span>
    ),
  },
  {
    key: 'epsGrowth',
    title: 'EPS dil growth',
    width: 120,
    align: 'right',
    render: (value) => {
      const growth = value as number;
      const isPositive = growth >= 0;
      return (
        <span className={`font-mono ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{growth.toFixed(2)}%
        </span>
      );
    },
  },
  {
    key: 'dividendYield',
    title: 'Div yield %',
    width: 100,
    align: 'right',
    render: (value) => {
      const yield_ = value as number;
      const isPositive = yield_ >= 0;
      return (
        <span className={`font-mono ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{yield_.toFixed(2)}%
        </span>
      );
    },
  },
  {
    key: 'sector',
    title: 'Sector',
    width: 160,
    render: (value) => (
      <span className="text-sm text-gray-700 truncate">
        {value as string}
      </span>
    ),
  },
  {
    key: 'analystRating',
    title: 'Analyst Rating',
    width: 120,
    align: 'right',
    render: (value) => {
      const rating = value as string;
      const getColorClass = () => {
        if (rating === 'Strong buy') return 'text-green-600';
        if (rating === 'Buy') return 'text-blue-600';
        if (rating === 'Hold') return 'text-yellow-600';
        if (rating === 'Sell') return 'text-orange-600';
        return 'text-red-600';
      };
      
      return (
        <span className={`text-sm font-medium ${getColorClass()}`}>
          {rating}
        </span>
      );
    },
  },
];

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Stock Screener
          </h1>
          <p className="text-gray-600">
            Advanced stock screening tool with real-time market data
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Stock Market Overview
            </h2>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          <OverseaTable<StockData>
            columns={stockColumns}
            dataSource={stockMockData}
            rowKey="symbol"
            size="small"
            bordered={true}
            className="stock-screener-table"
          />
          
          <div className="mt-4 text-xs text-gray-500 flex justify-between">
            <span>Data provided for demonstration purposes</span>
            <span>{stockMockData.length} stocks displayed</span>
          </div>
        </div>
      </main>
    </div>
  );
}

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { OverseaTable, OverseaColumnConfig, SortConfig } from "@/components/OverseaTable/index";

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

// Simple seeded random number generator for deterministic results
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generateStockData = (count: number): StockData[] => {
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NFLX', 'NVDA', 'ORCL', 'CRM', 'ADBE', 'INTC', 'AMD', 'PYPL', 'UBER', 'LYFT', 'SPOT', 'ZOOM', 'TWTR', 'SNAP', 'PINS', 'SQ', 'SHOP', 'ROKU', 'DKNG', 'PLTR', 'RBLX', 'COIN', 'HOOD', 'DOCU', 'ZM', 'WORK', 'OKTA', 'SNOW', 'CRWD', 'NET', 'DDOG', 'MDB', 'TEAM', 'ATLASSIAN', 'SPLK', 'VEEV', 'WDAY', 'PANW', 'FTNT', 'CYBR', 'CSCO', 'IBM', 'HPQ', 'DELL'];
  const companies = ['Apple Inc.', 'Alphabet Inc.', 'Microsoft Corporation', 'Amazon.com Inc.', 'Tesla Inc.', 'Meta Platforms Inc.', 'Netflix Inc.', 'NVIDIA Corporation', 'Oracle Corporation', 'Salesforce Inc.', 'Adobe Inc.', 'Intel Corporation', 'Advanced Micro Devices', 'PayPal Holdings', 'Uber Technologies', 'Lyft Inc.', 'Spotify Technology', 'Zoom Video Communications', 'Twitter Inc.', 'Snap Inc.', 'Pinterest Inc.', 'Block Inc.', 'Shopify Inc.', 'Roku Inc.', 'DraftKings Inc.', 'Palantir Technologies', 'Roblox Corporation', 'Coinbase Global', 'Robinhood Markets', 'DocuSign Inc.', 'Zoom Video Communications', 'Slack Technologies', 'Okta Inc.', 'Snowflake Inc.', 'CrowdStrike Holdings', 'Cloudflare Inc.', 'Datadog Inc.', 'MongoDB Inc.', 'Atlassian Corporation', 'Atlassian Corporation', 'Splunk Inc.', 'Veeva Systems', 'Workday Inc.', 'Palo Alto Networks', 'Fortinet Inc.', 'CyberArk Software', 'Cisco Systems', 'IBM Corporation', 'HP Inc.', 'Dell Technologies'];
  const sectors = ['Technology Services', 'Electronic Technology', 'Consumer Staples', 'Consumer Durables', 'Retail Trade', 'Health Services', 'Finance', 'Communications', 'Energy Minerals', 'Process Industries'];
  const ratings: StockData['analystRating'][] = ['Strong buy', 'Buy', 'Hold', 'Sell', 'Strong sell'];
  
  return Array.from({ length: count }, (_, i) => {
    // Use seeded random for deterministic results
    const randomPrice = seededRandom(i * 7 + 1) * 500 + 10;
    const randomChange = (seededRandom(i * 7 + 2) - 0.5) * 20;
    const randomVolume = seededRandom(i * 7 + 3) * 100 + 1;
    const randomPE = seededRandom(i * 7 + 4) * 50 + 5;
    const randomEPS = seededRandom(i * 7 + 5) * 10 + 0.5;
    const randomGrowth = (seededRandom(i * 7 + 6) - 0.5) * 50;
    const randomDividend = seededRandom(i * 7 + 7) * 5;
    const randomMarketCap = seededRandom(i * 7 + 8) * 10 + 0.1;
    const randomRelVolume = seededRandom(i * 7 + 9) * 3 + 0.1;
    
    return {
      symbol: symbols[i % symbols.length] + (i >= symbols.length ? Math.floor(i / symbols.length) : ''),
      name: companies[i % companies.length],
      price: parseFloat(randomPrice.toFixed(2)),
      changePercent: parseFloat(randomChange.toFixed(2)),
      volume: parseFloat(randomVolume.toFixed(2)),
      relVolume: parseFloat(randomRelVolume.toFixed(2)),
      marketCap: parseFloat(randomMarketCap.toFixed(2)),
      pe: parseFloat(randomPE.toFixed(2)),
      epsDiluted: parseFloat(randomEPS.toFixed(2)),
      epsGrowth: parseFloat(randomGrowth.toFixed(2)),
      dividendYield: parseFloat(randomDividend.toFixed(2)),
      sector: sectors[i % sectors.length],
      analystRating: ratings[i % ratings.length],
    };
  });
};

const stockMockData: StockData[] = generateStockData(125);

const stockColumns: OverseaColumnConfig<StockData>[] = [
  {
    key: 'symbol',
    title: 'Symbol',
    width: 80,
    align: 'left',
    sorter: true,
    sortCycle: 'loop',
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
    sorter: true,
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
    sorter: true,
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
    sorter: true,
    sortCycle: 'loop',
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
    sorter: true,
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
    sorter: true,
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
    sorter: true,
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
    sorter: true,
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
    sorter: true,
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
    sorter: true,
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
  const [paginationMode, setPaginationMode] = React.useState<'frontend' | 'backend'>('frontend');
  const [backendPage, setBackendPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState<SortConfig<StockData> | null>({
    key: 'marketCap',
    order: 'desc'
  });
  const backendPageSize = 10;
  
  const mockBackendData = React.useMemo(() => {
    const startIndex = (backendPage - 1) * backendPageSize;
    const endIndex = startIndex + backendPageSize;
    return stockMockData.slice(startIndex, endIndex);
  }, [backendPage, backendPageSize]);
  
  const handleBackendPaginationChange = async (page: number) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setBackendPage(page);
    setLoading(false);
  };

  const handleSortChange = (newSortConfig: SortConfig<StockData> | null) => {
    setSortConfig(newSortConfig);
  };
  
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
            <div className="flex gap-4 items-center text-sm text-gray-500">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPaginationMode('frontend');
                    setBackendPage(1);
                  }}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    paginationMode === 'frontend' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  前端分页
                </button>
                <button
                  onClick={() => {
                    setPaginationMode('backend');
                    setBackendPage(1);
                  }}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    paginationMode === 'backend' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  后端分页
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
                  <span className="text-sm">加载中...</span>
                </div>
              </div>
            )}
            <OverseaTable<StockData>
              columns={stockColumns}
              dataSource={paginationMode === 'frontend' ? stockMockData : mockBackendData}
              rowKey="symbol"
              size="small"
              bordered={true}
              pageSize={10}
              sortConfig={sortConfig}
              onSortChange={handleSortChange}
              pagination={paginationMode === 'frontend' ? {
                pageSize: 10,
                siblings: 1,
                boundaries: 1,
              } : {
                pageSize: backendPageSize,
                page: backendPage,
                total: Math.ceil(stockMockData.length / backendPageSize),
                siblings: 1,
                boundaries: 1,
                onChange: handleBackendPaginationChange,
              }}
            />
          </div>
          
          <div className="mt-4 text-xs text-gray-500 flex justify-between">
            <span>Data provided for demonstration purposes</span>
            <span>
              {stockMockData.length} stocks total ({paginationMode === 'frontend' ? '前端分页' : '后端分页'})
              {paginationMode === 'backend' && loading && <span className="ml-2 text-blue-600">· 正在加载...</span>}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

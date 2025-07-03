import { Geist, Geist_Mono } from "next/font/google";
import OverseaTable from "@/components/OverseaTable";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
            OverseaTable Demo
          </h2>
          <OverseaTable />
        </div>
      </main>
    </div>
  );
}

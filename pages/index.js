import Head from "next/head"; // 🔹 Head bileşenini ekliyoruz
import TrendChart from "../components/TrendChart";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      {/* 🔹 HTML <head> içeriğini buraya ekliyoruz */}
      <Head>
        <title>Hermes Roller Fırın 2 - Veri Takip Sistemi</title>
        <meta name="description" content="Hermes Roller Fırın 2 sıcaklık verilerini takip edin." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full p-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold">🔥 Hermes Roller Fırın 2 🔥</h1>
        <DarkModeToggle />
      </header>

      <main className="w-full">
        <TrendChart />
      </main>

      <footer className="w-full p-4 text-center bg-white dark:bg-gray-900 shadow-md">
        <p>© 2025 - Data Otomasyon</p>
      </footer>
    </div>
  );
}

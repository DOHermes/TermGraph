import TrendChart from "../components/TrendChart";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
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

import Head from "next/head";
import TrendChart from "../components/TrendChart";
import DarkModeToggle from "../components/DarkModeToggle";
import LedIndicator from "../components/LedIndicator"; // ✅ yeni bileşeni ekliyoruz
import { useEffect, useState } from "react";

export default function Home() {
  const [coilStates, setCoilStates] = useState({});

  useEffect(() => {
    fetch("/api/getCoils")
      .then((res) => res.json())
      .then((data) => setCoilStates(data));
  }, []);

  const coilLabels = {
    500: "Giriş Baca 1",
    501: "Giriş Baca 2",
    502: "Yakma Hava 1",
    503: "Yakma Hava 2",
    504: "Çıkış Baca 1",
    505: "Çıkış Baca 2",
    506: "Kritik Soğutma",
    507: "Ana Soğutma",
    508: "Ana Gaz",
    509: "Grup 1 Sicaklık",
    510: "Grup 2 Sicaklık",
    511: "Grup 3 Sicaklık",
    512: "Grup 4 Alt Sicaklık",
    513: "Grup 4 Üst Sicaklık",
    514: "Grup 5 Alt Sicaklık",
    515: "Grup 5 Üst Sicaklık",
    516: "Grup 6 Alt Sicaklık",
    517: "Grup 6 Üst Sicaklık",
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
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

      {/* ✅ LED göstergeleri */}
      <section className="w-full max-w-6xl px-4 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {Object.keys(coilLabels).map((key) => (
          <LedIndicator
            key={key}
            label={coilLabels[key]}
            isOn={coilStates[key] === true}
          />
        ))}
      </section>

      <main className="w-full">
        <TrendChart />
      </main>

      <footer className="w-full p-4 text-center bg-white dark:bg-gray-900 shadow-md">
        <p>© 2025 - Data Otomasyon</p>
      </footer>
    </div>
  );
}

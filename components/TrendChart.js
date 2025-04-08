import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// 🔹 Fırın ID'leri yerine gösterilecek isimleri burada belirliyoruz
const furnaceNames = {
  1: "Giriş 1",
  2: "Giriş 2",
  3: "1. Bölge",
  4: "2. Bölge",
  5: "3. Bölge",
  6: "4. Bölge Alt",
  7: "4. Bölge Üst",
  8: "5. Bölge Alt",
  9: "5. Bölge Üst",
  10: "6. Bölge Alt",
  11: "6. Bölge Üst",
  12: "Soğutma",
  13: "Kritik Soğutma Alt",
  14: "Kritik Soğutma Üst",
  15: "Çıkış 1",
  16: "Çıkış 2",
  17: "Çıkış 3"
};

// 🔹 Her fırın için farklı renkler belirliyoruz
// Renk paleti
const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FF8C33", "#8C33FF",
  "#33FFD5", "#D533FF", "#FFD533", "#33A1FF", "#FF3361", "#61FF33",
  "#D5FF33", "#33FF8C", "#FF33D5", "#3361FF", "#FFD533"
];

const TrendChart = () => {
  const [graphData, setGraphData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch("/api/getData")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.furnaceId - b.furnaceId);
        setGraphData(sortedData);
      });

    // Dark mode kontrolü
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-2">
      <h1 className="text-3xl font-bold text-center mb-2 dark:text-white">Fırın Sıcaklık Takibi</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {graphData.map((furnace, index) => (
          <div key={furnace.furnaceId} className="p-1 bg-white dark:bg-gray-900 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-center mb-1 dark:text-white">
              {furnaceNames[furnace.furnaceId] || `Fırın ${furnace.furnaceId}`}
            </h2>
            <div className="w-full h-30">
              <Line
                data={{
                  labels: furnace.data.map(d =>
                    new Date(d.timestamp).toLocaleString("tr-TR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  ),
                  datasets: [
                    {
                      label: furnaceNames[furnace.furnaceId] || `Fırın ${furnace.furnaceId}`,
                      data: furnace.data.map(d => d.temperature),
                      borderColor: colors[index % colors.length],
                      backgroundColor: colors[index % colors.length] + "30",
                      borderWidth: 2,
                      pointRadius: 3,
                      fill: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      suggestedMax: 100,
                      ticks: { color: isDarkMode ? "#ffffff" : "#000000" }, // 🔹 Dark mode ve light mode için farklı renk
                    },
                    x: { 
                      ticks: { color: isDarkMode ? "#ffffff" : "#000000" }, // 🔹 Dark mode ve light mode için farklı renk
                    },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendChart;
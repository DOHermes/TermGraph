import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendGraphs = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    fetch("/api/getData")
      .then((res) => res.json())
      .then((data) => setGraphData(data));
  }, []);

  return (
    <div>
      <h1>Fırın Sıcaklık Grafikleri</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {graphData.map((furnace) => (
          <div key={furnace.furnaceId} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            <h2>Fırın {furnace.furnaceId}</h2>
            <Line
              data={{
                labels: furnace.data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
                datasets: [
                  {
                    label: `Fırın ${furnace.furnaceId} Sıcaklık`,
                    data: furnace.data.map((d) => d.temperature),
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 0, 255, 0.2)",
                    fill: true,
                  },
                ],
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendGraphs;

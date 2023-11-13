import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const ChartJS = ({ chartData }) => {
  return (
    <>
      <div style={{height: "calc(100vh - 176px)" }}>
        <Bar
          className="grafic"
          data={chartData}
          options={{
            title: {
              display: true,
              text: "Category",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "rigth",
            },
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </>
  );
};

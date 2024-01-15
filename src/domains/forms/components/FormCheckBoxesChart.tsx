import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { Form, Option } from "@/backend/types/Form";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<"bar"> = {
  indexAxis: "y" as const,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

type FormCheckBoxesChartProps = {
  response: Array<Option & { total: number }>;
  title: string;
  total: number;
};
const FormCheckBoxesChart = ({
  response,
  title,
  total,
}: FormCheckBoxesChartProps) => {
  const labels = response.map((r) => r.label);

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="text-xl font-bold">{title}</h3>
        <h4 className="text-lg font-medium">{total} Responses</h4>
        <div className="max-h-[400px] flex items-center justify-center">
          <Bar
            options={options}
            data={{
              labels,
              datasets: [
                {
                  label: "Responses",
                  data: response.map((r) => r.total),
                  backgroundColor: "#2563EB",
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export { FormCheckBoxesChart };

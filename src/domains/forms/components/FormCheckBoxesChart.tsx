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

import { Form } from "@/server/types/Form";
import { groupCheckboxesResponses } from "../utils";

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
  answers: Form["answers"];
};
const FormCheckBoxesChart = ({ answers }: FormCheckBoxesChartProps) => {
  const values = groupCheckboxesResponses(answers);
  if (!values || Object.keys(values)?.length === 0) {
    return null;
  }

  return Object.keys(values).map((key) => {
    const { labels, questionText, totalOfResponses, totalByLabel } =
      values[key];

    const data = {
      labels,
      datasets: [
        {
          label: "# of Responses",
          backgroundColor: "rgba(255, 99, 132, 1)",
          data: labels.map(
            (label) =>
              Object.values(totalByLabel).find((v) => v.label === label)?.count
          ),
        },
      ],
    };

    return (
      <div key={key} className="bg-white p-4">
        <h3 className="text-xl font-bold">{questionText}</h3>
        <h4 className="text-lg font-medium">{totalOfResponses} Responses</h4>
        <div className="w-full">
          <Bar options={options} data={data} />
        </div>
      </div>
    );
  });
};

export { FormCheckBoxesChart };

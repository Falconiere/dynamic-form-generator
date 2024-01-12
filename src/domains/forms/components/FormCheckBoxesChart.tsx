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

import { Form } from "@/backend/types/Form";

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
  responseTotals: Form["responseTotals"];
};
const FormCheckBoxesChart = ({ responseTotals }: FormCheckBoxesChartProps) => {
  const totalByQuestion = responseTotals?.totalByQuestion ?? {};
  const totalByQuestionOption = responseTotals?.totalByQuestionOption ?? {};
  const questions =
    responseTotals?.questions?.filter(
      (q) => q.element_type === "multiple_choice_checkbox"
    ) ?? [];

  const labels = Object.keys(totalByQuestionOption).length
    ? Object.keys(totalByQuestionOption)
        .filter((question_id) => {
          const options = totalByQuestionOption[question_id];
          return Object.keys(options).find(
            (option_id) =>
              options[option_id].element_type === "multiple_choice_radio"
          );
        })
        .reduce((acc, question_id) => {
          const options = totalByQuestionOption[question_id];
          acc[question_id] = Object.keys(options).map(
            (option_id) => options[option_id].label
          );
          return acc;
        }, {} as { [key: string]: string[] })
    : {};

  return (
    <>
      {questions.map((question) => (
        <div key={question.id} className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-xl font-bold">{question.title}</h3>
          <h4 className="text-lg font-medium">
            {totalByQuestion[question.id]} Responses
          </h4>
          <div className="max-h-[400px] flex items-center justify-center">
            <Bar
              options={options}
              data={{
                labels: labels[question.id] ?? [],
                datasets: [
                  {
                    label: "Responses",
                    data: Object.keys(totalByQuestionOption[question.id]).map(
                      (k) => totalByQuestionOption[question.id][k].count
                    ),
                    backgroundColor: "#2563EB",
                  },
                ],
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export { FormCheckBoxesChart };

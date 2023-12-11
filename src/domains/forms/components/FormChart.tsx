import { Form } from "@/server/types/Form";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

type FormChartProps = {
  responses: Form["responses"];
};
const FormChart = ({ responses }: FormChartProps) => {
  console.log({ responses });
  const filtered = responses?.filter((r) =>
    ["multiple-choice", "checkboxes"].includes(r.question.element_type)
  );
  const labels = filtered?.reduce((acc, response) => {
    if (!acc[response?.question_id]) {
      return {
        ...acc,
        [response?.question_id]: response.question.question_text,
      };
    }
    return acc;
  }, {});

  const optionsByQuestion = filtered?.reduce((acc, response) => {
    const questionId = response?.question_id;
    const value = Array.isArray(response?.response?.value)
      ? response?.response?.value
      : [response?.response?.value];

    const optionsIds = response.question.options?.map((o) => o.id);
    if (!acc[questionId]) {
      return {
        ...acc,
        [questionId]: value.reduce((acc, v) => {
          if (optionsIds?.includes(v)) {
            return {
              ...acc,
              [v]: {
                label: response.question.options?.find((o) => o.id === v)
                  ?.label,
                count: 1,
              },
            };
          }
          return acc;
        }, {}),
      };
    }
    return {
      ...acc,
      [questionId]: value.reduce((acc, v) => {
        if (optionsIds?.includes(v)) {
          return {
            ...acc,
            [v]: {
              label: response.question.options?.find((o) => o.id === v)?.label,
              count: acc[v]?.count + 1,
            },
          };
        }
        return acc;
      }, acc[questionId]),
    };
  }, {});

  console.log({ labels, optionsByQuestion });
  return <Pie data={data} />;
};

export { FormChart };

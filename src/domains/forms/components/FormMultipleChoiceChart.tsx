import { Form } from "@/server/types/Form";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { groupMultipleChoiceResponses } from "../utils";
ChartJS.register(ArcElement, Tooltip, Legend);

const dataset = {
  label: "# of responses",
  data: [12, 19, 3, 5, 2, 3],
  backgroundColor: [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
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
};
export const defaultData: ChartData<"pie"> = {
  labels: [],
  datasets: [dataset],
};

type FormMultipleChoiceChartProps = {
  answers: Form["answers"];
};

const FormMultipleChoiceChart = ({ answers }: FormMultipleChoiceChartProps) => {
  const values = groupMultipleChoiceResponses(answers);
  if (!values || Object.keys(values)?.length === 0) {
    return null;
  }

  return Object.keys(values).map((key) => {
    const { labels, questionText, totalOfResponses, totalByLabel } =
      values[key];
    const data = labels.map(
      (label) =>
        Object.values(totalByLabel).find((l) => l.label === label)?.count
    );

    const datasets = [{ ...dataset, data }];
    return (
      <div key={key} className="bg-white p-4">
        <h3 className="text-xl font-bold">{questionText}</h3>
        <h4 className="text-lg font-medium">{totalOfResponses} Responses</h4>
        <div className="w-[300px]">
          <Pie
            data={{ ...defaultData, labels, datasets }}
            width={100}
            height={100}
            options={{
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </div>
      </div>
    );
  });
};

export { FormMultipleChoiceChart };

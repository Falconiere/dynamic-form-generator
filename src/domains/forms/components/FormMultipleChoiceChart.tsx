import { Form } from "@/backend/types/Form";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataset = {
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

type FormMultipleChoiceChartProps = {
  responseTotals: Form["responseTotals"];
};

const FormMultipleChoiceChart = ({
  responseTotals,
}: FormMultipleChoiceChartProps) => {
  const totalByQuestion = responseTotals?.totalByQuestion ?? {};
  const totalByQuestionOption = responseTotals?.totalByQuestionOption ?? {};
  const questions =
    responseTotals?.questions?.filter(
      (q) => q.element_type === "multiple_choice_radio"
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
            <Pie
              data={{
                labels: labels[question.id] ?? [],
                datasets: [
                  {
                    ...dataset,
                    data: Object.keys(totalByQuestionOption[question.id]).map(
                      (k) => totalByQuestionOption[question.id][k].count
                    ),
                  },
                ],
              }}
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
      ))}
    </>
  );
};

export { FormMultipleChoiceChart };

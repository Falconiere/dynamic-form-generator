import { SummaryOptionCount } from "@/backend/types/Responses";
import { useLocaleCtx } from "@/providers/LocaleProvider";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type FormMultipleChoiceChartProps = {
  response: SummaryOptionCount[];
  title: string;
  total: number;
};

export const getData = (response: SummaryOptionCount[]) => ({
  labels: response.map((r) => r.label),
  datasets: [
    {
      label: "# of Responses",
      data: response.map((r) => r.count),
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
    },
  ],
});

const FormMultipleChoiceChart = ({
  title,
  total,
  response,
}: FormMultipleChoiceChartProps) => {
  const { t } = useLocaleCtx();
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xl font-bold">{title}</h3>
      <h4 className="text-lg font-medium">
        {total} {t("responses.Responses")}
      </h4>
      <div className="max-h-[400px] flex items-center justify-center">
        <Pie
          data={getData(response)}
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
};

export { FormMultipleChoiceChart };

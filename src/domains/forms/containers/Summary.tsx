"use client";
import { isMultipleChoiceQuestion } from "@/domains/forms/utils/isMultipleChoiceQuestion";
import { FormMultipleChoiceChart } from "../components/FormMultipleChoiceChart";
import { FormCheckBoxesChart } from "../components/FormCheckBoxesChart";
import { SummaryResponse } from "@/backend/types/Responses";
import { useLocaleCtx } from "@/providers/LocaleProvider";

type SummaryProps = {
  responses: SummaryResponse[];
};

const Summary = ({ responses }: SummaryProps) => {
  const { t } = useLocaleCtx();
  if (responses.length === 0)
    return (
      <div className="flex items-center p-10">
        <h3 className="m-auto font-semibold">{t("noResponses")}</h3>
      </div>
    );
  return (
    <div className="grid gap-4">
      {responses.map(
        ({ element_type, id, title, question_options, totalOfResponses }) => (
          <div className="grid gap-4" key={id}>
            {isMultipleChoiceQuestion(element_type) ? (
              <>
                {element_type === "multiple_choice_radio" ? (
                  <FormMultipleChoiceChart
                    response={question_options}
                    title={title}
                    total={totalOfResponses}
                  />
                ) : //
                null}
                {element_type === "multiple_choice_checkbox" ? (
                  <FormCheckBoxesChart
                    response={question_options}
                    title={title}
                    total={totalOfResponses}
                  />
                ) : null}
              </>
            ) : (
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-bold">{title}</h3>
                <h4 className="text-lg font-medium">
                  {totalOfResponses} Responses
                </h4>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
export { Summary };

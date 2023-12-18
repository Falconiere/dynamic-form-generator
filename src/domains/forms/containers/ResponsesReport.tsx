"use client";
import { Form } from "@/server/types/Form";
import { isMultipleChoiceQuestion } from "@/server/utils/isMultipleChoiceQuestion";
import { FormMultipleChoiceChart } from "../components/FormMultipleChoiceChart";
import { FormCheckBoxesChart } from "../components/FormCheckBoxesChart";
import { FormTabs } from "../components/FormTabs";
import { sortQuestions } from "../utils/sortQuestions";

type ResponsesReportProps = {
  responseTotals: Form["responseTotals"];
  formId: string;
};

const ResponsesReport = ({ responseTotals, formId }: ResponsesReportProps) => {
  const questions = sortQuestions(responseTotals?.questions) ?? [];
  const totalByQuestion = responseTotals?.totalByQuestion ?? {};
  return (
    <>
      <FormTabs formId={formId} />
      <div className="grid gap-4">
        {questions.map(({ element_type, id, question_text }) => (
          <div className="grid gap-4" key={id}>
            {element_type && isMultipleChoiceQuestion(element_type) ? (
              <>
                {element_type === "multiple-choice" ? (
                  <FormMultipleChoiceChart responseTotals={responseTotals} />
                ) : null}
                {element_type === "checkboxes" ? (
                  <FormCheckBoxesChart responseTotals={responseTotals} />
                ) : null}
              </>
            ) : (
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-bold">{question_text}</h3>
                <h4 className="text-lg font-medium">
                  {totalByQuestion[id]} Responses
                </h4>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export { ResponsesReport };

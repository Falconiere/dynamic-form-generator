"use client";
import { Form } from "@/backend/types/Form";
import { isMultipleChoiceQuestion } from "@/domains/forms/utils/isMultipleChoiceQuestion";
import { FormMultipleChoiceChart } from "../components/FormMultipleChoiceChart";
import { FormCheckBoxesChart } from "../components/FormCheckBoxesChart";
import { FormTabs } from "../components/FormTabs";
import { sortQuestions } from "../utils/sortQuestions";

type SummaryProps = {
  responseTotals: Form["responseTotals"];
  formId: string;
};

const Summary = ({ responseTotals, formId }: SummaryProps) => {
  const questions = sortQuestions(responseTotals?.questions) ?? [];
  const totalByQuestion = responseTotals?.totalByQuestion ?? {};
  return (
    <div className="grid gap-4">
      {questions.map(({ element_type, id, title }) => (
        <div className="grid gap-4" key={id}>
          {element_type && isMultipleChoiceQuestion(element_type) ? (
            <>
              {element_type === "multiple_choice_radio" ? (
                <FormMultipleChoiceChart responseTotals={responseTotals} />
              ) : null}
              {element_type === "multiple_choice_checkbox" ? (
                <FormCheckBoxesChart responseTotals={responseTotals} />
              ) : null}
            </>
          ) : (
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-xl font-bold">{title}</h3>
              <h4 className="text-lg font-medium">
                {totalByQuestion[id]} Responses
              </h4>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export { Summary };

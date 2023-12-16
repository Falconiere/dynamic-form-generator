import { FormElement, FormElementType } from "./Form"

type ResponsesTotal = {
  questions: FormElement[];
  totalByQuestionOption: Record<string, Record<string, { count: number; label: string; element_type: FormElementType }>>;
  totalByQuestionText: Record<string, { question_text: string; count: number; element_type: FormElementType}>;
  totalOfResponses: number;
  totalByQuestion: Record<string, number>;
}
export type { ResponsesTotal }
import { Form, FormElement, FormElementType, Question } from "./Form"

type ResponsesTotal = {
  questions: Question[];
  totalByQuestionOption: Record<
    string, Record<string, { count: number; label: string; element_type: FormElementType }>
  >;
  totalByQuestionText: Record<string, { question_text: string; count: number; element_type: FormElementType}>;
  totalOfResponses: number;
  totalByQuestion: Record<string, number>;
}

type IndividualResponse = {
  id: string;
  form: Form
  created_at: string;
  updated_at: string;
}

export type { ResponsesTotal, IndividualResponse }
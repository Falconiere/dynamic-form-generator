import { FormElementType } from "./Form";

type Answer = {
  form_id: string;
  user_email: string;
  answers: Array<{
    question_id: string;
    element_type: FormElementType
    response: string | string[];
  }>
}

export type { Answer }
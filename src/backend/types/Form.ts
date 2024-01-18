import { answer_options, answer_texts, form_element_type, forms, question_options, questions } from "@prisma/client";


type FormElementType = form_element_type

type Option = Partial<question_options>

type AnswerOption = {
  created_at: string;
  form_id:string;
  id:string;
  question_id:string;
  question_option_id:string;
  response_id:string;
}

type AnswerText = {
  created_at: string;
  form_id:string;
  id:string;
  question_id:string;
  response_id:string;
  text: string;
}

type MultipleOption = Option[];

type FormElement = {
  id: string;
  element_type: FormElementType;
  question_text: string;
  text?: string;
  question_options?: MultipleOption;
  is_required: boolean;
  form_id: string;
  client_idx: number;
  answer_options?: AnswerOption[];
  answer_texts?: AnswerText[];
};

type Question = questions & {
  question_options?: question_options[]
}

type Form = Partial<forms> & {
  questions?: Question[]
}

export type { Form, Question, FormElement, Option, MultipleOption, FormElementType }
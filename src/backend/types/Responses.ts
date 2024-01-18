import { form_status } from "@prisma/client";
import { FormElementType, Option } from "./Form"

type SummaryOptionCount = Pick<Option, "id" | "label"> & { count: number }
type SummaryResponse = {
  question_options: SummaryOptionCount[]
  totalOfResponses: number;
  id: string;
  title: string;
  description: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  form_id: string;
  element_type: FormElementType
  required: boolean;
  order: number;
}

type IndividualResponse = {
  count: number;
  response: {
    form: {
      id: string;
      title: string;
      description: string | null;
      created_at: Date;
      updated_at: Date;
      status: form_status
      questions: {
        id: string;
        title: string;
        order: number;
        element_type: FormElementType;
        required: boolean;
        question_options: {
            id: string;
            label: string;
        }[];
      }[];
    };
  } & {
      id: string;
      form_id: string;
      user_email: string;
  };
  answer_options: {
      id: string;
      created_at: Date | null;
      updated_at: Date | null;
      question_id: string;
      question_option_id: string;
      form_id: string;
      response_id: string;
  }[];
  answer_texts: {
    id: string;
    created_at: Date | null;
    updated_at: Date | null;
    question_id: string;
    form_id: string;
    response_id: string;
    answer: string;
  }[];
}

export type { SummaryResponse,SummaryOptionCount, IndividualResponse }
import { Form, FormElementType, Option } from "./Form"

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
  id: string;
  form: Form
  created_at: string;
  updated_at: string;
}

export type { SummaryResponse,SummaryOptionCount, IndividualResponse }
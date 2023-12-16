import { ResponsesTotal } from "./Responses";

type FormElementType = "short-text" | "large-text" | "multiple-choice" | "checkboxes";

type Option = {
  id: string;
  label: string;
  isChecked?: boolean;
};

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
};

type Form = {
  id?: string;
  title: string;
  description: string;
  questions: FormElement[];
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  status?: "published" | "draft" | "archived";
  responseTotals?: ResponsesTotal
}

export type { Form, FormElement, Option, MultipleOption, FormElementType }
type FormElementType = "short-text" | "large-text" | "multiple-choice" | "checkboxes";

type Option = {
  id: string;
  label: string;
  isChecked?: boolean;
};

type MultipleOption = Option[];

type FormElement = {
  id: string;
  elementType: FormElementType;
  question: string;
  text?: string;
  options?: MultipleOption;
};

type Form = {
  id?: string;
  title: string;
  description: string;
  questions: FormElement[];
  user_id?: string;
}

export type { Form, FormElement, Option, MultipleOption, FormElementType }
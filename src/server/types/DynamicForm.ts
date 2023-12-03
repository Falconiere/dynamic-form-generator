type QuestionType = "text" | "multiple-choice" | "checkboxes";

type Option = {
  id: string;
  label: string;
  isChecked?: boolean;
};

type MultipleOption = Option[];

type QuestionItem = {
  id: string;
  questionType: QuestionType;
  question: string;
  text?: string;
  options?: MultipleOption;
};

type DynamicForm = {
  id?: string;
  title: string;
  description: string;
  questions: QuestionItem[];
  user_id?: string;
}

export type { DynamicForm, QuestionItem, Option, MultipleOption, QuestionType }
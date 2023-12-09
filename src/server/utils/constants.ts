import { FormElementType } from "../types/Form";
const elements = [
  {
    label: "Short text",
    value: "short-text",
  },
  {
    label: "Large text",
    value: "large-text",
  },
  {
    label: "Multiple choice",
    value: "multiple-choice",
  },
  {
    label: "Checkboxes",
    value: "checkboxes",
  },
] as Array<{ label: string; value: FormElementType }>;


export { elements }
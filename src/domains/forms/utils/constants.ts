import { FormElementType } from "../../../backend/types/Form";
const elements = [
  {
    label: "Short text",
    value: "short_text",
  },
  {
    label: "Long text",
    value: "long_text",
  },
  {
    label: "Multiple choice",
    value: "multiple_choice_radio"
  },
  {
    label: "Checkboxes",
    value: "multiple_choice_checkbox",
  },
] as Array<{ label: string; value: FormElementType }>;


export { elements }
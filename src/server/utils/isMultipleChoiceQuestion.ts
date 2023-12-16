import { FormElement } from "../types/Form";

const isMultipleChoiceQuestion = (element_type: FormElement["element_type"]):Boolean => {
  return element_type === "multiple-choice" || element_type === "checkboxes";
}

export { isMultipleChoiceQuestion }
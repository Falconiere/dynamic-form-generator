import { FormElement } from "../types/Form";

const isMultipleChoiceQuestion = (element_type: FormElement["element_type"]):Boolean => {
  return element_type === "multiple_choice_checkbox" || element_type === "multiple_choice_radio";
}

export { isMultipleChoiceQuestion }
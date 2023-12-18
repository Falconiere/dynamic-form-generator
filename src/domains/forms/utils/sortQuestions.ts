import { FormElement } from "@/server/types/Form"

const sortQuestions = (questions:FormElement[] = []) => {
  return questions.sort((a, b) => a.client_idx - b.client_idx)
}

export { sortQuestions }
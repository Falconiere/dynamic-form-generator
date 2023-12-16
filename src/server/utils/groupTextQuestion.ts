import { FormElement } from "../types/Form";

type Payload = { questions: FormElement[]}
type Action = (payload:Payload) => FormElement[]

const groupTextQuestion:Action = ({questions}) => {
  return questions
  .filter(q=>q.element_type === "short-text" || q.element_type === "large-text")
}
export { groupTextQuestion}
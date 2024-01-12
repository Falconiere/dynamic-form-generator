import { FormElement } from "../../../backend/types/Form";

type Payload = { questions: FormElement[]}
type Action = (payload:Payload) => FormElement[]

const groupTextQuestion:Action = ({questions}) => {
  return questions
  .filter(q=>q.element_type ==="short_text" || q.element_type === "long_text")
}
export { groupTextQuestion}
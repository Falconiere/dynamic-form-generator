import { FormElement, FormElementType, MultipleOption, Option } from "../../../backend/types/Form";
import { isMultipleChoiceQuestion } from "./isMultipleChoiceQuestion";


type Group = Record<string, { options: Option[]; element_type:FormElementType }>
type Flatted = Array<{ question_id: string, question_option_id?: string}>
type Payload = { questions: FormElement[]} 
type Response = { group: Group, flatted: Flatted}
type Action = (payload:Payload) => Response

const groupOptionsFromMultipleChoiceQuestion:Action = ({questions}) => {
  const group =  questions
  .filter(
    q=>isMultipleChoiceQuestion(q.element_type)
  ).reduce((acc, next) => {
    if(!next?.question_options) return acc;
    acc[next.id] = {
      options: next?.question_options ?? [],
      element_type: next.element_type
    }
    return acc;
  },{} as Group)
  
  const mapped =  Object.keys(group).map(question_id => {
    return group[question_id].options.map(({id: question_option_id}) => {
      return {question_id, question_option_id}
    })
  })
  return {group, flatted: mapped.flat()};
}
export { groupOptionsFromMultipleChoiceQuestion }
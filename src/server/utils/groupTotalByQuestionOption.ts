import { FormElementType, Option } from "../types/Form";

type Payload = {
  questionOptionsGrouped:  Record<string, { options: Option[]; element_type:FormElementType }>
  countTotalByQuestionOption: Array<{
    question_id: string
    question_option_id?: string
    count: number
  }>
}

type Action = (payload:Payload) =>  Record<string, Record<string, {count: number, label: string, element_type:FormElementType }>>

const groupTotalByQuestionOption:Action = ({questionOptionsGrouped, countTotalByQuestionOption}) => {
    return countTotalByQuestionOption.reduce((acc, next) => {
      if(!acc[next.question_id] && next.question_option_id) {
        acc[next.question_id] = {
          [next.question_option_id]: {
            count: next.count,
            label: questionOptionsGrouped[next.question_id].options.find(({id}) => id === next.question_option_id)?.label ?? "",
            element_type: questionOptionsGrouped[next.question_id].element_type
          }
        }
        return acc
      }
      if(acc[next.question_id] && next.question_option_id) {
        return {
          ...acc,
          [next.question_id]: {
            ...acc[next.question_id],
            [next.question_option_id]: {
              count: next.count,
              label: questionOptionsGrouped[next.question_id].options.find(({id}) => id === next.question_option_id)?.label ?? "",
              element_type: questionOptionsGrouped[next.question_id].element_type
            }
          }
        }
      }
      return acc
  }, {} as Record<string, Record<string, {count: number, label: string, element_type: FormElementType }>>)
}

export { groupTotalByQuestionOption }
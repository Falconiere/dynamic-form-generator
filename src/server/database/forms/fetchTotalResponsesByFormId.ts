
import { countTotalOfResponsesByFormId } from "./countTotalOfResponsesByFormId";
import { fetchQuestionsByFormId } from "./fetchQuestionsByFormId";
import { countTotalOfResponsesForQuestionOptionByFormId } from "./countTotalOfResponsesForQuestionOptionByFormId";

import { groupOptionsFromMultipleChoiceQuestion } from "@/server/utils/groupOptionsFromMultipleChoiceQuestion";
import { groupTotalByQuestionOption } from "@/server/utils/groupTotalByQuestionOption";
import { groupTextQuestion } from "@/server/utils/groupTextQuestion";
import { countTotalOfResponsesForQuestionTextByFormId } from "./countTotalOfResponsesForQuestionTextByFormId";
import { ResponsesTotal } from "@/server/types/Responses";
import { FormElementType } from "@/server/types/Form";
import { countTotalOfResponsesForQuestionByFromId } from "./countTotalOfResponsesForQuestionByFromId";


const fetchTotalResponsesByFormId = async (form_id: string):Promise<ResponsesTotal> => {
  const totalOfResponses = await countTotalOfResponsesByFormId({form_id})
  const questions = await fetchQuestionsByFormId({form_id})
  const questionOptions = groupOptionsFromMultipleChoiceQuestion({ questions})
  const countTotalByQuestionOption = await Promise.all(questionOptions.flatted.map(
    q=> countTotalOfResponsesForQuestionOptionByFormId({
      form_id,
      question_id: q.question_id,
      question_option_id: q.question_option_id
    })
  ))

  const totalByQuestionOption = groupTotalByQuestionOption({
    countTotalByQuestionOption,
    questionOptionsGrouped: questionOptions.group
  })

  const countTotalByQuestionText = await Promise.all(
    groupTextQuestion({questions})
    .map(q=> 
      countTotalOfResponsesForQuestionTextByFormId({
        form_id,
        question_id: q.id
      })
    ))

  const questionText = questions.filter(({element_type}) => element_type === "short-text" || element_type === "large-text")  
  const totalByQuestionText = countTotalByQuestionText.reduce((acc, next) => {
      acc[next.question_id] = {
        question_text: questionText.find(({id}) => id === next.question_id)?.question_text ?? "",
        count: next.count,
        element_type: questionText.find(({id}) => id === next.question_id)?.element_type ?? "short-text"
      }      
      return acc;
    },{ } as Record<string, { question_text: string; count: number; element_type: FormElementType}>)
  
  const countTotalByQuestion = await Promise.all(questions.map(q=>
      countTotalOfResponsesForQuestionByFromId({form_id, question_id: q.id, element_type: q.element_type})
  ))

  const totalByQuestion = countTotalByQuestion.reduce((acc, next) => {
    acc[next.question_id] = next.count
    return acc;
  },{} as Record<string, number>)


  const response = {
    questions,
    totalOfResponses,
    totalByQuestionOption,
    totalByQuestionText,
    totalByQuestion
  }
  return response
}

export { fetchTotalResponsesByFormId }
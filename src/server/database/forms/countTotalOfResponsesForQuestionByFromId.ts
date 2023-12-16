
import { FormElementType } from "@/server/types/Form";
import { isMultipleChoiceQuestion } from "@/server/utils/isMultipleChoiceQuestion";
import { supabase } from "@/server/utils/supabase";


type Payload = {
  form_id: string
  question_id: string
  element_type: FormElementType
}
type Response = {
  question_id: string
  count: number
}
type Action = (payload:Payload) => Promise<Response>
const countTotalOfResponsesForQuestionByFromId:Action = async ({form_id, question_id, element_type}) => {
  const { client } = await supabase()
  
  const { error, count } = await client.from(isMultipleChoiceQuestion(element_type) ? "answer_options" : "answer_texts")
    .select("*",{count:"exact", head: false})
    .eq("form_id", form_id)
    .eq("question_id", question_id)
    .limit(1);
  if(error) {
    throw error;
  }
  return { question_id, count: count ?? 0};
}

export { countTotalOfResponsesForQuestionByFromId }
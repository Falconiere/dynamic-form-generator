import { supabase } from "@/server/utils/supabase"


type Payload = {
  question_id: string
  form_id: string
}

type Response = {
  question_id: string
  count: number
}
type Action = (payload:Payload) => Promise<Response>

const countTotalOfResponsesForQuestionTextByFormId:Action = async ({form_id, question_id}) => {
  const { client } = await supabase()
  const { error, count } = await client.from("answer_texts")
    .select("*",{count:"exact", head: false})
    .eq("form_id", form_id)
    .eq("question_id", question_id)
    .limit(1)
  if(error) {
    throw error;
  }
  return { question_id, count: count ?? 0};
}

export { countTotalOfResponsesForQuestionTextByFormId }
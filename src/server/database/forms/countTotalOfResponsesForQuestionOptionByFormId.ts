import { supabase } from "@/server/utils/supabase";


type Payload = {
  question_id: string
  question_option_id?: string
  form_id: string
}

type Response = {
  question_id: string
  question_option_id?: string
  count: number
}

type Action = (payload: Payload) => Promise<Response>

const countTotalOfResponsesForQuestionOptionByFormId:Action = async ({form_id, question_id, question_option_id}) => {
  const { client } = await supabase()
  const { error, count } = await client.from("answer_options")
    .select("*",{count:"exact", head: false})
    .eq("form_id", form_id)
    .eq("question_id", question_id)
    .eq("question_option_id", question_option_id)
    .limit(1)
  if(error) {
    throw error;
  }
  return { question_id, question_option_id, count: count ?? 0};
}

export { countTotalOfResponsesForQuestionOptionByFormId }
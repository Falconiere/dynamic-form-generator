import { supabase } from "../clientSupabase";


type CreateQuestionOptionPayload = {
  question_id: string;
  label: string;
}
const createQuestionOption = async <T>(payload:CreateQuestionOptionPayload):Promise<T> => {
  const client = supabase()
  const {error, data } = await client
    .from('question_options')
    .insert<CreateQuestionOptionPayload>(payload)
    .select()
  if (error) throw error
  return data?.[0] as T
}

export { createQuestionOption }
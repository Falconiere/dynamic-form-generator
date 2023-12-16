import { FormElement } from "@/server/types/Form";
import { supabase } from "@/server/utils/supabase";

type Payload = {
  form_id: string
}

type Action = (payload:Payload) => Promise<FormElement[]>

const fetchQuestionsByFormId: Action = async ({form_id}) => {
  const { client } = await supabase()
  const { error, data } = await client
  .from("forms")
  .select(`
      questions (
      *,
      question_options (
        id,
        label
      )
    )`)
  .eq("id", form_id)
  .single()

  if(error) {
    throw error;
  }
  return data?.questions
}
export { fetchQuestionsByFormId }
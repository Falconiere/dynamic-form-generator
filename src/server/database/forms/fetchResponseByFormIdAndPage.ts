import { IndividualResponse } from "@/server/types/Responses";
import { supabase } from "@/server/utils/supabase";

type Payload = {
  formId: string
  page?: number
}

type Response = { data?: IndividualResponse | null, count?: number | null}

type Action = (payload: Payload) => Promise<Response>

const fetchResponseByFormIdAndPage:Action = async ({ formId, page = 1}) => {
  const range = page > 0 ? page - 1 : 0
  const { client } = await supabase()
  const { error: errorResponsesId, data: ids, count } = await await client.from("responses").select("id",{count:"exact"}).eq("form_id", formId).range(range, range);
  const mappedIds = ids?.map(({ id }) => id) ?? []
  const { error, data } = await client.from("responses")
    .select(`
      *,
      form:forms (
        *,
        questions (
          *,
          question_options (*),
          answer_texts (*),
          answer_options (*)
        )
      )
    `)
    .in("id", mappedIds)
    .in("form.questions.answer_texts.response_id", mappedIds)
    .in("form.questions.answer_options.response_id", mappedIds)
    .single()

  if(error || errorResponsesId) {
    const e = error ?? errorResponsesId    
    console.error(e)
    throw e;
  }
  
  return {data, count}
}

export { fetchResponseByFormIdAndPage }
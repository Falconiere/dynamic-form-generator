import { supabase } from "@/server/utils/supabase";

type Payload = {
  form_id: string
}

type Response = number

type Action = (payload:Payload) => Promise<Response>
const countTotalOfResponsesByFormId:Action = async ({form_id}) => {

  const { client } = await supabase()
  const { error, count } = await client.from("responses")
    .select("*",{count:"exact", head: false})
    .eq("form_id", form_id)
    .limit(1);
  if(error) {
    throw error;
  }
  return count ?? 0;
}

export { countTotalOfResponsesByFormId }
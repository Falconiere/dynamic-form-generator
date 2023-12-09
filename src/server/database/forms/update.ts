import { Form } from "@/server/types/Form";
import { FormResponse } from "@/server/types/FormResponse";
import { supabase } from "@/server/utils/supabase";


type Update = {
  id:Form["id"],
  payload:Form
}
const update = async ({id, payload}:Update):Promise<FormResponse> => {
  const { client, user } = await supabase()
  const { error, data } = await client.from("forms").update<Form>({
    ...payload,
    user_id: user?.id,
  }).eq("id", id);

  if(error) {
    throw error;
  }
  return data;
}
export type { Update}
export { update }
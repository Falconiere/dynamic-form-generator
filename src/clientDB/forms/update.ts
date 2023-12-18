import { FormResponse } from "@/server/types/FormResponse";
import { getCurrentUser, supabase } from "../clientSupabase";
import { Update } from "@/server/database/forms/update";
import { Form } from "@/server/types/Form";

const update = async ({id, payload}:Update):Promise<FormResponse> => {
  const user = await getCurrentUser();
  const { error, data } = await supabase().from("forms").update<Partial<Form>>({
    title: payload.title,
    description: payload.description,
    status: payload.status,
    user_id: user?.id,
  }).eq("id", id);
  if(error) {
    throw error;
  }
  return data;
}
export { update }
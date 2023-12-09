import { Form } from "@/server/types/Form";
import { FormResponse } from "@/server/types/FormResponse";
import { supabase } from "@/server/utils/supabase";

const  create = async (payload:Form):Promise<FormResponse> => {
const {client, user } = await supabase()
  const { error, data } = await client.from("forms").insert<Form>({
    ...payload,
    user_id: user?.id,
  });
  if(error) {
    throw error;
  }
  return data;
}

export { create }
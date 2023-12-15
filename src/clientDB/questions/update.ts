import { FormResponse } from "@/server/types/FormResponse";
import { supabase } from "../clientSupabase";
import { FormElement } from "@/server/types/Form";

const update = async ({ id, ...payload}:FormElement):Promise<FormResponse> => {
  delete payload.question_options;
  const { error, data } = await supabase()
    .from("questions")
    .update<Partial<FormElement>>(payload)
    .eq("id", id).single();
    
  if(error) {
    throw error;
  }
  return data;
}
export { update }
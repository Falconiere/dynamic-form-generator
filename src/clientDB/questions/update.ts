import { FormResponse } from "@/server/types/FormResponse";
import { getCurrentUser, supabase } from "../clientSupabase";
import { Update } from "@/server/database/forms/update";
import { Form, FormElement } from "@/server/types/Form";

const update = async ({ id, ...payload}:FormElement):Promise<FormResponse> => {
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
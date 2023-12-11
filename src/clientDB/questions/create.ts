import { FormElement } from "@/server/types/Form";
import { supabase } from "../clientSupabase";

const create = async <T>(payload: Partial<FormElement>): Promise<T> => {
  const { error, data } = await supabase().from("questions").insert<Partial<FormElement>>(payload).select()
  if(error) {
    throw error;
  }
  return data?.[0] as unknown as T;
}

export { create }
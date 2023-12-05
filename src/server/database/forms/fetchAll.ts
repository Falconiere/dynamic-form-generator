import { FormResponse } from "@/server/types/FormResponse";
import { supabase } from "@/server/utils/supabase"

const fetchAll = async (): Promise<FormResponse>=> {
  const { client, user } = await supabase()
  const { error, data } = await client.from("forms").select("*").eq("user_id", user?.id);
  if(error) {
    throw error;
  }
  return data;
}

export { fetchAll }
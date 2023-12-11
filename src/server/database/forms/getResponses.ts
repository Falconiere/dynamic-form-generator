import { supabase } from "@/server/utils/supabase";
const getResponses = async <T>(id: string):Promise<T> => {
  const { client } = await supabase()
  const { error, data } = await client.from("responses")
    .select("*")
    .eq("form_id", id)
  if(error) {
    throw error;
  }
  return data as unknown as T;
}

export { getResponses }
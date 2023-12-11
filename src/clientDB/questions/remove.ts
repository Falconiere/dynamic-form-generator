import { supabase } from "../clientSupabase";

const remove = async (id:string) => {
  const { error, data } = await supabase()
  .from("questions")
  .delete()
  .eq("id", id)
  if(error) {
    throw error;
  }
  return data;
}

export { remove }
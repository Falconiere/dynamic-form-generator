import { getSupabase } from "@/server/utils/getSupabase";

const getFormById = async (id: string) => {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser()
  const { error, data } = await supabase.from("forms")
    .select("*")
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

  if(error) {
    throw error;
  }
  
  return data;
}

export { getFormById }
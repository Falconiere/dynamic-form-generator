import { supabase } from "@/server/utils/supabase";
const fetchById = async <T>(id: string):Promise<T> => {
  const { client, user } = await supabase()
  const { error, data } = await client.from("forms")
    .select(`
      *, 
      questions (
        *,
        question_options (*)
      )
    `)
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();
  if(error) {
    throw error;
  }
  return data as unknown as T;
}

export { fetchById }
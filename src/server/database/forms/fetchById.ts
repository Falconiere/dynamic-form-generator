import { supabase } from "@/server/utils/supabase";
const fetchById = async <T>(id: string):Promise<T> => {
  const { client, user } = await supabase()
  const { error, data } = await client.from("forms")
    .select(`
      *, 
      questions (
        *,
        client_idx,
        question_options (*)
      ),
      answers (*,
        question: questions (
          question_text,
          element_type,
          client_idx
        )
      )
    `)
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

const { data: test } = await client.from("forms")
  .select(`
    answers (
      
    )
  `)
  .eq("id", id)
  .eq("user_id", user?.id)
  
  .single()

  console.log(test)

  if(error) {
    throw error;
  }
  return data as unknown as T;
}

export { fetchById }
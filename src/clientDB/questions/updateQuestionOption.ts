import { supabase } from "../clientSupabase";

const updateQuestionOption = async ({id, label}:{id:string; label: string}) => {
  const { error, data } = await supabase()
  .from("question_options")
  .update({label})
  .eq("id", id).single();
  
if(error) {
  throw error;
}
return data;
}

export { updateQuestionOption }
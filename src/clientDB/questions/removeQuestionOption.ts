import { supabase } from "../clientSupabase";

const removeQuestionOption = async (id: string) => {
  const { error, data } = await supabase()
  .from("question_options")
  .delete()
  .eq("id", id)
  if(error) {
    throw error;
  }
  return data;
}
export { removeQuestionOption }
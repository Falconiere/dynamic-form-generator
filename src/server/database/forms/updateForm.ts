import { DynamicForm } from "@/server/types/DynamicForm";
import { getSupabase } from "@/server/utils/getSupabase";
import { PostgrestError } from "@supabase/supabase-js";

const updateForm = async (id:DynamicForm["id"],payload:DynamicForm):Promise<DynamicForm | PostgrestError | null> => {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser()
  const { error, data } = await supabase.from("forms").update<DynamicForm>({
    ...payload,
    user_id: user?.id,
  }).eq("id", id);
  if(error) {
    throw error;
  }
  return data;
}

export { updateForm }
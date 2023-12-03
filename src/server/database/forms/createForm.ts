import { DynamicForm } from "@/server/types/DynamicForm";
import { getSupabase } from "@/server/utils/getSupabase";
import { PostgrestError } from "@supabase/supabase-js";

const  createForm = async (payload:DynamicForm):Promise<DynamicForm | PostgrestError | null> => {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser()
  const { error, data } = await supabase.from("forms").insert<DynamicForm>({
    ...payload,
    user_id: user?.id,
  });
  if(error) {
    throw error;
  }
  return data;
}

export { createForm }
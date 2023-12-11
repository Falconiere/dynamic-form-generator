import { Form } from "@/server/types/Form";
import { getCurrentUser, supabase } from "../clientSupabase";

const create = async <T>(form: Form): Promise<T> => {
  const user = await getCurrentUser();
  const payload = {
    title: form.title,
    description: form.description,
    user_id: user?.id,
  }
  const { error, data } = await supabase().from("forms").insert<Partial<Form>>(payload).select()
  if(error) {
    throw error;
  }
  return data?.[0] as unknown as T;
}

export { create }
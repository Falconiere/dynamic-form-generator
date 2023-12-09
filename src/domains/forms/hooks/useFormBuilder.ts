import { Update } from "@/server/database/forms/update";
import { Form } from "@/server/types/Form";
import { FormResponse } from "@/server/types/FormResponse";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useFormBuilder = () => {
  const supabase = createClientComponentClient();
  const getCurrentUser = async () => {
    const {data}  = await supabase.auth.getUser();
    if(!data.user?.id){
      throw new Error("User not found")
    }
    return data.user
  }

  const create = async (form: Form) => {
    const user = await getCurrentUser();
    const { error, data } = await supabase.from("forms").insert<Form>({
      ...form,
      user_id: user?.id,
    });
    if(error) {
      throw error;
    }
    return data;
  }

  const update = async ({id, payload}:Update):Promise<FormResponse> => {
    const user = await getCurrentUser();
    console.log({id, payload})
    const { error, data } = await supabase.from("forms").update<Form>({
      ...payload,
      user_id: user?.id,
    }).eq("id", id);
  
    if(error) {
      throw error;
    }
    return data;
  }

  const handleOnSubmit = async (payload?: Form) => {
   
    if(!payload)return
    if (payload?.id) {
      await update({
        id: payload.id,
        payload,
      });
      return;
    }
    await create(payload);
  }
  return { handleOnSubmit }
}

export { useFormBuilder }

import * as client from "@/client";
import { Form } from "@/server/types/Form";


const handleOnCreateDraft = async () => {
  try {
    const payload:Form = {
      title: "Untitled form",
      description: "Untitled form description",
      status: "draft",
    } 
   return await client.forms.create(payload);
  } catch (error) {
    console.error(error);
  }
}

export { handleOnCreateDraft };
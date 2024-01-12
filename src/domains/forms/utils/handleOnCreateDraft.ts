
import { clientApi } from "@/clientApi";
import { Form } from "@/backend/types/Form";

const handleOnCreateDraft = async () => {
  try {
    const payload:Form = {
      title: "Untitled form",
      description: "Untitled form description",
      status: "draft",
    } 
   return await clientApi.forms.create(payload);
  } catch (error) {
    console.error(error);
  }
}

export { handleOnCreateDraft };
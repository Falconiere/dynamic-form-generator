import * as formsDB from "@/clientDB/forms/create";
import * as questionsDB from "@/clientDB/questions/create";
import { v4 as uuidv4 } from "uuid";
import { Form, FormElement, Option } from "@/server/types/Form";


const handleOnCreateDraft = async () => {
  try {
    const payload = {
      title: "Untitled form",
      description: "Untitled form description",
      status: "draft",
    } as Form;
    const response = await formsDB.create<Form>(payload);  
    if(!response || !response.id) throw new Error("Error creating form");

    const questionPayload:Partial<FormElement> = {
      id: uuidv4(),
      form_id: response.id,
      element_type: "short-text",
      question_text: "Untitled question",
      is_required: false,
      options: [],
      client_idx: 0,
    };
    await questionsDB.create(questionPayload);
    return response
  } catch (error) {
    console.error(error);
  }
}

export { handleOnCreateDraft };
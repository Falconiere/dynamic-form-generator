import { ListForms } from "@/domains/forms/screens/ListForms";
import { fetchAll } from "@/server/database/forms";
import { DynamicForm } from "@/server/types/DynamicForm";

const Page = async () => {
  let data: DynamicForm[] = [];
  try {
    const response = await fetchAll();
    if (Array.isArray(response)) data = response;
  } catch (error) {}

  return <ListForms forms={data} />;
};

export default Page;

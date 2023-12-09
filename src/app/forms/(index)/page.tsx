import { ListForms } from "@/domains/forms/screens/ListForms";
import { fetchAll } from "@/server/database/forms";
import { Form } from "@/server/types/Form";

const Page = async () => {
  let data: Form[] = [];
  try {
    const response = await fetchAll();
    if (Array.isArray(response)) data = response;
  } catch (error) {}

  return <ListForms forms={data} />;
};

export default Page;

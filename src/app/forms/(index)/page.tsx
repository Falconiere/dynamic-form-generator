import { ListForm } from "@/domains/forms/screens/ListForm";
import { fetchAll } from "@/server/database/forms";
import { Form } from "@/server/types/Form";

const Page = async () => {
  let data: Form[] = [];
  try {
    const response = await fetchAll();
    if (Array.isArray(response)) data = response;
  } catch (error) {}

  return <ListForm forms={data} />;
};

export default Page;

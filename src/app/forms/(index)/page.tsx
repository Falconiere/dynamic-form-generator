import { models } from "@/backend";
import { ListForm } from "@/domains/forms/screens/ListForm";
import { forms } from "@prisma/client";

const Page = async () => {
  let data: forms[] = await models.forms.fetchAll();
  return <ListForm forms={data} />;
};

export default Page;

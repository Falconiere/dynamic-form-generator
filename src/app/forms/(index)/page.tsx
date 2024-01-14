import { models } from "@/backend";
import { getPrismaClient } from "@/backend/prisma";
import { ListForm } from "@/domains/forms/screens/ListForm";
import { forms } from "@prisma/client";

const Page = async () => {
  let data: forms[] = [];
  try {
    data = await models.forms.fetchAll();
  } catch (error) {}

  return <ListForm forms={data} />;
};

export default Page;

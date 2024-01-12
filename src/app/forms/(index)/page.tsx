import { getPrismaClient } from "@/backend/prisma";
import { ListForm } from "@/domains/forms/screens/ListForm";
import { forms } from "@prisma/client";

const Page = async () => {
  let data: forms[] = [];
  try {
    const client = getPrismaClient();
    data = await client.forms.findMany();
  } catch (error) {}

  return <ListForm forms={data} />;
};

export default Page;

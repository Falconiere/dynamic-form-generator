import { getFormById } from "@/server/database/forms/getFormById";
import { DynamicForm } from "@/domains/forms/containers/DynamicForm";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  const form = await getFormById(id);
  return <DynamicForm form={form} />;
};

export default Page;

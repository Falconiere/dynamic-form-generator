import { DynamicFormFields } from "@/domains/forms/containers/DynamicFormFields";
import { fetchById } from "@/server/database/forms";
import { DynamicForm } from "@/server/types/DynamicForm";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  const form = await fetchById<DynamicForm>(id);
  return <DynamicFormFields form={form} />;
};

export default Page;

import { DynamicFormFields } from "@/domains/forms/containers/DynamicFormFields";
import { getFormById } from "@/server/database/forms/getFormById";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  const form = await getFormById(id);
  return <DynamicFormFields form={form} />;
};

export default Page;

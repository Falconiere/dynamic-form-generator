import { EditForm } from "@/domains/forms/screens/EditForm";
import { fetchById } from "@/server/database/forms";
import { getResponses } from "@/server/database/forms/getResponses";
import { Form } from "@/server/types/Form";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  const [form] = await Promise.all([fetchById<Form>(id)]);
  try {
    if (!form) return redirect("/not-found");
    return <EditForm defaultValue={form} />;
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;

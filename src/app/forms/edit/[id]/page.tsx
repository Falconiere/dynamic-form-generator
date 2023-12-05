import { EditForm } from "@/domains/forms/screens/EditForm";
import { fetchById } from "@/server/database/forms";
import { DynamicForm } from "@/server/types/DynamicForm";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  try {
    const form = await fetchById<DynamicForm>(id);
    if (!form) return redirect("/not-found");
    return <EditForm form={form} />;
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;

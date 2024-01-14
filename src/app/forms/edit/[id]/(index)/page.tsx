import { models } from "@/backend";
import { EditForm } from "@/domains/forms/screens/EditForm";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  const [form] = await Promise.all([
    models.forms.findById(id),
    //fetchTotalResponsesByFormId(id),
  ]);
  try {
    if (!form) return redirect("/not-found");
    return <EditForm defaultValue={form} />;
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;

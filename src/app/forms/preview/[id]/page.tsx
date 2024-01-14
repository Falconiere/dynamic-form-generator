import { models } from "@/backend";
import { PreviewForm } from "@/domains/forms/screens/PreviewForm";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  try {
    const form = await models.forms.findById(id);
    if (!form) return redirect("/not-found");
    return <PreviewForm form={form} />;
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;

import { models } from "@/backend";
import { FormPreview } from "@/domains/forms/containers/FormPreview";
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
    return <FormPreview form={form} />;
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;

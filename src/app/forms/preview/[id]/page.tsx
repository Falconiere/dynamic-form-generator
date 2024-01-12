import { services } from "@/backend";
import { PreviewForm } from "@/domains/forms/screens/PreviewForm";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  try {
    console.log({ id });
    const form = await services.forms.findById(id);
    if (!form) return redirect("/not-found");
    console.log({ form });
    return <PreviewForm form={form} />;
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;

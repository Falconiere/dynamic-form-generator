import { ResponsesReport } from "@/domains/forms/containers/ResponsesReport";
import { fetchTotalResponsesByFormId } from "@/server/database/forms/fetchTotalResponsesByFormId";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
  searchParams: {};
};
const Page = async ({ params }: PageProps) => {
  const { id } = params;
  try {
    const responseTotals = await fetchTotalResponsesByFormId(id);
    if (!responseTotals) return redirect("/not-found");
    return <ResponsesReport responseTotals={responseTotals} formId={id} />;
  } catch (error) {
    return redirect("/not-found");
  }
};

export default Page;

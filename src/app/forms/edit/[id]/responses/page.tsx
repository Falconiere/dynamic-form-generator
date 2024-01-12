import { FormResponseTabsParams } from "@/domains/forms/contants/formResponseTabs";
import { ResponsesForm } from "@/domains/forms/screens/ResponsesForm";

type PageProps = {
  params: { id: string };
  searchParams?: {
    tab?: FormResponseTabsParams["currentTab"];
    page?: string;
  };
};
const Page = async ({ params, searchParams }: PageProps) => {
  const { id } = params;
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const tab = searchParams?.tab ?? "summary";
  return null;
  // try {
  //   const [responseTotals, { data, count }] = await Promise.all([
  //     fetchTotalResponsesByFormId(id),
  //     fetchResponseByFormIdAndPage({ formId: id, page }),
  //   ]);
  //   if (!responseTotals) return null;
  //   return (
  //     <ResponsesForm
  //       responseTotals={responseTotals}
  //       individualResponse={data}
  //       count={count}
  //       formId={id}
  //       currentTab={tab}
  //       currentPage={page}
  //     />
  //   );
  // } catch (error) {
  //   return null;
  // }
};

export default Page;

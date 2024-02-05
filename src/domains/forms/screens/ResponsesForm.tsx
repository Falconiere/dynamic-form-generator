"use client";
import { Summary } from "../containers/Summary";
import { FormTabs } from "../components/FormTabs";
import { formTabs } from "../contants/formTabs";
import {
  FormResponseTabsParams,
  formResponseTabs,
} from "../contants/formResponseTabs";
import { FormPaginateResponses } from "../components/FormPaginateResponses";
import { FormPreview } from "../containers/FormPreview";
import { IndividualResponse, SummaryResponse } from "@/backend/types/Responses";
import { useLocaleCtx } from "@/providers/LocaleProvider";

type ResponsesFormProps = {
  summary: SummaryResponse[];
  individualResponse: IndividualResponse | null;
  formId: string;
  currentTab: FormResponseTabsParams["currentTab"];
  currentPage?: number;
};
const ResponsesForm = ({
  summary,
  individualResponse,
  formId,
  currentTab,
  currentPage = 1,
}: ResponsesFormProps) => {
  const { lang, t } = useLocaleCtx();

  return (
    <>
      <FormTabs links={formTabs(formId)} />
      <div>
        <FormTabs
          links={formResponseTabs({ formId, currentTab, lang })}
          className="relative pb-0 gap-0 rounded-tl-md rounded-tr-md overflow-hidden border border-solid border-gray-200 border-l-0 border-r-0 border-t-0 z-10 mb-[-3px]"
          classNameLink="shadow-none rounded-none"
        />
        {currentTab === "summary" ? <Summary responses={summary} /> : null}
        {currentTab === "individual" ? (
          <>
            {individualResponse?.response ? (
              <>
                <FormPaginateResponses
                  formId={formId}
                  currentPage={currentPage}
                  total={individualResponse?.count ?? 0}
                />
                <FormPreview
                  individualResponse={individualResponse}
                  isResponse
                />
              </>
            ) : (
              <div className="flex items-center p-10">
                <h3 className="m-auto font-semibold">{t("noResponses")}</h3>
              </div>
            )}
          </>
        ) : null}
      </div>
    </>
  );
};
export { ResponsesForm };

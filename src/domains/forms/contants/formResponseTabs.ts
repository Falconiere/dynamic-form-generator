import { locales } from "@/locales"
import { langs } from "@prisma/client"

type FormResponseTabsParams = {
  formId: string, 
  currentTab: "summary" | "individual"
  lang: langs,
}

type Action = (params: FormResponseTabsParams) => Array<{
  href: string,
  label: string,
  isActive: boolean
}>

const formResponseTabs:Action = ({formId, currentTab, lang = "en"}) => [
  {
    href: `/forms/edit/${formId}/responses?tab=summary`,
    label: locales[lang]["summary"],
    isActive: currentTab === "summary",
  },
  {
    href: `/forms/edit/${formId}/responses?tab=individual`,
    label: locales[lang]["individual"],
    isActive: currentTab === "individual",
  }
]

export type { FormResponseTabsParams }
export { formResponseTabs }
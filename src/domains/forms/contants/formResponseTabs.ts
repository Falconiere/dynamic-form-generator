type FormResponseTabsParams = {
  formId: string, 
  currentTab: "summary" | "individual"
}

type Action = (params: FormResponseTabsParams) => Array<{
  href: string,
  label: string,
  isActive: boolean
}>

const formResponseTabs:Action = ({formId, currentTab}) => [
  {
    href: `/forms/edit/${formId}/responses?tab=summary`,
    label: "Summary",
    isActive: currentTab === "summary",
  },
  {
    href: `/forms/edit/${formId}/responses?tab=individual`,
    label: "Individual",
    isActive: currentTab === "individual",
  }
]

export type { FormResponseTabsParams }
export { formResponseTabs }
const formTabs = (formId:string)=>[
  {
    href: `/forms/edit/${formId}`,
    label: "Form Builder",
  },
  {
    href: `/forms/edit/${formId}/responses`,
    label: "Responses",
  },
  // {
  //   href: `/forms/edit/${formId}/settings`,
  //   label: "Setting",
  // }
]

export { formTabs }
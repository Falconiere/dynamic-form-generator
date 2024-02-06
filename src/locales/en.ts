const lang = {
  create:"Create",
  edit:"Edit",
  delete:"Delete",
  publish:"Publish",
  archive:"Archive",
  unarchive:"Unarchive",
  creating:"Creating...",
  title:"Title",
  description:"Description",
  status:"Status",
  action:"Action",
  createdAt:"Created At",
  updatedAt:"Updated At",
  untitled:"Untitled Form",
  noDescription:"No Description",
  newQuestion:"New Question",
  shortText:"Short Text",
  longText:"Long Text",
  multipleChoice:"Multiple Choice",
  checkboxes:"Checkboxes",
  required:"Required",
  addOption:"Add Option",
  formBuilder:"Form Builder",
  preview:"Preview",
  responses:"Responses",
  summary:"Summary",
  individual:"Individual",
  submit:"Submit",
  submitting:"Submitting...",
  error:{
    title:"Error",
    description:"Something went wrong. Please try again later."
  },
  profile:"Profile",
  myForms:"My Forms",
  logout:"Logout",
  saving:"Saving...",
  copyLink:"Copy Link",
  linkCopied:"Form link copied to clipboard",
  noResponses:"No responses found",
  forms:{
    
    dialogMessage:{
      title:"Your response has been recorded",
      description:" Thank you very much for your response!",
    },
    status:{
      published:"Published",
      draft:"Draft",
      archived:"Archived"
    },
    tabs:{
      published:"Published",
      draft:"Draft",
      archived:"Archived"
    },
    notFound:{
      published:"No published forms found",
      draft:"No draft forms found",
      archived:"No archived forms found"
    },
  }
} as const;
export { lang };
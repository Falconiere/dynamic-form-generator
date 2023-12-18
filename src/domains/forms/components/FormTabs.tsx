import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FormTabsProps = {
  formId: string;
};

const linkStyles =
  "tab bg-white font-semibold p-4 rounded-md cursor-pointer shadow-md hover:bg-blue-400 hover:text-white";
const FormTabs = ({ formId }: FormTabsProps) => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return {
      "bg-blue-400 text-white": pathname === path,
    };
  };
  return (
    <div className="tabs grid grid-cols-3 text-center justify-between gap-2 sticky top-0 bg-slate-100 pb-4 ">
      <Link
        className={cn(linkStyles, isActive(`/forms/edit/${formId}`))}
        href={`/forms/edit/${formId}`}
      >
        Form
      </Link>
      <Link
        className={cn(linkStyles, isActive(`/forms/edit/${formId}/responses`))}
        href={`/forms/edit/${formId}/responses`}
      >
        Responses
      </Link>
      <Link
        className={cn(linkStyles, isActive(`/forms/edit/${formId}/settings`))}
        href={`/forms/edit/${formId}/settings`}
      >
        Settings
      </Link>
    </div>
  );
};

export { FormTabs };

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type FormPaginateResponsesProps = {
  formId: string;
  total: number | string;
  currentPage: number;
};

const FormPaginateResponses = ({
  formId,
  currentPage = 1,
  total,
}: FormPaginateResponsesProps) => (
  <div className="flex bg-white p-2 gap-2 justify-center">
    {currentPage > 1 ? (
      <Link
        href={`/forms/edit/${formId}/responses?tab=individual&page=${
          currentPage - 1
        }`}
        aria-disabled={currentPage === 1}
        className={cn({
          "aria-disabled:cursor-not-allowed": currentPage === 1,
        })}
      >
        <ArrowLeft />
      </Link>
    ) : (
      <ArrowLeft className="cursor-not-allowed" />
    )}
    <span>{currentPage}</span>
    <span>of</span>
    <span>{total}</span>
    {Number(currentPage) < Number(total) ? (
      <Link
        href={`/forms/edit/${formId}/responses?tab=individual&page=${
          currentPage + 1
        }`}
        aria-disabled={Number(currentPage) === Number(total)}
        className={cn({
          "aria-disabled:cursor-not-allowed":
            Number(currentPage) === Number(total),
        })}
      >
        <ArrowRight />
      </Link>
    ) : (
      <ArrowRight className="cursor-not-allowed" />
    )}
  </div>
);

export { FormPaginateResponses };

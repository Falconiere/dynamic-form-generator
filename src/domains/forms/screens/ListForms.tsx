import { Card, CardTitle } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Form } from "@/server/types/Form";
import Link from "next/link";

type ListFormsProps = {
  forms?: Form[];
};

const ListForms = ({ forms }: ListFormsProps) => {
  if (!forms)
    return (
      <div className="page">
        <Card>
          <CardTitle>No forms found</CardTitle>
        </Card>
      </div>
    );
  return (
    <>
      <h1 className="text-4xl font-medium">All Forms ({forms.length})</h1>
      <Divider />
      <div className="grid grid-cols-4 gap-4 grid-rows-[minmax(100px, auto)]">
        {Array.isArray(forms)
          ? forms?.map((form: Form) => (
              <Link
                href={`/forms/edit/${form.id}`}
                key={form.id}
                className="bg-white shadow-md p-4 hover:scale-105 transition-all"
              >
                <h2 className="text-lg font-medium">{form.title}</h2>
                <p className="text-sm">{form.description}</p>
              </Link>
            ))
          : null}
      </div>
    </>
  );
};

export { ListForms };

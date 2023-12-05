import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAll } from "@/server/database/forms";
import { DynamicForm } from "@/server/types/DynamicForm";
import Link from "next/link";

const Page = async () => {
  const forms = await fetchAll();
  if (!forms)
    return (
      <div className="page">
        <Card>
          <CardTitle>No forms found</CardTitle>
        </Card>
      </div>
    );
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.isArray(forms)
        ? forms?.map((form: DynamicForm) => (
            <Link href={`/forms/edit/${form.id}`} key={form.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{form.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{form.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))
        : null}
    </div>
  );
};

export default Page;

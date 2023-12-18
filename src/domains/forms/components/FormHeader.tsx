import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Form } from "@/server/types/Form";

type FormHeaderProps = {
  value: {
    title: string;
    description: string;
  };
  status: Form["status"];
  onChange: (value: FormHeaderProps["value"]) => void;
};
const FormHeader = ({ value, status, onChange }: FormHeaderProps) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({
      ...value,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <div className="flex">
          <span
            className={cn("text-center text-white rounded-md p-2 ", {
              "bg-green-500": status === "published",
              "bg-yellow-500": status === "draft",
              "bg-red-500": status === "archived",
            })}
          >
            {status}
          </span>
        </div>
        <CardTitle>
          <Input
            type="text"
            placeholder="Untitled form"
            name="title"
            className="text-3xl font-semibold h-16"
            onChange={handleChange}
            value={value.title}
          />
        </CardTitle>
        <Textarea
          placeholder="Form description"
          name="description"
          onChange={handleChange}
          value={value.description}
        />
      </CardHeader>
    </Card>
  );
};

export { FormHeader };

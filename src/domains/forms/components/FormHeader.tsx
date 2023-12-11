import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormHeaderProps = {
  value: {
    title: string;
    description: string;
  };
  onChange: (value: FormHeaderProps["value"]) => void;
};
const FormHeader = ({ value, onChange }: FormHeaderProps) => {
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

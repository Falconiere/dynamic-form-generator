import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRef } from "react";

import { Edit, Trash } from "lucide-react";
import { cn } from "@/utils/utils";
import { FormAddOptionButton } from "./FormAddOptionButton";
import { Question } from "@/backend/types/Form";
import { useFormElementMultipleChoice } from "../hooks/useFormElementMultipleChoice";

type FormRadioGroupProps = {
  question: Question;
};
function FormRadioGroup({ question }: Readonly<FormRadioGroupProps>) {
  const inputAddRef = useRef<HTMLInputElement>(null);
  const inputEdiRef = useRef<HTMLInputElement>(null);
  const {
    editingOption,
    handleAddOption,
    handleRemoveOption,
    handleEditOption,
    handleUpdateOption,
  } = useFormElementMultipleChoice({ question, inputAddRef });

  const options = question?.question_options ?? [];

  return (
    <div className="grid gap-4 w-full">
      <RadioGroup className="grid grid-4 w-full">
        {options.map(({ label, id }) => (
          <div className="grid grid-cols-2 gap-2 min-h-[40px]" key={id}>
            <div className="flex items-center gap-2">
              {editingOption?.id === id ? (
                <Input
                  defaultValue={editingOption?.label}
                  className={"border border-primary"}
                  ref={inputEdiRef}
                  onBlur={(e) => handleUpdateOption(e.target.id ?? "")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // update
                      const target = e.target as HTMLInputElement;
                      handleUpdateOption(target.value ?? "");
                    }
                  }}
                />
              ) : null}
              <div
                className={cn("flex items-center gap-2", {
                  hidden: editingOption?.id === id,
                })}
              >
                {id ? <RadioGroupItem value={id} id={id} /> : null}
                <Label htmlFor={id}>{label}</Label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Trash
                className="cursor-pointer"
                onClick={() => (id ? handleRemoveOption(id) : null)}
              />
              <Edit
                className="cursor-pointer"
                onClick={() => (id ? handleEditOption(id) : null)}
              />
            </div>
          </div>
        ))}
      </RadioGroup>
      <FormAddOptionButton onAddOption={handleAddOption} ref={inputAddRef} />
    </div>
  );
}

export { FormRadioGroup };

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRef, useState } from "react";

import { Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { convertStringToSlug, isLabelValid } from "../utils";
import { FormAddOptionButton } from "./FormAddOptionButton";
import { Option, FormElement } from "@/server/types/Form";

type FormRadioGroupProps = {
  question: FormElement;
  onChange: (question: FormElement) => void;
};
function FormRadioGroup({ question, onChange }: FormRadioGroupProps) {
  const inputAddRef = useRef<HTMLInputElement>(null);
  const inputEdiRef = useRef<HTMLInputElement>(null);
  const options = question?.options ?? [];
  const [editingOption, setEditingOption] = useState<Option | null>(null);

  const handleAddOption = () => {
    const currentLabel = inputAddRef.current?.value;
    if (
      typeof currentLabel === "string" &&
      isLabelValid({ currentLabel, options })
    ) {
      const option = {
        id: convertStringToSlug(currentLabel),
        label: currentLabel,
      };
      onChange({
        ...question,
        options: [...options, option],
      });
      inputAddRef.current!.value = "";
    }
  };

  const handleRemoveOption = (id: string) => {
    onChange?.({
      ...question,
      options: options.filter((option) => option.id !== id),
    });
  };

  const handleEditOption = (id: string) => {
    const option = options.find((option) => option.id === id);
    setEditingOption(option ?? null);
  };

  const handleUpdateOption = (newLabel: string) => {
    if (
      typeof newLabel === "string" &&
      isLabelValid({ currentLabel: newLabel, options })
    ) {
      const newId = convertStringToSlug(newLabel);
      const newOptions = options.map((option) => {
        if (option.id === editingOption?.id) {
          return {
            ...option,
            id: newId,
            label: newLabel,
          };
        }
        return option;
      });
      onChange?.({
        ...question,
        options: newOptions,
      });
    }
    setEditingOption(null);
  };

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
                />
              ) : null}
              <div
                className={cn("flex items-center gap-2", {
                  hidden: editingOption?.id === id,
                })}
              >
                <RadioGroupItem value={id} id={id} />
                <Label htmlFor={id}>{label}</Label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Trash
                className="cursor-pointer"
                onClick={() => handleRemoveOption(id)}
              />
              <Edit
                className="cursor-pointer"
                onClick={() => handleEditOption(id)}
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

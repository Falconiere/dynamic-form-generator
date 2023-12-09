"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Edit, Trash } from "lucide-react";
import { convertStringToSlug, isLabelValid } from "../utils";
import { FormAddOptionButton } from "./FormAddOptionButton";
import { Option, FormElement } from "@/server/types/Form";

type FormCheckBoxesProps = {
  question?: Partial<FormElement>;
  onChange?: (question: Partial<FormElement>) => void;
};

function FormCheckBoxes({ question, onChange }: FormCheckBoxesProps) {
  const inputAddRef = useRef<HTMLInputElement>(null);
  const inputEditRef = useRef<HTMLInputElement>(null);
  const options = question?.options ?? [];
  const [editingOption, setEditingOption] = useState<Option | null>(null);

  const handleAddOption = () => {
    const currentLabel = inputAddRef.current?.value;
    if (
      typeof currentLabel === "string" &&
      isLabelValid({ currentLabel, options })
    ) {
      const option = {
        id: currentLabel,
        label: currentLabel,
      };
      onChange?.({
        ...question,
        options: [...options, option],
      });
      inputAddRef.current?.focus();
      inputAddRef.current!.value = "";
    }
  };

  const handleRemoveOption = (id: string) => {
    onChange?.({
      ...question,
      options: options.filter((option) => option.id !== id),
    });
  };

  const handleUpdateOption = (label: string) => {
    const currentLabel = label;
    if (
      typeof currentLabel === "string" &&
      isLabelValid({ currentLabel, options })
    ) {
      const option = {
        id: convertStringToSlug(currentLabel),
        label: currentLabel,
      };

      const index = options.findIndex(
        (option) => option.id === editingOption?.id
      );
      const newOptions = [...options];
      newOptions[index] = option;
      onChange?.({
        ...question,
        options: newOptions,
      });
    }
    setEditingOption(null);
  };

  const handleEditOption = (id: string) => {
    const option = options.find((option) => option.id === id);
    setEditingOption(option ?? null);
    inputEditRef.current?.focus();
    inputEditRef.current!.value = option?.label ?? "";
  };

  const handleOnCheck = (id: string) => {
    const option = options.find((option) => option.id === id);
    const index = options.findIndex((option) => option.id === id);
    const newOptions = [...options];
    const newOption = {
      ...option,
      isChecked: !option?.isChecked,
    } as Option;
    newOptions[index] = newOption;
    onChange?.({
      ...question,
      options: newOptions,
    });
  };

  return (
    <div className="grid gap-4 w-full">
      {options.map(({ id, label, isChecked }) => (
        <div key={id} className="flex items-center gap-2 min-h-[40px]">
          {editingOption?.id === id ? (
            <Input
              defaultValue={editingOption?.label}
              ref={inputEditRef}
              onBlur={(e) => handleUpdateOption(e.target.value ?? "")}
            />
          ) : null}

          <div
            className={cn("flex gap-2 items-center w-full", {
              hidden: editingOption?.id === id,
            })}
          >
            <Checkbox
              id={id}
              defaultChecked={isChecked}
              onCheckedChange={() => handleOnCheck(id)}
            />
            <Label htmlFor={id}>{label}</Label>
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
      <FormAddOptionButton onAddOption={handleAddOption} ref={inputAddRef} />
    </div>
  );
}

export { FormCheckBoxes };

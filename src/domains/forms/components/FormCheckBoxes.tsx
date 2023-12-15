"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Edit, Trash } from "lucide-react";
import { FormAddOptionButton } from "./FormAddOptionButton";
import { FormElement } from "@/server/types/Form";
import { useFormElementMultipleChoice } from "../hooks/useFormElementMultipleChoice";

type FormCheckBoxesProps = {
  question: FormElement;
};

function FormCheckBoxes({ question }: Readonly<FormCheckBoxesProps>) {
  const inputAddRef = useRef<HTMLInputElement>(null);
  const inputEditRef = useRef<HTMLInputElement>(null);
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
      {options.map(({ id, label, isChecked }) => (
        <div key={id} className="flex items-center gap-2 min-h-[40px]">
          {editingOption?.id === id ? (
            <Input
              defaultValue={editingOption?.label}
              ref={inputEditRef}
              onBlur={(e) => handleUpdateOption(e.target.value ?? "")}
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
            className={cn("flex gap-2 items-center w-full", {
              hidden: editingOption?.id === id,
            })}
          >
            <Checkbox id={id} defaultChecked={isChecked} />
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

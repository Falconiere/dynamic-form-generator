"use client";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

type QuestionType = "text" | "multiple-choice" | "checkboxes";
const questionTypes = [
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Multiple choice",
    value: "multiple-choice",
  },
  {
    label: "Checkboxes",
    value: "checkboxes",
  },
] as Array<{
  label: string;
  value: QuestionType;
}>;
type FormQuestionTypeProps = {
  value?: QuestionType;
  onChange: (value: QuestionType) => void;
};

function FormQuestionType({ value, onChange }: FormQuestionTypeProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? questionTypes.find((questionType) => questionType.value === value)
                ?.label
            : "Select question type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search question type..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {questionTypes.map((questionType) => (
              <CommandItem
                key={questionType.value}
                value={questionType.value}
                onSelect={(currentValue) => {
                  onChange(currentValue as QuestionType);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === questionType.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {questionType.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export type { QuestionType };
export { FormQuestionType };

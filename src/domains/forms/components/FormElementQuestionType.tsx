"use client";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/utils/utils";
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
import { FormElementType } from "@/backend/types/Form";
import { elements } from "@/domains/forms/utils/constants";

type FormElementQuestionTypeProps = {
  value?: FormElementType;
  onChange: (value: FormElementType) => void;
};

function FormElementQuestionType({
  value,
  onChange,
}: Readonly<FormElementQuestionTypeProps>) {
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
            ? elements.find((questionType) => questionType.value === value)
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
            {elements.map((questionType) => (
              <CommandItem
                key={questionType.value}
                value={questionType.value}
                onSelect={(currentValue) => {
                  onChange(currentValue as FormElementType);
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
export { FormElementQuestionType };

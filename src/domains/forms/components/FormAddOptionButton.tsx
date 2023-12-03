import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

type FormAddOptionButtonProps = {
  onAddOption: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;
const FormAddOptionButton = forwardRef<
  HTMLInputElement,
  FormAddOptionButtonProps
>(({ onAddOption }, ref) => (
  <div className="flex gap-2">
    <Input
      placeholder="Add option"
      ref={ref}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onAddOption();
        }
      }}
    />
    <Button type="button" onClick={onAddOption} variant="ghost">
      Add option
    </Button>
  </div>
));

FormAddOptionButton.displayName = "FormAddOptionButton";
export { FormAddOptionButton };

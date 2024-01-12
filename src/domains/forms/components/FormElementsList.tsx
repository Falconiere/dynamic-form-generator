import { Divider } from "@/components/ui/divider";
import { FormDraggableElement } from "@/domains/forms/components/FormDraggableElement";
import { elements } from "@/domains/forms/utils/constants";

const FormElementsList = () => (
  <div className="w-ful bg-white p-4 shadow-md rounded-md">
    <h1 className="text-2xl ">Form elements</h1>
    <Divider />
    <div className="form-element__container py-4 grid gap-2">
      {elements.map(({ value, label }) => (
        <FormDraggableElement key={value} elementType={value} label={label} />
      ))}
    </div>
  </div>
);
export { FormElementsList };

import { FormDraggableElement } from "@/domains/forms/components/FormDraggableElement";
import { elements } from "@/server/utils/constants";

const SideBarFormFields = () => (
  <div className="w-ful bg-primary p-4 text-white shadow-md">
    <h1 className="text-2xl ">Form elements</h1>
    <div className="form-element__container py-4 grid gap-2">
      {elements.map(({ value, label }) => (
        <FormDraggableElement key={value} elementType={value} label={label} />
      ))}
    </div>
  </div>
);
export { SideBarFormFields };

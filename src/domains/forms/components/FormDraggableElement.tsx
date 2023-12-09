"use client";
import { FormElementType } from "@/server/types/Form";
import { useDrag } from "react-dnd";

type FormDraggableElementProps = {
  label: string;
  elementType: FormElementType;
};

const FormDraggableElement = ({
  elementType,
  label,
}: FormDraggableElementProps) => {
  const [, drag] = useDrag({
    type: "DIV",
    item: { elementType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div ref={drag}>
      <div
        className="bg-white  text-primary p-2 rounded-md draggable"
        draggable
      >
        <h2>{label}</h2>
      </div>
    </div>
  );
};

FormDraggableElement.displayName = "FormDraggableElement";
export { FormDraggableElement };

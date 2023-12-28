"use client";
import { FormElementType } from "@/server/types/Form";
import { GripVertical } from "lucide-react";
import { DragSourceMonitor, useDrag } from "react-dnd";

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
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
      isDragging: !!monitor.getItem(),
    }),
  });
  return (
    <div
      className="bg-white  text-primary p-2 rounded-md draggable border-2 border-primary flex justify-between items-center"
      draggable
      ref={drag}
    >
      <h2>{label}</h2>
      <GripVertical className="w-8 h-8" />
    </div>
  );
};

FormDraggableElement.displayName = "FormDraggableElement";
export { FormDraggableElement };

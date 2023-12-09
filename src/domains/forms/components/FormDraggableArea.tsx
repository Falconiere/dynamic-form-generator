import { useDrop } from "react-dnd";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FormElementType } from "@/server/types/Form";

type FormDraggableAreaProps = {
  onDropped: (item: FormElementType) => void;
};
const FormDraggableArea = ({ onDropped }: FormDraggableAreaProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [, drop] = useDrop({
    accept: "DIV",
    drop: (item: { elementType: FormElementType }) => {
      onDropped(item.elementType);
      setIsHovering(false);
    },
    // hover: (item: { elementType: FormElementType }, monitor) => {
    //   setIsHovering(true);
    // },
  });
  return (
    <div
      ref={drop}
      className={cn(
        "min-h-[100px] flex items-center justify-center border-primary border-dotted  border-2",
        {
          "border-red-600": isHovering,
        }
      )}
    >
      <h3>Drag the element here</h3>
    </div>
  );
};

FormDraggableArea.displayName = "FormDraggableArea";

export { FormDraggableArea };

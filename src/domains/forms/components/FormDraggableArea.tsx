import { useDrop } from "react-dnd";

import { useEffect, useState } from "react";
import { cn } from "@/utils/utils";
import { FormElementType } from "@/backend/types/Form";

type FormDraggableAreaProps = {
  onDropped: (item: FormElementType) => void;
};
const FormDraggableArea = ({ onDropped }: FormDraggableAreaProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [{ isOver }, drop] = useDrop({
    accept: "DIV",
    drop: (item: { elementType: FormElementType }) => {
      onDropped(item.elementType);
      setIsHovering(false);
    },
    hover: () => {
      setIsHovering(true);
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  });
  useEffect(() => {
    if (!isOver) {
      setIsHovering(false);
    }
  }, [isOver]);

  return (
    <div
      ref={drop}
      className={cn(
        "min-h-[15px] flex items-center justify-center border-primary border-dotted transform transition-all duration-300",
        {
          "min-h-[80px]": isHovering,
          "border-red-500": isHovering,
        }
      )}
    ></div>
  );
};

FormDraggableArea.displayName = "FormDraggableArea";

export { FormDraggableArea };

import { FormElementType, Question } from "@/backend/types/Form";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FormElementQuestion } from "../components/FormElementQuestion";
import { FormDraggableArea } from "../components/FormDraggableArea";

type FormBuilderQuestionListProps = {
  questions: Question[];
  onChange: (question: Question) => void;
  onDelete: (id: string) => void;
  onSortDragEnd?: (event: DragEndEvent) => void;
  onAddQuestion: (payload: {
    element_type: FormElementType;
    prevArrIdx: number;
  }) => void;
};
const FormBuilderQuestionList = ({
  questions,
  onChange: handleQuestionChange,
  onDelete: handleOnDelete,
  onAddQuestion,
  onSortDragEnd,
}: FormBuilderQuestionListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onSortDragEnd}
    >
      <SortableContext items={questions} strategy={verticalListSortingStrategy}>
        {questions?.length === 0 ? (
          <FormDraggableArea
            onDropped={(element_type) =>
              onAddQuestion({ element_type, prevArrIdx: -1 })
            }
          />
        ) : null}
        {questions?.map((question, prevArrIdx) => (
          <div key={question.id}>
            <FormDraggableArea
              onDropped={(element_type) =>
                onAddQuestion({ element_type, prevArrIdx: prevArrIdx - 1 })
              }
            />
            <FormElementQuestion
              onChange={handleQuestionChange}
              question={question}
              onDelete={() => handleOnDelete(question.id)}
              canDelete={questions.length > 1}
            />
            <FormDraggableArea
              onDropped={(element_type) =>
                onAddQuestion({ element_type, prevArrIdx })
              }
            />
          </div>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export { FormBuilderQuestionList };

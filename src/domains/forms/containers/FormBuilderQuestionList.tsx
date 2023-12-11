import { FormElement } from "@/server/types/Form";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { FormElementQuestion } from "../components/FormElementQuestion";

type FormBuilderQuestionListProps = {
  questions: FormElement[];
  onChange: (question: FormElement) => void;
  onDelete: (id: string) => void;
  onDragEnd: OnDragEndResponder;
};
const FormBuilderQuestionList = ({
  questions,
  onChange: handleQuestionChange,
  onDelete: handleOnDelete,
  onDragEnd: dragEnded,
}: FormBuilderQuestionListProps) => {
  return (
    <DragDropContext onDragEnd={dragEnded}>
      <Droppable droppableId="questions-list" type="task">
        {(provided) => (
          <div
            className="grid gap-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {questions?.map((question, idx) => (
              <Draggable
                key={question.id}
                index={idx}
                draggableId={question.id}
              >
                {(provided) => (
                  <FormElementQuestion
                    key={question.id}
                    onChange={handleQuestionChange}
                    question={question}
                    onDelete={() => handleOnDelete(question.id)}
                    canDelete={questions.length > 1}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export { FormBuilderQuestionList };

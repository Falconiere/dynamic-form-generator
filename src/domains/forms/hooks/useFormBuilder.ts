import { Form, FormElement, FormElementType, Option } from "@/server/types/Form";
import { useCallback, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { OnDragEndResponder } from "react-beautiful-dnd";
import { revalidatePath } from "next/cache";
import * as formsDB from "@/clientDB/forms";
import * as questionsDB from "@/clientDB/questions";
import { sortQuestions } from "../utils/sortQuestions";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";


type UseFormBuilder = {
  defaultValue: Form;
}

type HandleOnQuestionChangeParams = {
  question: FormElement;
  option?: Option;
  action?: "add" | "delete" | "update";
}
const useFormBuilder = ({ defaultValue }:UseFormBuilder) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldDisplayErrors, setShouldDisplayErrors] = useState(false);
  const [values, setValues] = useState<Form>({
    ...defaultValue,
    questions: sortQuestions(defaultValue?.questions),
  });

  const validateQuestions = useMemo(() => {
    const { questions } = values;
    const errors: Record<string, string> = {};
    questions.forEach((question) => {
      if (!question.question_text) {
        errors[question.id] = "Question is required";
      }
      if (question.element_type === "multiple-choice" || question.element_type === "checkboxes") {
        if (!question.question_options?.length) {
          errors[question.id] = "At least one option is required";
        }
      }
    });
    return errors;
  }, [values?.questions]);



  const handleOnQuestionChange = async ({ question, action, option }:HandleOnQuestionChangeParams) => {
    const { questions } = values;
    const index = questions.findIndex((q) => q.id === question.id);
    const newQuestions = [...questions];
    newQuestions[index] = question;

    setValues((prev) => ({ ...prev, questions: newQuestions }));
    if(timeout.current) {
      clearTimeout(timeout.current)
    }

    if(question.element_type === "multiple-choice" || question.element_type === "checkboxes") {
      if(option) {
          if(action === "add") {
            const previusOptionId = option.id;
            const questionUpdate = await questionsDB.createQuestionOption<Option>({
            label:option.label,
            question_id: question.id
          })
          newQuestions[index] = {
            ...question,
            question_options: question.question_options?.map((q) => q.id === previusOptionId ? questionUpdate : q)
          }
          setValues((prev) => ({ ...prev, questions: newQuestions }));
        }
      
      if(action === "delete" ) {
        await questionsDB.removeQuestionOption(option.id)
      }
      if(action === "update" ) {
        await questionsDB.updateQuestionOption(option)
      }

    }
    }
    timeout.current = setTimeout(async () => {
      await questionsDB.update(question)
    }, 1000)
  };

  const handleOnAddQuestion = async ({ element_type, prevArrIdx }:{ element_type: FormElementType, prevArrIdx: number }) => {
      const {id } = values;
      if(!id) return
      const question: FormElement = {
        id: uuidv4(),
        element_type,
        question_text: "",
        is_required: false,
        form_id: id,
        client_idx: prevArrIdx + 1,
      };

      

      const left = values.questions.slice(0, prevArrIdx + 1);
      const right = values.questions.slice(prevArrIdx + 1);
      const newQuestions = [...left, question, ...right];
      
      setValues((prev) => ({
        ...prev,
        questions: newQuestions,
      }));
      await questionsDB.create(question)
  }

  const handleOnHeaderChange = (header: Pick<Form, "description" | "title">) => {
    setValues((prev) => ({ ...prev, ...header }));
    if(timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(async () => {
      await formsDB.update({
        id: values.id,
        payload: {
          title: header.title,
          description: header.description,
          status: values.status,
        }
      })
    }, 1000)
  }

  const handleOnRemove = async (id: string) => {
    const { questions } = values;
    const index = questions.findIndex((q) => q.id === id);
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setValues((prev) => ({ ...prev, questions: newQuestions }));
    await questionsDB.remove(id)
  };

  const handleOnSortDragEnd = useCallback(
    (event:DragEndEvent) => {
      const {active, over} = event;
    if (!!over?.id && !!active.id && active.id !== over?.id) {
      setValues((prev) => {
        const oldIndex = values?.questions?.findIndex((q) => q.id === active.id);
        const newIndex = values?.questions?.findIndex((q)=> q.id === over.id);
        const newQuestions = arrayMove(values?.questions, oldIndex, newIndex);

        if(timeout.current){
          clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(async () => {
          const clientIds =  newQuestions.map((q, idx) => ({ id: q.id, client_idx: idx }))
          await questionsDB.updateClientIdx(clientIds)
        }, 1000)
        return {
          ...prev,
          questions: newQuestions,
        }
      });
    }
    },
    [values?.questions]
  );

  const handleOnSubmit = async () => {
    try {
      setShouldDisplayErrors(true);
      if(Object.keys(validateQuestions).length) return
      const payload = values;
      payload["status"] = "published"
      if(!payload) return
      setIsSubmitting(true);
      if (payload?.id) {
        await formsDB.update({
          id: payload.id,
          payload:{
            title: payload.title,
            description: payload.description,
            status: "published"
          }
        });
        setIsSubmitting(false);
        return;
      }
      await formsDB.create(payload);  
      revalidatePath('/forms')
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  }

  return { 
      handleOnSubmit, 
      handleOnQuestionChange, 
      handleOnHeaderChange, 
      handleOnAddQuestion, 
      handleOnSortDragEnd, 
      handleOnRemove, 
      isSubmitting, 
      values, 
      errors: shouldDisplayErrors ?  validateQuestions : {}
    }
}


export type { HandleOnQuestionChangeParams }
export { useFormBuilder,  }
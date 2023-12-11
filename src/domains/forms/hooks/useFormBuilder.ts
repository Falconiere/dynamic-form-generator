import { Form, FormElement, FormElementType } from "@/server/types/Form";
import { useCallback, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { OnDragEndResponder } from "react-beautiful-dnd";
import { revalidatePath } from "next/cache";
import * as formsDB from "@/clientDB/forms";
import * as questionsDB from "@/clientDB/questions";


type UseFormBuilder = {
  defaultValue: Form;
}

const useFormBuilder = ({ defaultValue }:UseFormBuilder) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldDisplayErrors, setShouldDisplayErrors] = useState(false);
  const [values, setValues] = useState<Form>({
    ...defaultValue,
    questions: defaultValue.questions.sort((a, b) => a.client_idx - b.client_idx)
  });

  const validateQuestions = useMemo(() => {
    const { questions } = values;
    const errors: Record<string, string> = {};
    questions.forEach((question) => {
      if (!question.question_text) {
        errors[question.id] = "Question is required";
      }
      if (question.element_type === "multiple-choice" || question.element_type === "checkboxes") {
        if (!question.options?.length) {
          errors[question.id] = "At least one option is required";
        }
      }
    });
    return errors;
  }, [values?.questions]);



  const handleOnQuestionChange = async (question: FormElement) => {
    const { questions } = values;
    const index = questions.findIndex((q) => q.id === question.id);
    const newQuestions = [...questions];
    newQuestions[index] = question as FormElement;
    setValues((prev) => ({ ...prev, questions: newQuestions }));
    if(timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(async () => {
      await questionsDB.update(question)
    }, 1000)
  };

  const handleOnAdd = async ({ element_type }:{ element_type: FormElementType }) => {
      const {id } = values;
      if(!id) return
      const question: FormElement = {
        id: uuidv4(),
        element_type,
        question_text: "",
        is_required: false,
        form_id: id,
        client_idx: values.questions.length,
      };
      setValues((prev) => ({
        ...prev,
        questions: [...prev.questions, question],
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

  const handleOnSortDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const { questions } = values;
      if (!result.destination) return;
      const newQuestions = [...questions];
      const [removed] = newQuestions.splice(result.source.index, 1);
      newQuestions.splice(result.destination.index, 0, removed);
      setValues((prev) => ({ ...prev, questions: newQuestions }));
      if(timeout.current) {
        clearTimeout(timeout.current)
      }
      timeout.current = setTimeout(async () => {
        const payload = newQuestions.map(({id}, idx) => ({ id, client_idx: idx }))
        await questionsDB.updateClientIdx(payload)
      }, 1000)
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
            status: payload.status,
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
      handleOnAdd, 
      handleOnSortDragEnd, 
      handleOnRemove, 
      isSubmitting, 
      values, 
      errors: shouldDisplayErrors ?  validateQuestions : {}
    }
}

export { useFormBuilder,  }
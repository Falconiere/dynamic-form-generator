import { Form, FormElementType, Option, Question } from "@/backend/types/Form";
import { useCallback, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { sortQuestions } from "../utils/sortQuestions";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { isMultipleChoiceQuestion } from "@/domains/forms/utils/isMultipleChoiceQuestion";

import { clientApi } from "@/clientApi";

type UseFormBuilder = {
  defaultValue: Form;
}

type HandleOnQuestionChangeParams = {
  question: Question;
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
    questions?.forEach((question) => {
      if (!question.title) {
        errors[question.id] = "Question is required";
      }
      if (isMultipleChoiceQuestion(question.element_type)) {
        if (!question.question_options?.length) {
          errors[question.id] = "At least one option is required";
        }
      }
    });
    return errors;
  }, [values]);


  const handleAddOption = async (question: Question, option: Option) => {
    const newOption = {
      label: option.label ?? "",
      question_id: question.id
    }
    return await clientApi.questionOptions.create(newOption)
  }

  const handleOnUpdateOptions = async ( {action,option, question}: HandleOnQuestionChangeParams) =>{
    const { questions } = values;
    if(!questions || !option?.id) return
    const index = questions?.findIndex((q) => q.id === question.id);
    const newQuestions = [...questions];

    switch(action) {
      case "add":
        const questionCreated = await handleAddOption(question, option)
        newQuestions[index] = {
          ...newQuestions[index],
          question_options: [...question?.question_options ?? [],questionCreated]
        }
        setValues((prev) => ({ ...prev, questions: newQuestions }));
        break;
      case "delete":
        newQuestions[index] = {
          ...newQuestions[index],
          question_options: newQuestions[index].question_options?.filter((q) => q.id !== option.id) ?? []
        }
        setValues((prev) => ({ ...prev, questions: newQuestions }));
        await clientApi.questionOptions.remove(option.id)
        break;
      case "update":
        const optionIndex = newQuestions[index].question_options?.findIndex((q) => q.id === option.id)
        if(optionIndex === undefined) return
        if(!newQuestions?.[index]) return
        const options = [...newQuestions[index].question_options ?? []]
        options[optionIndex] = option
        newQuestions[index] = {
          ...newQuestions[index],
          question_options: options
        }
        setValues((prev) => ({ ...prev, questions: newQuestions }));
        await clientApi.questionOptions.update(option.id, option)
        break;
      default:
        break;
    }
    
  }
  const handleOnQuestionChange = async ({ question, action, option }:HandleOnQuestionChangeParams) => {
    const { questions } = values;
    if(!questions) return

    if(isMultipleChoiceQuestion(question.element_type) && action) {
       await handleOnUpdateOptions({action, option, question })
      return
    }

    const index = questions?.findIndex((q) => q.id === question.id);
    const newQuestions = [...questions];
    newQuestions[index] = question;
    setValues((prev) => ({ ...prev, questions: newQuestions }));
    timeout.current = setTimeout(async () => {
      await clientApi.questions.update(question.id, {
        ...question,
        question_options: undefined,
        updated_at: new Date()
      })
    }, 1000)
   
  };

  const handleOnAddQuestion = async ({ element_type, prevArrIdx }:{ element_type: FormElementType, prevArrIdx: number }) => {
      const {id } = values;
      if(!id || !values.questions) return
      const question = {
        id: uuidv4(),
        element_type,
        title: "This is a question?",
        required: false,
        form_id: values.id,
        order: prevArrIdx + 1,
      } as Question;

      const left = values.questions.slice(0, prevArrIdx + 1);
      const right = values.questions.slice(prevArrIdx + 1);
      const newQuestions = [...left, question, ...right];
      
      setValues((prev) => ({
        ...prev,
        questions: newQuestions,
      }));
      await clientApi.questions.create(question)
  }

  const handleOnHeaderChange = (header: Pick<Form, "description" | "title">) => {
    setValues((prev) => ({ ...prev, ...header }));
    if(timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(async () => {
      if(!values.id) return
      const formUpdate = {
        title: header.title,
        description: header.description,
        status: values.status,
        updated_at: new Date()
      }
      await clientApi.forms.update(values.id,formUpdate)
    }, 1000)
  }

  const handleOnRemove = async (id: string) => {
    const { questions } = values;
    if(!questions) return
    const index = questions.findIndex((q) => q.id === id);
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setValues((prev) => ({ ...prev, questions: newQuestions.map((q, idx) => ({ ...q, order: idx })) }));
    await clientApi.questions.remove(id)
  };

  const handleOnSortDragEnd = useCallback(
    (event:DragEndEvent) => {
      const { questions } = values;
      if(!questions) return
      const {active, over} = event;
    if (!!over?.id && !!active.id && active.id !== over?.id) {
      setValues((prev) => {
        
        const oldIndex = questions.findIndex((q) => q.id === active.id);
        const newIndex = questions.findIndex((q)=> q.id === over.id);

        const newQuestions = arrayMove(questions, oldIndex, newIndex)

        if(timeout.current){
          clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(async () => {
          const orderIds = newQuestions.map((q, idx) => ({ id: q.id, order: idx }))
          await clientApi.questions.updateQuestionOrders(orderIds)
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
        await clientApi.forms.update(payload.id, {
          ...payload,
          questions: undefined,
          updated_at: new Date()
        });
        setIsSubmitting(false);
        return;
      }
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
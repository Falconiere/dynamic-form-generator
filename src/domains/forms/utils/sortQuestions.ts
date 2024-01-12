import { Question } from "@/server/types/Form"

const sortQuestions = (q?:Question[]): Question[] => {
  return Array.isArray(q) ? q.sort((a,b)=> a.order - b.order) : []
}

export { sortQuestions }
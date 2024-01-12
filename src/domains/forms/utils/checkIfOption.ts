import { Option } from "@/backend/types/Form";

const checkIfOption = (options: Option[], label: string) => {
  return options.some((option) => option.label?.trim() === label.trim());
};

export { checkIfOption };
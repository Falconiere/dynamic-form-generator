import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type FormFinalMessageDialogProps = {
  onClose: () => void;
  open: boolean;
};
const FormFinalMessageDialog = ({
  onClose,
  open,
}: FormFinalMessageDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your response has been recorded</AlertDialogTitle>
          <AlertDialogDescription>
            Thank you very much for your response!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { FormFinalMessageDialog };

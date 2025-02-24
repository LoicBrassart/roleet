import { Button } from "@/lib/shadcn/generated/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/lib/shadcn/generated/ui/dialog";

export default function ModalToOpenScenario() {
  const hUnseal = () => {
    // TODO
    // - new Mutation: Unseal(idScenario)
    console.log("Todo: User wants to unseal a Scenario");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Découvrir</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Désceller ce scenario ?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Ceci est une opération irréversible: "What has been seen cannot be
          unseen" !
        </DialogDescription>
        <DialogFooter>
          <Button onClick={hUnseal}>Ouvrir</Button>
          <DialogClose>Annuler</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

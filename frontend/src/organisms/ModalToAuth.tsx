import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/lib/shadcn/generated/ui/dialog";
import { Button } from "@/lib/shadcn/generated/ui/button";
import { Link } from "react-router-dom";

export default function ModalToAuth() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Lire</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Attends une minute !</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tu ne peux pas lire ce scenario sans être authentifié. En effet, nous
          allons garder une trace de ce que tu lis pour t'aider à organiser tes
          prochaines parties !
        </DialogDescription>
        <DialogFooter>
          <Link to={`/auth`}>Compris!</Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

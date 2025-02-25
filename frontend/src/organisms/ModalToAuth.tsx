import { Button } from "@/lib/shadcn/generated/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/shadcn/generated/ui/dialog";
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
          <Button asChild>
            <Link to={"/auth"}>Compris!</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

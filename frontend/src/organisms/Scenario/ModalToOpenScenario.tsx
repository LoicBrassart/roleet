import { useNavigate } from "react-router-dom";
import { useUnsealScenarioMutation } from "@/lib/graphql/generated/graphql-types";
import { Button, buttonVariants } from "@/lib/shadcn/generated/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/shadcn/generated/ui/dialog";
import { useCurrentUser, useUnsealScenario } from "@/lib/zustand/userStore";
import type { Entities } from "@/types/entities";

type Props = {
  scenario: Entities.Scenario;
};
export default function ModalToOpenScenario({ scenario }: Props) {
  const [unsealMutation] = useUnsealScenarioMutation();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const unseal = useUnsealScenario();

  const hUnseal = async () => {
    const { data } = await unsealMutation({
      variables: { unsealScenarioId: scenario.id },
    });
    if (data?.unsealScenario) {
      currentUser?.readScenarios.push(scenario.id);
      unseal(scenario.id);
      navigate(`/scenario/${scenario.id}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "secondary" })}>
        Découvrir
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Désceller le scenario: {scenario.title} ?</DialogTitle>
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

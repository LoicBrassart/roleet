import {
  type Scenario,
  useUnsealScenarioMutation,
} from "@/lib/graphql/generated/graphql-types";
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
import { useUserStore } from "@/lib/zustand/userStore";
import { useNavigate } from "react-router-dom";

type Props = {
  scenario: Pick<Scenario, "id" | "title">;
};
export default function ModalToOpenScenario({ scenario }: Props) {
  const [unseal] = useUnsealScenarioMutation();
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.user);

  const hUnseal = async () => {
    const { data } = await unseal({
      variables: { unsealScenarioId: scenario.id },
    });
    const result = data?.unsealScenario;
    if (result) {
      currentUser?.readScenarios.push(`${scenario.id}`);
      navigate(`/scenario/${scenario.id}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>Découvrir</DialogTrigger>
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

import { Button } from "@/lib/shadcn/generated/ui/button";
import { ScrollArea } from "@/lib/shadcn/generated/ui/scroll-area";
import { useCurrentUser } from "@/lib/zustand/userStore";
import type { Entities } from "@/types/entities";
import { Link } from "react-router-dom";
import ModalToAuth from "../../layout/ModalToAuth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../lib/shadcn/generated/ui/card";
import ModalToOpenScenario from "./ModalToOpenScenario";

type Props = {
  title: string;
  data: Array<Entities.Scenario>;
};
export default function ScenarioList({ title, data }: Props) {
  const currentUser = useCurrentUser();

  if (!data.length)
    return (
      <>
        <h2>{title}</h2>
        <p>Rien à afficher ici :shrug: </p>
      </>
    );

  return (
    <>
      <h2>{title}</h2>
      <ul className="flex gap-4">
        {data.map((scenario) => {
          return (
            <li key={scenario.id}>
              <Card
                className="m-1 h-60 w-96 gap-4"
                style={{ backgroundImage: `url(/files/${scenario.bannerUrl})` }}
              >
                <CardHeader>
                  <CardTitle>{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ScrollArea className="h-full">{scenario.teaser}</ScrollArea>
                </CardContent>
                <CardFooter>
                  {currentUser ? (
                    currentUser.readScenarios.includes(scenario.id) ? (
                      <Button asChild>
                        <Link to={`/scenario/${scenario.id}`}>Lire</Link>
                      </Button>
                    ) : (
                      <ModalToOpenScenario scenario={scenario} />
                    )
                  ) : (
                    <ModalToAuth />
                  )}
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}

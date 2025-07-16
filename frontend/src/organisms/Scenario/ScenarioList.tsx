import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "react-router-dom";
import { Button } from "@/lib/shadcn/generated/ui/button";
import { useCurrentUser } from "@/lib/zustand/userStore";
import type { Entities } from "@/types/entities";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../lib/shadcn/generated/ui/card";
import ModalToAuth from "../../pages/layout/ModalToAuth";
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
          const _url = `/files/${scenario.bannerUrl}`;
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
                  <ScrollArea className="h-full">
                    {scenario.teaser}
                  </ScrollArea>{" "}
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

import { Button } from "@/lib/shadcn/generated/ui/button";
import { useUserStore } from "@/lib/zustand/userStore";
import type { Q } from "@/types/queries";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../lib/shadcn/generated/ui/card";
import ModalToAuth from "./ModalToAuth";
import ModalToOpenScenario from "./ModalToOpenScenario";

type Props = {
  title: string;
  data: Q.AllScenarios;
};
export default function ScenarioList({ title, data }: Props) {
  const currentUser = useUserStore((state) => state.user);

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
          const url = `http://localhost:7000/files/${scenario.bannerUrl}`;
          return (
            <li key={scenario.id} className="w-96">
              <Card
                className="m-1 w-96 h-40"
                style={{
                  backgroundImage: `url(${url})`,
                }}
              >
                <CardHeader>
                  <CardTitle>{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea>{scenario.teaser}</ScrollArea>
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

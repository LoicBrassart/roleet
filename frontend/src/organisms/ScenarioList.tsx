import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "react-router-dom";
import type { Scenario } from "../lib/graphql/generated/graphql-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../lib/shadcn/generated/ui/card";
import ModalToAuth from "./ModalToAuth";
import { useUserStore } from "@/lib/zustand/userStore";
import { Button } from "@/lib/shadcn/generated/ui/button";

type Props = {
  title: string;
  data: Scenario[];
};
export default function ScenarioList({ title, data }: Props) {
  const currentUser = useUserStore((state) => state.user);

  return (
    <>
      <h2>{title}</h2>
      <ul className="flex gap-4">
        {data.map((scenario) => {
          const url =
            "bg-[url('http://files-dev:4000/files/${scenario.bannerUrl}')]";
          return (
            <li key={scenario.id} className="w-96">
              <Card
                className="w-96 m-1 h-40"
                style={{
                  backgroundImage: `url('http://localhost:7000/files/${scenario.bannerUrl}')`,
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
                    <Button asChild>
                      <Link to={`/scenario/${scenario.id}`}>Lire</Link>
                    </Button>
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

import { Link } from "react-router-dom";
import type { Scenario } from "../lib/graphql/generated/graphql-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/shadcn/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/shadcn/utils";

type Props = {
  title: string;
  data: Scenario[];
};
export default function ScenarioList({ title, data }: Props) {
  // console.log(data);

  return (
    <>
      <h2>{title}</h2>
      <ul className="flex">
        {data.map((scenario) => (
          <li key={scenario.id} className="w-96">
            <Link to={`/scenario/${scenario.id}`}>
              <Card
                className={cn(
                  "w-96 m-1 h-40",
                  `bg-[url('http://files-dev:4000/files/${scenario.bannerUrl}')]`,
                )}
              >
                <CardHeader>
                  <CardTitle>{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea>{scenario.teaser}</ScrollArea>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

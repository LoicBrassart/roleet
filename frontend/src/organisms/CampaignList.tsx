import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "react-router-dom";
import { Button } from "@/lib/shadcn/generated/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/shadcn/generated/ui/card";
import type { Q } from "@/types/queries";

type Props = {
  title: string;
  data: Q.MyCampaign[];
};

export default function CampaignList({ title, data }: Props) {
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
        {data.map((campaign) => {
          return (
            <li key={campaign.id} className="w-96">
              <Card
                className="w-96 m-1 h-40"
                style={{
                  backgroundImage: `url('http://localhost:7000/files/${campaign.bannerUrl}')`,
                }}
              >
                <CardHeader>
                  <CardTitle>{campaign.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea>TODO: Ajouter joueurs ? Autre info ?</ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link to={`/campaign/${campaign.id}`}>Détail</Link>
                  </Button>
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}

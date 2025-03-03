import { useUserStore } from "@/lib/zustand/userStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "react-router-dom";
import type { Campaign } from "../lib/graphql/generated/graphql-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../lib/shadcn/generated/ui/card";

type Props = {
  title: string;
  data: Campaign[];
};
export default function CampaignList({ title, data }: Props) {
  const currentUser = useUserStore((state) => state.user);

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
                  <Link to={`/campaign/${campaign.id}`}>Détail</Link>
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}

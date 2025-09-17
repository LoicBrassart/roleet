import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/shadcn/generated/ui/card";
import { ScrollArea } from "@/lib/shadcn/generated/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/shadcn/generated/ui/tabs";
import type { FlashcardTyped, TDndNpcCard } from "@/types/flashcards";

type Props = {
  card: FlashcardTyped;
};
export default function FlashCard({ card }: Props) {
  switch (card.type) {
    case "DndNpcCard":
      return <DndNpcCard card={card as TDndNpcCard} />;
    default:
      return <DefaultCard />;
  }
}

function DefaultCard() {
  return (
    <Card className="m-1 h-96 w-96">
      <CardHeader>
        <CardTitle>N/A</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          Cette card n'est actuellement pas supportée par Roleet 🤷
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

type DndNpcCardProps = {
  card: TDndNpcCard;
};
function DndNpcCard({ card }: DndNpcCardProps) {
  return (
    <Card className="m-1 h-96 w-96">
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>
          {`${card.data.species} de taille ${card.data.size}, ${card.data.alignment}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="attacks">Attacks</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <ScrollArea className="h-[200px]">{card.description}</ScrollArea>
          </TabsContent>
          <TabsContent value="stats">
            <ScrollArea className="h-[200px]">
              <p>Armure: {card.data.armorClass}</p>
              <p>Points de vie: {card.data.health}</p>
              <p>Vitesse: {card.data.speed}m</p>
              <hr />
              <ul className="flex">
                <li>
                  <StatItem label="STR" value={card.data.strength} />
                </li>
                <li>
                  <StatItem label="DEX" value={card.data.dexterity} />
                </li>
                <li>
                  <StatItem label="CON" value={card.data.constitution} />
                </li>
                <li>
                  <StatItem label="INT" value={card.data.intelligence} />
                </li>
                <li>
                  <StatItem label="WIS" value={card.data.wisdom} />
                </li>
                <li>
                  <StatItem label="CHA" value={card.data.charisma} />
                </li>
              </ul>
              <hr />
              <p>Compétences: {card.data.skills}</p>
              <p>Sens: {card.data.senses}</p>
              <p>Langues: {card.data.languages}</p>
              <p>Puissance: {card.data.dangerLevel}</p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="attacks">
            <ScrollArea className="h-[200px]">
              <p>{card.data.behaviour}</p>
              <hr />
              <p>{card.data.actions}</p>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
function StatItem({ label, value }: { label: string; value: number }) {
  const mod = Math.floor((value - 10) / 2);
  return (
    <>
      {label}: {value} ({mod >= 0 ? `+${mod}` : mod})
    </>
  );
}

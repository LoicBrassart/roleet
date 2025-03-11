import type { Flashcard } from "@/lib/graphql/generated/graphql-types";
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
import { type TDndNpcCard, isDndNpcCard } from "@/types/flashcards";
import type { Q } from "@/types/queries";

type Props = {
  card: Q.ScenarioFlashcard;
};
export default function FlashCard({ card }: Props) {
  switch (true) {
    case isDndNpcCard(card):
      return <DndNpcCard card={card} />;
    default:
      return <DefaultCard />;
  }
}

type DndNpcCardProps = {
  card: TDndNpcCard;
};
function DndNpcCard({ card }: DndNpcCardProps) {
  return (
    <Card className="w-96 h-96 m-1">
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
                <li>{`STR: ${card.data.strength} (${Math.floor(
                  (card.data.strength - 10) / 2,
                )})`}</li>
                <li>{`DEX: ${card.data.dexterity} (${Math.floor(
                  (card.data.dexterity - 10) / 2,
                )})`}</li>
                <li>{`CON: ${card.data.constitution} (${Math.floor(
                  (card.data.constitution - 10) / 2,
                )})`}</li>
                <li>{`INT: ${card.data.intelligence} (${Math.floor(
                  (card.data.intelligence - 10) / 2,
                )})`}</li>
                <li>{`WIS: ${card.data.wisdom} (${Math.floor(
                  (card.data.wisdom - 10) / 2,
                )})`}</li>
                <li>{`CHA: ${card.data.charisma} (${Math.floor(
                  (card.data.charisma - 10) / 2,
                )})`}</li>
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
type DefaultCardProps = {
  card: Flashcard;
};
function DefaultCard() {
  return (
    <Card className="w-96 h-96 m-1">
      <CardHeader>
        <CardTitle>N/A</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          Cette carte n'est actuellement pas supportée par Roleet 🤷
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

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
import type { DndNpcCard, FlashcardTyped } from "@/types/flashcards";

type DndNpcCardProps = {
  card: DndNpcCard;
};
function DndNpcCard({ card }: DndNpcCardProps) {
  return (
    <Card className="w-96 h-96 m-1">
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>
          {`${card.species} de taille ${card.size}, ${card.alignment}`}
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
              <p>Armure: {card.armorClass}</p>
              <p>Points de vie: {card.health}</p>
              <p>Vitesse: {card.speed}m</p>
              <hr />
              <ul className="flex">
                <li>{`STR: ${card.strength} (${Math.floor(
                  (card.strength - 10) / 2,
                )})`}</li>
                <li>{`DEX: ${card.dexterity} (${Math.floor(
                  (card.dexterity - 10) / 2,
                )})`}</li>
                <li>{`CON: ${card.constitution} (${Math.floor(
                  (card.constitution - 10) / 2,
                )})`}</li>
                <li>{`INT: ${card.intelligence} (${Math.floor(
                  (card.intelligence - 10) / 2,
                )})`}</li>
                <li>{`WIS: ${card.wisdom} (${Math.floor(
                  (card.wisdom - 10) / 2,
                )})`}</li>
                <li>{`CHA: ${card.charisma} (${Math.floor(
                  (card.charisma - 10) / 2,
                )})`}</li>
              </ul>
              <hr />
              <p>Compétences: {card.skills}</p>
              <p>Sens: {card.senses}</p>
              <p>Langues: {card.languages}</p>
              <p>Puissance: {card.dangerLevel}</p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="attacks">
            <ScrollArea className="h-[200px]">
              <p>{card.behaviour}</p>
              <hr />
              <p>{card.actions}</p>
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
          Cette card n'est actuellement passupportée par Roleet 🤷
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

type Props = {
  card: FlashcardTyped;
};
export default function FlashCard({ card }: Props) {
  switch (card.type) {
    case "DndNpcCard":
      return <DndNpcCard card={card} />;
    default:
      return <DefaultCard />;
  }
}

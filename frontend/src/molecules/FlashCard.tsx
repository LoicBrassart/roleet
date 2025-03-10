import type {
  DnDnpcCard,
  Flashcard,
  FlashcardUnion,
} from "@/lib/graphql/generated/graphql-types";
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

// TODO type props
type DnDnpcCardProps = {
  data: DnDnpcCard;
};
function DnDnpcCardComponent({ data }: DnDnpcCardProps) {
  return (
    <Card className="w-96 h-96 m-1">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>
          {`${data.species} de taille ${data.size}, ${data.alignment}`}
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
            <ScrollArea className="h-[200px]">{data.description}</ScrollArea>
          </TabsContent>
          <TabsContent value="stats">
            <ScrollArea className="h-[200px]">
              <p>Armure: {data.armorClass}</p>
              <p>Points de vie: {data.health}</p>
              <p>Vitesse: {data.speed}m</p>
              <hr />
              <ul className="flex">
                <li>{`STR: ${data.strength} (${Math.floor(
                  (data.strength - 10) / 2
                )})`}</li>
                <li>{`DEX: ${data.dexterity} (${Math.floor(
                  (data.dexterity - 10) / 2
                )})`}</li>
                <li>{`CON: ${data.constitution} (${Math.floor(
                  (data.constitution - 10) / 2
                )})`}</li>
                <li>{`INT: ${data.intelligence} (${Math.floor(
                  (data.intelligence - 10) / 2
                )})`}</li>
                <li>{`WIS: ${data.wisdom} (${Math.floor(
                  (data.wisdom - 10) / 2
                )})`}</li>
                <li>{`CHA: ${data.charisma} (${Math.floor(
                  (data.charisma - 10) / 2
                )})`}</li>
              </ul>
              <hr />
              <p>Compétences: {data.skills}</p>
              <p>Sens: {data.senses}</p>
              <p>Langues: {data.languages}</p>
              <p>Puissance: {data.dangerLevel}</p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="attacks">
            <ScrollArea className="h-[200px]">
              <p>{data.behaviour}</p>
              <hr />
              <p>{data.actions}</p>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
type DefaultFlashCardProps = {
  data: Flashcard;
};
function DefaultFlashCard({ data }: DefaultFlashCardProps) {
  return (
    <Card className="w-96 h-96 m-1">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>{data.description}</ScrollArea>
      </CardContent>
    </Card>
  );
}

type FlashCardProps = {
  data: FlashcardUnion;
};
export default function FlashCard({ data }: FlashCardProps) {
  switch (data.type) {
    case "DnDnpcCard":
      return <DnDnpcCardComponent data={data as DnDnpcCard} />;
    default:
      return <DefaultFlashCard data={data as Flashcard} />;
  }
}

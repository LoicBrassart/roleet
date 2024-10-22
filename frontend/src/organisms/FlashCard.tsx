import type {
  DnDnpcCard,
  FlashcardUnion,
} from "@/lib/graphql/generated/graphql-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/shadcn/ui/card";

type DnDnpcCardProps = {
  data: DnDnpcCard;
};
function DnDnpcCardComponent({ data }: DnDnpcCardProps) {
  return (
    <Card className="w-96 aspect-square m-1">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{`${data.species} de taille ${data.size}, ${data.alignment} `}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Armure: {data.armorClass}</p>
        <p>Points de vie: {data.health}</p>
        <p>Vitesse: {data.speed}m</p>
        <hr />
        <ul className="flex">
          <li>{`STR: ${data.strength} (${Math.floor((data.strength - 10) / 2)})`}</li>
          <li>{`DEX: ${data.dexterity} (${Math.floor((data.dexterity - 10) / 2)})`}</li>
          <li>{`CON: ${data.constitution} (${Math.floor((data.constitution - 10) / 2)})`}</li>
          <li>{`INT: ${data.intelligence} (${Math.floor((data.intelligence - 10) / 2)})`}</li>
          <li>{`WIS: ${data.wisdom} (${Math.floor((data.wisdom - 10) / 2)})`}</li>
          <li>{`CHA: ${data.charisma} (${Math.floor((data.charisma - 10) / 2)})`}</li>
        </ul>
        <hr />
        <p>Compétences: {data.skills}</p>
        <p>Sens: {data.senses}</p>
        <p>Langues: {data.languages}</p>
        <p>Puissance: {data.dangerLevel}</p>
        <hr />
        <p>{data.behaviour}</p>
        <hr />
        <p>{data.actions}</p>
      </CardContent>
      <CardFooter>{data.description}</CardFooter>
    </Card>
  );
}

type FlashCardProps = {
  data: FlashcardUnion;
};
export default function FlashCard({ data }: FlashCardProps) {
  if (data.type === "DnDnpcCard")
    return <DnDnpcCardComponent data={data as DnDnpcCard} />;
  return <p>This is a basic Card named {data.title}</p>;
}

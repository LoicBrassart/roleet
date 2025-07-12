import { Card } from "@/atoms/Card";
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
      return (
        <Card title="N/A">
          Cette card n'est actuellement pas supportée par Roleet 🤷
        </Card>
      );
  }
}

type DndNpcCardProps = {
  card: TDndNpcCard;
};
function DndNpcCard({ card }: DndNpcCardProps) {
  return (
    <Card
      title={card.title}
      description={`${card.data.species} de taille ${card.data.size}, ${card.data.alignment}`}
      variant="flashcard"
    >
      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="attacks">Attacks</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <ScrollArea className="h-[200px] pr-2">{card.description}</ScrollArea>
        </TabsContent>
        <TabsContent value="stats">
          <ScrollArea className="h-[200px] pr-2">
            <p>Armure: {card.data.armorClass}</p>
            <p>Points de vie: {card.data.health}</p>
            <p>Vitesse: {card.data.speed}m</p>
            <hr />
            <ul className="grid grid-cols-3">
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
          <ScrollArea className="h-[200px] pr-2">
            <p>{card.data.behaviour}</p>
            <hr />
            <p>{card.data.actions}</p>
          </ScrollArea>
        </TabsContent>
      </Tabs>
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

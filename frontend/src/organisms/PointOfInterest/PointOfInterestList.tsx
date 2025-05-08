import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/generated/ui/accordion";
import type { Entities } from "@/types/entities";

type Props = {
  data: Entities.PoI[];
};
export default function PointOfInterestList({ data }: Props) {
  if (!data.length) return <p>Rien à afficher ici :shrug: </p>;

  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((poi) => {
        return (
          <AccordionItem value={`key-${poi.id}`} key={poi.id}>
            <AccordionTrigger>
              {poi.code} - {poi.title}
            </AccordionTrigger>
            <AccordionContent>{poi.description}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

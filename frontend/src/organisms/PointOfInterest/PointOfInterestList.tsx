import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/shadcn/generated/ui/accordion";
import type { Q } from "@/types/queries";

type Props = {
  data: Q.Scenario["plans"][number]["pointsOfInterest"];
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

import { EditableField } from "@/atoms/EditableField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/shadcn/generated/ui/card";
import { Form } from "@/lib/shadcn/generated/ui/form";
import { ScrollArea } from "@/lib/shadcn/generated/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/shadcn/generated/ui/tabs";
import { dndNpcCardSchema } from "@/lib/zod/dndNpcCard";
import type { FlashcardTyped, TDndNpcCard } from "@/types/flashcards";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type Props = {
  card: FlashcardTyped;
};
export default function FlashCardForm({ card }: Props) {
  switch (card.type) {
    case "DndNpcCard":
      return <DndNpcCardForm card={card} />;
    default:
      return <DefaultCardForm />;
  }
}

function DefaultCardForm() {
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
function DndNpcCardForm({ card }: DndNpcCardProps) {
  const form = useForm({
    resolver: zodResolver(dndNpcCardSchema),
    defaultValues: {
      title: card?.title ?? "",
      actions: card?.data?.actions ?? "",
      alignment: card?.data?.alignment ?? "",
      armorClass: card?.data?.armorClass ?? "",
      behaviour: card?.data?.behaviour ?? "",
      charisma: card?.data?.charisma ?? "",
      constitution: card?.data?.constitution ?? "",
      dangerLevel: card?.data?.dangerLevel ?? "",
      description: card?.description ?? "",
      dexterity: card?.data?.dexterity ?? "",
      health: card?.data?.health ?? "",
      intelligence: card?.data?.intelligence ?? "",
      languages: card?.data?.languages ?? "",
      senses: card?.data?.senses ?? "",
      size: card?.data?.size ?? "",
      skills: card?.data?.skills ?? "",
      species: card?.data?.species ?? "",
      speed: card?.data?.speed ?? "",
      strength: card?.data?.strength ?? "",
      wisdom: card?.data?.wisdom ?? "",
    },
  });
  const { register, handleSubmit } = form;

  const hSubmitScenario = async (values: z.input<typeof dndNpcCardSchema>) => {
    console.log(values);
  };

  return (
    <Card className="m-1 h-96 w-96">
      <Form {...form}>
        <form onSubmit={handleSubmit(hSubmitScenario)} className="space-y-6">
          <CardHeader>
            <CardTitle>
              <EditableField label="Titre" {...register("title")} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">Généralités</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="attacks">Attacks</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="flex">
                <EditableField label="Species" {...register("species")} />
                <EditableField label="Size" {...register("size")} />
                <EditableField label="Alignment" {...register("alignment")} />
              </TabsContent>
              <TabsContent value="description">
                <ScrollArea className="h-[200px]">
                  <EditableField
                    label="Description"
                    {...register("description")}
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="stats">
                <ScrollArea className="h-[200px]">
                  <ul className="flex">
                    <li>
                      <EditableField
                        label="Armor Class"
                        {...register("armorClass")}
                      />
                    </li>
                    <li>
                      <EditableField label="Health" {...register("health")} />
                    </li>
                    <li>
                      <EditableField label="Speed" {...register("speed")} />
                    </li>
                    <li>
                      <EditableField
                        label="Puissance"
                        {...register("dangerLevel")}
                      />
                    </li>
                  </ul>
                  <hr />
                  <ul className="flex">
                    <li>
                      <EditableField label="STR" {...register("strength")} />
                    </li>
                    <li>
                      <EditableField label="DEX" {...register("dexterity")} />
                    </li>
                    <li>
                      <EditableField
                        label="CON"
                        {...register("constitution")}
                      />
                    </li>
                    <li>
                      <EditableField
                        label="INT"
                        {...register("intelligence")}
                      />
                    </li>
                    <li>
                      <EditableField label="WIS" {...register("wisdom")} />
                    </li>
                    <li>
                      <EditableField label="CHA" {...register("charisma")} />
                    </li>
                  </ul>
                  <hr />
                  <EditableField label="Compétences" {...register("skills")} />
                  <EditableField label="Sens" {...register("senses")} />
                  <EditableField label="Langues" {...register("languages")} />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="attacks">
                <ScrollArea className="h-[200px]">
                  <EditableField
                    label="Comportement"
                    {...register("behaviour")}
                  />
                  <hr />
                  <EditableField label="Actions" {...register("actions")} />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}

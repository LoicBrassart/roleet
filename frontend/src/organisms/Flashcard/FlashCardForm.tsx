import { EditableField } from "@/atoms/EditableField";
import {
  Card,
  CardContent,
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
import { dndNpcCardSchema } from "@/lib/zod/dndNpcCard";
import type { FlashcardTyped, TDndNpcCard } from "@/types/flashcards";
import type { z } from "zod";
import { Form } from "../../atoms/Form";

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
  const hSubmitScenario = async (values: z.input<typeof dndNpcCardSchema>) => {
    console.log(values);
  };

  return (
    <Card className="m-1 h-96 w-96">
      <Form
        onSubmit={hSubmitScenario}
        schema={dndNpcCardSchema}
        defaultValues={card}
        className="space-y-6"
      >
        {({ register }) => (
          <>
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
                    <EditableField
                      label="Compétences"
                      {...register("skills")}
                    />
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
          </>
        )}
      </Form>
    </Card>
  );
}

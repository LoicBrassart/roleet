import { Button } from "@/atoms/Button";
import { Card } from "@/atoms/Card";
import { EditableField } from "@/atoms/EditableField";
import { triggerCustomEvent } from "@/lib/hooks/useEventListener";
import { ScrollArea } from "@/lib/shadcn/generated/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/shadcn/generated/ui/tabs";
import { dndNpcCardSchema } from "@/lib/zod/dndNpcCard";
import type { FlashcardTyped, TDndNpcCard } from "@/types/flashcards";
import { useState } from "react";
import type { z } from "zod";
import { Form } from "../../atoms/Form";

type Props = {
  card?: FlashcardTyped;
  formCompId?: string;
};
export default function FlashCardForm({ card, formCompId, ...props }: Props) {
  if (!card) return <BlankCardForm />;

  switch (card.type) {
    case "DndNpcCard":
      return (
        <DndNpcCardForm
          card={card as TDndNpcCard}
          formCompId={formCompId}
          {...props}
        />
      );
    default:
      return (
        <Card title="N/A">
          Cette card n'est actuellement pas supportée par Roleet 🤷
        </Card>
      );
  }
}

function BlankCardForm() {
  const [cardType, setCardType] = useState("");

  switch (cardType) {
    case "DndNpcCard":
      return <DndNpcCardForm />;
    default:
      return (
        <Card className="m-1 h-96 w-96" title="Choose your card type">
          <select onChange={(evt) => setCardType(evt.currentTarget.value)}>
            <option value="">---Select card type---</option>
            <option value="DndNpcCard">DnD NPC Card</option>
          </select>
        </Card>
      );
  }
}

type DndNpcCardProps = {
  card?: TDndNpcCard;
  formCompId?: string;
};
function DndNpcCardForm({ card, formCompId }: DndNpcCardProps) {
  const hSubmitCard = async (values: z.input<typeof dndNpcCardSchema>) => {
    console.log(values);
    if (formCompId) {
      triggerCustomEvent("FormWrapper-submit-child", { uuid: formCompId });
    }
  };
  const defaultCard = Object.assign(
    {
      title: "",
      species: "",
      size: "",
      alignment: "",
      description: "",
      armorClass: 10,
      health: "",
      speed: "", //TODO: bug! Error msg "wanted string, got number" where the true reason lies in the min value length
      dangerLevel: 1,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      skills: "",
      senses: "",
      languages: "",
      behaviour: "",
      actions: "",
    },
    card,
    card?.data,
  );

  return (
    <Form
      onSubmit={hSubmitCard}
      schema={dndNpcCardSchema}
      defaultValues={defaultCard}
      className="space-y-6"
    >
      {({ register }) => (
        <Card title={<EditableField label="Titre" {...register("title")} />}>
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
                    <EditableField label="CON" {...register("constitution")} />
                  </li>
                  <li>
                    <EditableField label="INT" {...register("intelligence")} />
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
          <Button type="submit">Sauvegarder</Button>
        </Card>
      )}
    </Form>
  );
}

import { Card } from "@/atoms/Card";
import FormWrapper from "@/atoms/FormWrapper";
import type { Entities } from "@/types/entities";
import FlashCard from "./FlashCard";
import FlashCardForm from "./FlashCardForm";

type Props = {
  title?: string;
  data: Entities.Flashcard[];
  locked: boolean;
};
export default function FlashcardList({ locked, title, data }: Props) {
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul className="flex flex-wrap">
        {data.map((flashcard) => (
          <li key={flashcard.id}>
            <FormWrapper
              baseComp={<FlashCard card={flashcard} />}
              formComp={<FlashCardForm card={flashcard} />}
              locked={locked}
            />
          </li>
        ))}
        {!locked && (
          <li>
            <FormWrapper
              baseComp={
                <Card title="Ajouter une card" variant="creation">
                  Editer pour ajouter une nouvelle flashcard
                </Card>
              }
              formComp={<FlashCardForm />}
              locked={locked}
            />
          </li>
        )}
      </ul>
    </>
  );
}

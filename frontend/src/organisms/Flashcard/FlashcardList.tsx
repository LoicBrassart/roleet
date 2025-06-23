import type { Entities } from "@/types/entities";
import FlashCard from "./FlashCard";
import FlashCardForm from "./FlashCardForm";

type Props = {
  title?: string;
  data: Entities.Flashcard[];
  isEditing: boolean;
};
export default function FlashcardList(props: Props) {
  return (
    <>
      {props.title && <h2>{props.title}</h2>}
      <ul className="flex flex-wrap">
        {props.data.map((flashcard) => (
          <li key={flashcard.id}>
            {props.isEditing ? (
              <FlashCardForm card={flashcard} />
            ) : (
              <FlashCard card={flashcard} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

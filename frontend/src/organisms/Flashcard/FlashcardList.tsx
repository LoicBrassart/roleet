import type { Entities } from "@/types/entities";
import FlashCard from "./FlashCard";

type Props = {
  title?: string;
  data: Entities.Flashcard[];
};
export default function FlashcardList(props: Props) {
  return (
    <>
      {props.title && <h2>{props.title}</h2>}
      <ul className="flex flex-wrap">
        {props.data.map((flashcard) => (
          <li key={flashcard.id}>
            <FlashCard card={flashcard} />
          </li>
        ))}
      </ul>
    </>
  );
}

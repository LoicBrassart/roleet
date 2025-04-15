import type { Q } from "@/types/queries";
import FlashCard from "./FlashCard";

type Props = {
  title?: string;
  data: Q.ScenarioFlashcard[];
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

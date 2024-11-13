import type { FlashcardUnion } from "../lib/graphql/generated/graphql-types";
import FlashCard from "../molecules/FlashCard";

type Props = {
  title?: string;
  data: FlashcardUnion[];
};
export default function FlashcardList(props: Props) {
  return (
    <>
      {props.title && <h2>{props.title}</h2>}
      <ul className="flex flex-wrap">
        {props.data.map((flashcard) => (
          <li key={flashcard.id}>
            <FlashCard data={flashcard} />
          </li>
        ))}
      </ul>
    </>
  );
}

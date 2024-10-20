import type { Flashcard } from "../lib/graphql/generated/graphql-types";
import FlashCard from "../molecules/FlashCard";

type Props = {
  title: string;
  data: Flashcard[];
};
export default function FlashcardList(props: Props) {
  return (
    <>
      <h2>{props.title}</h2>
      <ul className="flex">
        {props.data.map((flashcard) => (
          <li key={flashcard.id}>
            <FlashCard data={flashcard} />
          </li>
        ))}
      </ul>
    </>
  );
}

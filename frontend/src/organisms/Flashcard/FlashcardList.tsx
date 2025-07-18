import FormWrapper from "@/atoms/FormWrapper";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/shadcn/generated/ui/card";
import type { Entities } from "@/types/entities";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import FlashCard from "./FlashCard";
import FlashCardForm from "./FlashCardForm";

type Props = {
  title?: string;
  data: Entities.Flashcard[];
  locked: boolean;
};
export default function FlashcardList(props: Props) {
  return (
    <>
      {props.title && <h2>{props.title}</h2>}
      <ul className="flex flex-wrap">
        {props.data.map((flashcard) => (
          <li key={flashcard.id}>
            <FormWrapper
              baseComp={<FlashCard card={flashcard} {...props} />}
              formComp={<FlashCardForm card={flashcard} {...props} />}
              locked={props.locked}
            />
          </li>
        ))}
        {!props.locked && (
          <li>
            <FormWrapper
              baseComp={
                <Card className="m-1 h-96 w-96">
                  <CardHeader>
                    <CardTitle>Ajouter une card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea>
                      Editer pour ajouter une nouvelle flashcard
                    </ScrollArea>
                  </CardContent>
                </Card>
              }
              formComp={<FlashCardForm {...props} />}
              locked={props.locked}
            />
          </li>
        )}
      </ul>
    </>
  );
}

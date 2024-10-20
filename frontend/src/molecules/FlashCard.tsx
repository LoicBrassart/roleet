import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/shadcn/ui/card";
import type { Flashcard } from "../lib/graphql/generated/graphql-types";

type Props = {
  data: Flashcard;
};
export default function FlashCard({ data }: Props) {
  return (
    <>
      <Card className="w-96 aspect-square m-1">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.type}</CardDescription>
        </CardHeader>
        <CardContent>{data.description}</CardContent>
      </Card>
    </>
  );
}

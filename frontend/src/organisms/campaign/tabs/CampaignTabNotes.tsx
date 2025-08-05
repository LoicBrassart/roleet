import { useDebounce } from "@uidotdev/usehooks";
import { type FormEvent, useEffect, useState } from "react";
import Contenteditable from "@/atoms/ContentEditable";
import { useEditNotesMutation } from "@/lib/graphql/generated/graphql-types";
import type { Entities } from "@/types/entities";

type Props = {
  notes: Entities.Notes;
};
export function CampaignTabNotes({ notes }: Props) {
  const [content, setContent] = useState(notes.content);
  const debouncedContent = useDebounce(content, 1500);
  const [save] = useEditNotesMutation();

  const hInput = (evt: FormEvent<HTMLDivElement>) => {
    setContent(evt.currentTarget.innerText);
  };

  useEffect(() => {
    save({ variables: { content: debouncedContent, noteId: notes.id } });
  }, [debouncedContent, save, notes]);

  return (
    <>
      <h1 className="font-title text-white">Mes Notes de campagne</h1>
      <Contenteditable onChange={hInput} value={content} />
    </>
  );
}

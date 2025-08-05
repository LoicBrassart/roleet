import { type FormEvent, useEffect, useRef } from "react";

type Props = {
  onChange: (evt: FormEvent<HTMLDivElement>) => void;
  value: string;
};
export default function Contenteditable({ onChange, value }: Props) {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentEditableRef.current) return;
    if (contentEditableRef.current.textContent !== value) {
      contentEditableRef.current.textContent = value;
    }
  });

  return (
    <div contentEditable="true" ref={contentEditableRef} onInput={onChange} />
  );
}

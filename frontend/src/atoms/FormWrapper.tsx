import { cloneElement, type ReactElement, useEffect, useId } from "react";
import { useEventListener } from "@/lib/hooks/useEventListener";
import { useToggle } from "@/lib/hooks/useToggle";
import { Button } from "./Button";

type FormWrapperProps = {
  baseComp: ReactElement;
  formComp: ReactElement<{ formCompId: string }>;
  locked: boolean;
};
export default function FormWrapper({
  baseComp,
  formComp,
  locked,
}: FormWrapperProps) {
  const [editable, toggleEditable, setEditable] = useToggle(locked);
  const id = useId();
  useEventListener("FormWrapper-submit-child", (detail) => {
    if (detail.uuid === id) setEditable(false);
  });

  useEffect(() => {
    if (locked) setEditable(false);
  }, [locked, setEditable]);

  return (
    <div className="relative">
      {editable
        ? cloneElement(formComp, { formCompId: id })
        : cloneElement(baseComp)}
      {!locked && (
        <div className="absolute right-0 bottom-0">
          {!editable && <Button onClick={toggleEditable}>✏️</Button>}{" "}
        </div>
      )}
    </div>
  );
}

import { useEventListener } from "@/lib/hooks/useEventListener";
import { useToggleState } from "@/lib/hooks/useToggleState";
import { type ReactElement, cloneElement, useEffect, useId } from "react";
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
  const [editable, setEditable, toggleEditable] = useToggleState(locked);
  const id = useId();
  const canBeEdited = !locked && !editable;

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
      {canBeEdited && (
        <div className="absolute right-2 bottom-2">
          <Button onClick={toggleEditable}>✏️</Button>
        </div>
      )}
    </div>
  );
}

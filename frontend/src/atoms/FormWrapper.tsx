import { useEventListener } from "@/lib/hooks/useEventListener";
import {
  type ReactElement,
  cloneElement,
  useEffect,
  useId,
  useState,
} from "react";
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
  const [editable, setEditable] = useState<boolean>(locked);
  const id = useId();
  const toggleEditable = () => {
    setEditable(!editable);
  };
  useEventListener("FormWrapper-submit-child", (detail) => {
    if (detail.uuid === id) setEditable(false);
  });

  useEffect(() => {
    if (locked) setEditable(false);
  }, [locked]);

  return (
    <div className="relative">
      {editable
        ? cloneElement(formComp, { formCompId: id })
        : cloneElement(baseComp)}
      {!locked && (
        <div className="absolute right-0 bottom-0">
          {!editable && <Button onClick={toggleEditable}>✏️</Button>}
        </div>
      )}
    </div>
  );
}

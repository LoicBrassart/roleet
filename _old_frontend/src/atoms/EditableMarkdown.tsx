import { ScrollArea } from "@radix-ui/react-scroll-area";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { type ChangeEvent, useState } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/lib/shadcn/generated/ui/resizable";
import { EditableField } from "./EditableField";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Prettify<
  Pick<ControllerProps<TFieldValues, TName>, "control" | "name"> & {
    source: string;
  }
>;
export default function EditableMarkdown<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ source, ...fieldProps }: Props<TFieldValues, TName>) {
  const [value, setValue] = useState<string>(source);

  const _hChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.currentTarget.value);
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[90vh]">
        <ScrollArea className="h-[90vh] px-2">
          {/* <Textarea
            className="h-full w-full"
            defaultValue={value}
            onChange={hChange}
          /> */}
          <EditableField label="Full story" {...fieldProps} />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="h-[90vh]">
        <ScrollArea className="h-[90vh] px-2 ">
          <MarkdownPreview
            className="h-full overflow-y-scroll p-4"
            source={value}
          />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

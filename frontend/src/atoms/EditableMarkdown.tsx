import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/lib/shadcn/generated/ui/resizable";
import { Textarea } from "@/lib/shadcn/generated/ui/textarea";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { type ChangeEvent, useState } from "react";

type Props = {
  source: string;
};
export default function EditableMarkdown({ source }: Props) {
  const [value, setValue] = useState<string>(source);

  const hChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.currentTarget.value);
  };

  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="h-[90vh]">
          <ScrollArea className="h-[90vh] px-2">
            <Textarea
              className="h-full w-full"
              defaultValue={value}
              onChange={hChange}
            />
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
    </>
  );
}

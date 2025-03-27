import type { Message } from "@/lib/graphql/generated/graphql-types";
import { useSocket } from "@/lib/hooks/useSocket";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/shadcn/generated/ui/tooltip";

type Props = {
  title: string;
  data: Omit<Message, "campaign" | "owner">[];
};

export default function Chat({ title, data }: Props) {
  const { isConnected } = useSocket();

  if (!data.length)
    return (
      <>
        <h2>{title}</h2>
        <p>Rien à afficher ici :shrug: </p>
      </>
    );

  return (
    <>
      <h2>
        {title} ({isConnected ? "🟢" : "🔴"})
      </h2>
      <ul className="gap-4 border">
        {data.map((message) => {
          return (
            <li key={message.id} className="w-96">
              <TooltipProvider>
                <Tooltip>
                  <p>
                    <TooltipTrigger>Xxxx:</TooltipTrigger>
                  </p>
                  <TooltipContent>
                    {Intl.DateTimeFormat(undefined, {
                      dateStyle: "medium",
                      timeStyle: "medium",
                    }).format(new Date(message.createdAt))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {message.content}
            </li>
          );
        })}
      </ul>
    </>
  );
}

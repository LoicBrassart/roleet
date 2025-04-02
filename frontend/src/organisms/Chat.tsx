import { formatDate } from "@/lib/helpers/dateFormatter";
import { useChat } from "@/lib/hooks/useChat";
import type { Message } from "@/lib/graphql/generated/graphql-types";
import { useSocket } from "@/lib/hooks/useSocket";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/shadcn/generated/ui/tooltip";
import { useUserStore } from "@/lib/zustand/userStore";
import type { Q } from "@/types/queries";
import type { FormEvent } from "react";

type Props = {
  title: string;
  room: string;
  data: Q.CampaignMessage[];
};
export default function Chat({ title, data, room }: Props) {
  const { messages, sendMessage, isConnected } = useChat(data);
  const currentUser = useUserStore((state) => state.user);
  if (!currentUser) return <p>Connectez vous pour accéder au Chat</p>;

  const hSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data = new FormData(evt.currentTarget);
    const message = (data.get("msg") as string).trim();

    if (message) {
      sendMessage({
        channel: room,
        content: message,
        userId: currentUser.id,
      });
      evt.currentTarget.reset();
    }
  };

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
        {messages.map((message) => {
          return (
            <li key={message.id} className="w-96">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <p>
                    <TooltipTrigger>Xxxx:</TooltipTrigger>
                  </p>
                  <TooltipContent>
                    {formatDate(message.createdAt)}{" "}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {message.content}
            </li>
          );
        })}
      </ul>
      <form onSubmit={hSubmit}>
        <input type="text" name="msg" placeholder="Message..." />
        <input type="submit" value="Envoyer" />
      </form>
    </>
  );
}

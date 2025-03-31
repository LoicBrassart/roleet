import { Input } from "@/atoms/Input";
import type { Message } from "@/lib/graphql/generated/graphql-types";
import { useSocket } from "@/lib/hooks/useSocket";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/shadcn/generated/ui/tooltip";
import { useUserStore } from "@/lib/zustand/userStore";
import { type FormEvent, useEffect, useState } from "react";

type Props = {
  title: string;
  room: string;
  data: Omit<Message, "campaign" | "owner">[]; // TODO: Remove this Omit, bypassing a back technicality for now
};

export default function Chat({ title, data, room }: Props) {
  const { socket, isConnected } = useSocket();
  const currentUser = useUserStore((state) => state.user);
  const [messages, setMessages] = useState(data);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (payload) => {
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          channel: room,
          ...payload,
        },
      ]);
    });
  }, [socket]);

  if (!currentUser) return <p>Connectez vous pour accéder au Chat</p>;

  const hSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!socket) return;

    const form = evt.currentTarget;
    const input = form.elements.namedItem("msg") as HTMLInputElement;
    const message = input.value.trim();

    if (message) {
      socket.emit("message", {
        room,
        content: message,
        userId: currentUser.id,
      });
      input.value = "";
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
      <form onSubmit={hSubmit}>
        <input type="text" name="msg" placeholder="Message..." />
        <input type="submit" value="Envoyer" />
      </form>
    </>
  );
}

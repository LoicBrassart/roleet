import type { FormEvent } from "react";
import { useChat } from "@/lib/hooks/useChat";
import { useCurrentUser } from "@/lib/zustand/userStore";
import { List } from "@/molecules/List";
import type { Entities } from "@/types/entities";
import MessageCard from "./MessageCard";

type Props = {
  title: string;
  room: string;
  data: Entities.Message[];
};
export default function Chat({ title, data, room }: Props) {
  const { messages, sendMessage, isConnected } = useChat(room, data);
  const currentUser = useCurrentUser();
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
      <List
        title={`${title} (${isConnected ? "🟢" : "🔴"})`}
        data={messages}
        render={(message) => {
          return (
            <MessageCard
              content={message.content}
              createdAt={message.createdAt}
            />
          );
        }}
      />
      <form onSubmit={hSubmit}>
        <input type="text" name="msg" placeholder="Message..." />
        <input type="submit" value="Envoyer" />
      </form>
    </>
  );
}

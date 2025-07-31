import { useParams } from "react-router";
import { useGetCampaignQuery } from "@/lib/graphql/generated/graphql-types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/shadcn/generated/ui/tabs";
import { List } from "@/molecules/List";
import MessageCard from "@/organisms/message/MessageCard";

export default function Campaign() {
  const { id } = useParams();
  if (!id) return <p>Error: missing id !</p>;
  // biome-ignore lint/correctness/useHookAtTopLevel: Calling my api without the needed variable is useless, I'd rather this component's perf slow down a bit
  const { data, loading, error } = useGetCampaignQuery({ variables: { id } });
  if (error) return <p>Error: fetch failed !</p>;
  if (loading) return <p>Loading: please wait...</p>;
  const campaign = data?.getCampaign;
  if (!campaign) return <p>Error: missing data !</p>;

  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="home">General</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="docs">Documents</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="npc">Contacts</TabsTrigger>
        <TabsTrigger value="sheet">Mon personnage</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
      </TabsList>
      <TabsContent value="home">TODO: General</TabsContent>
      <TabsContent value="chat">
        <List
          title="Tous les messages"
          data={campaign.messages}
          render={(message) => (
            <MessageCard
              content={message.content}
              createdAt={message.createdAt}
            />
          )}
        />
      </TabsContent>
      <TabsContent value="docs">TODO: Documents</TabsContent>
      <TabsContent value="notes">TODO: Notes</TabsContent>
      <TabsContent value="npc">TODO: Contacts</TabsContent>
      <TabsContent value="sheet">TODO: Mon personnage</TabsContent>
      <TabsContent value="sessions">TODO: Sessions</TabsContent>
    </Tabs>
  );
}

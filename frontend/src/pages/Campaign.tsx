/** biome-ignore-all lint/correctness/useHookAtTopLevel: Calling my api without the needed variable is useless, I'd rather this component's perf slow down a bit */
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Calendar,
  FileSearch2,
  FileUser,
  House,
  MessagesSquare,
  NotebookPen,
  UserSearch,
} from "lucide-react";
import { useParams } from "react-router";
import {
  useGetCampaignQuery,
  useGetNotesQuery,
} from "@/lib/graphql/generated/graphql-types";
import { List } from "@/molecules/List";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/molecules/Tabs";
import MessageCard from "@/organisms/message/MessageCard";

export default function Campaign() {
  const isSmallDevice = useMediaQuery("(width < 48rem /* 768px */)");
  const { id } = useParams();
  if (!id) return <p>Error: missing id !</p>;
  const {
    data: dataNotes,
    loading: loadingNotes,
    error: errorNotes,
  } = useGetNotesQuery({ variables: { campaignId: id } });
  const { data, loading, error } = useGetCampaignQuery({ variables: { id } });
  if (errorNotes || error) return <p>Error: fetch failed !</p>;
  if (loadingNotes || loading) return <p>Loading: please wait...</p>;
  const campaign = data?.getCampaign;
  const notes = dataNotes?.getNotes;
  if (!campaign || !notes) return <p>Error: missing data !</p>;

  return (
    <Tabs orientation={isSmallDevice ? "vertical" : "horizontal"}>
      <TabsList className="max-md:fixed max-md:right-0 max-md:translate-x-30">
        <TabsTrigger value="home">
          <House className="size-6" />
          General
        </TabsTrigger>
        <TabsTrigger value="chat">
          <MessagesSquare className="size-6" />
          Chat
        </TabsTrigger>
        <TabsTrigger value="docs">
          <FileSearch2 className="size-6" />
          Documents
        </TabsTrigger>
        <TabsTrigger value="notes">
          <NotebookPen className="size-6" />
          Notes
        </TabsTrigger>
        <TabsTrigger value="npc">
          <UserSearch className="size-6" />
          Contacts
        </TabsTrigger>
        <TabsTrigger value="sheet">
          <FileUser className="size-6" />
          Mon personnage
        </TabsTrigger>
        <TabsTrigger value="sessions">
          <Calendar className="size-6" />
          Sessions
        </TabsTrigger>
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
      <TabsContent value="notes">
        <h1 className="font-title text-white">Mes Notes de campagne</h1>
        <p contentEditable>{notes.content}</p>
        {/* TODO: Add debounce + call EditNote */}
      </TabsContent>
      <TabsContent value="docs">TODO: Documents</TabsContent>
      <TabsContent value="npc">TODO: Contacts</TabsContent>
      <TabsContent value="sheet">TODO: Mon personnage</TabsContent>
      <TabsContent value="sessions">TODO: Sessions</TabsContent>
    </Tabs>
  );
}

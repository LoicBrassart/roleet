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
import { useGetCampaignAndNotesQuery } from "@/lib/graphql/generated/graphql-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/molecules/Tabs";
import { CampaignTabChat } from "@/organisms/campaign/tabs/CampaignTabChat";
import { CampaignTabHome } from "@/organisms/campaign/tabs/CampaignTabHome";
import { CampaignTabNotes } from "@/organisms/campaign/tabs/CampaignTabNotes";
import { CampaignTabSessions } from "@/organisms/campaign/tabs/CampaignTabSessions";

export default function Campaign() {
  const isSmallDevice = useMediaQuery("(width < 48rem /* 768px */)");
  const { id } = useParams();
  if (!id) return <p>Error: missing id !</p>;
  const { data, loading, error } = useGetCampaignAndNotesQuery({
    variables: { campaignId: id },
  });
  const campaign = data?.getCampaign;
  const notes = data?.getNotes;
  if (error) return <p>Error: fetch failed !</p>;
  if (loading) return <p>Loading: please wait...</p>;
  if (!campaign || !notes) return <p>Error: missing data !</p>;

  return (
    <Tabs
      orientation={isSmallDevice ? "vertical" : "horizontal"}
      defaultValue="home"
    >
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
      <TabsContent value="home">
        <CampaignTabHome campaign={campaign} />
      </TabsContent>
      <TabsContent value="chat">
        <CampaignTabChat campaign={campaign} />
      </TabsContent>
      <TabsContent value="notes">
        <CampaignTabNotes notes={notes} />
      </TabsContent>
      <TabsContent value="sessions">
        <CampaignTabSessions campaign={campaign} />
      </TabsContent>
      <TabsContent value="docs">TODO: Documents</TabsContent>
      <TabsContent value="npc">TODO: Contacts</TabsContent>
      <TabsContent value="sheet">TODO: Mon personnage</TabsContent>
    </Tabs>
  );
}

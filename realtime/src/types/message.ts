export type MessageFromFrontend = {
  content: string;
  ownerId: string;
  campaignId: string;
};

export type MessageToBackend = MessageFromFrontend & {
  createdAt: string;
};

export type MessageFromBackend = {
  id: string;
  content: string;
  campaign: {
    id: string;
  };
  owner: {
    id: string;
  };
};

export type MessageToFrontend = MessageFromBackend;

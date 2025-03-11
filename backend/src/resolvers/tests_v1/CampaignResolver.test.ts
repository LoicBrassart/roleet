import CampaignResolver from "../CampaignResolver";
import { Campaign } from "../../entities/Campaign";
import { User } from "../../entities/User";
import { In } from "typeorm";
import type AuthContext from "../../types/AuthContext";

jest.mock("../../entities/Campaign");
jest.mock("../../entities/User");

describe("CampaignResolver", () => {
  let resolver: CampaignResolver;
  const mockUser = { id: 1, name: "John Doe" } as User;

  beforeEach(() => {
    resolver = new CampaignResolver();
    jest.clearAllMocks();
  });

  describe("getMyCampaigns", () => {
    it("should return campaigns for the user", async () => {
      const campaignsMock = [{ id: 1, title: "My Campaign" }] as Campaign[];
      (Campaign.find as jest.Mock).mockResolvedValue(campaignsMock);

      const ctx = { user: mockUser } as AuthContext;
      const result = await resolver.getMyCampaigns(ctx);

      expect(result).toEqual(campaignsMock);
      expect(Campaign.find).toHaveBeenCalledWith({
        relations: ["scenarios", "players", "storyteller"],
      });
    });
  });

  describe("getCampaign", () => {
    it("should return a specific campaign", async () => {
      const campaignMock = { id: 1, title: "Epic Quest" } as Campaign;
      (Campaign.findOne as jest.Mock).mockResolvedValue(campaignMock);

      const ctx = { user: mockUser } as AuthContext;
      const result = await resolver.getCampaign(1, ctx);

      expect(result).toEqual(campaignMock);
      expect(Campaign.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ["scenarios", "players", "storyteller"],
      });
    });

    it("should return undefined if campaign not found", async () => {
      const ctx = { user: mockUser } as AuthContext;
      const campaignMock = { id: 1, title: "Epic Quest" } as Campaign;
      (Campaign.findOne as jest.Mock).mockImplementation((args) => {
        if (args.where.id === 1) {
          return Promise.resolve(campaignMock);
        } else {
          return Promise.resolve(null);
        }
      });

      const result = await resolver.getCampaign(99, ctx);
      expect(result).toBeNull();
    });
  });

  describe("createCampaign", () => {
    it("should create and return a campaign", async () => {
      const input = {
        title: "New Campaign",
        bannerUrl: "http://image.url",
        players: [2, 3],
      };

      const playersMock = [
        { id: 2, name: "Alice" },
        { id: 3, name: "Bob" },
      ] as User[];

      const mockUser = { id: 1, name: "John Doe" } as User;
      const ctx = { user: mockUser } as AuthContext;

      let campaignMock;
      campaignMock = {
        id: 1,
        title: "New Campaign",
        bannerUrl: "http://image.url",
        storyteller: mockUser,
        players: playersMock,
        scenarios: [],
        hasId: () => true,
        recover: jest.fn(),
        reload: jest.fn(),
        remove: jest.fn(),
        softRemove: jest.fn(),
        save: jest.fn(),
      } as Campaign;

      (User.findBy as jest.Mock).mockResolvedValue(playersMock);
      (Campaign.create as jest.Mock).mockReturnValue(campaignMock);
      (Campaign.save as jest.Mock).mockResolvedValue(campaignMock);

      const result = await resolver.createCampaign(input, ctx);

      expect(User.findBy).toHaveBeenCalledWith({ id: In(input.players) });
      expect(campaignMock.save).toHaveBeenCalled();
      expect(Campaign.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(campaignMock);
    });

    it("should throw an error if user not authenticated", async () => {
      const input = {
        title: "New Campaign",
        bannerUrl: "http://image.url",
        players: [2, 3],
      };

      const ctx = { user: undefined } as AuthContext;

      await expect(resolver.createCampaign(input, ctx)).rejects.toThrow(
        "Failed to create campaign"
      );
    });
  });
});

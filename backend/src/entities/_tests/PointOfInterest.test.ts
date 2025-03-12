import { PointOfInterest } from "../PointOfInterest";
import { mockPlan } from "./mocks";

describe("PointOfInterest entity", () => {
  it("should instantiate with minimal inputs", () => {
    const poi = new PointOfInterest();
    poi.code = "POI001";
    poi.plan = mockPlan;

    expect(poi.code).toBe("POI001");
    expect(poi.plan).toBe(mockPlan);
    expect(poi.title).toBeUndefined();
    expect(poi.description).toBeUndefined();
  });

  it("should instantiate with full inputs", () => {
    const poi = new PointOfInterest();
    poi.code = "POI001";
    poi.title = "Blacksmith";
    poi.description = "A renowned blacksmith's workshop.";
    poi.plan = mockPlan;

    expect(poi.code).toBe("POI001");
    expect(poi.title).toBe("Blacksmith");
    expect(poi.description).toBe("A renowned blacksmith's workshop.");
    expect(poi.plan).toBe(mockPlan);
  });

  it("should handle relations correctly", () => {
    const poi = new PointOfInterest();
    poi.plan = mockPlan;

    expect(poi.plan.title).toBe(mockPlan.title);
    expect(poi.plan.pictureUrl).toBe(mockPlan.pictureUrl);
  });
});

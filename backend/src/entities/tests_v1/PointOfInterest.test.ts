import { Plan } from "../Plan";
import { PointOfInterest } from "../PointOfInterest";

describe("PointOfInterest entity", () => {
  it("should create an instance with required fields", () => {
    const plan = new Plan();

    const poi = new PointOfInterest();
    poi.code = "POI123";
    poi.title = "Fountain";
    poi.description = "A beautiful fountain in the center of the square.";
    poi.plan = plan;

    expect(poi.code).toBe("POI123");
    expect(poi.title).toBe("Fountain");
    expect(poi.description).toBe(
      "A beautiful fountain in the center of the square."
    );
    expect(poi.plan).toBe(plan);
  });

  it("should handle optional fields when undefined", () => {
    const plan = new Plan();

    const poi = new PointOfInterest();
    poi.code = "POI456";
    poi.plan = plan;

    expect(poi.code).toBe("POI456");
    expect(poi.title).toBeUndefined();
    expect(poi.description).toBeUndefined();
    expect(poi.plan).toBe(plan);
  });
});

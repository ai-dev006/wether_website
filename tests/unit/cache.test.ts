import { isCacheValid } from "../../src/cache";

describe("isCacheValid", () => {
  it("should return true if fetched within 1 hour", () => {
    const now = new Date("2024-01-01T12:00:00Z");
    const fetchedAt = new Date("2024-01-01T11:30:00Z");
    expect(isCacheValid(fetchedAt, now)).toBe(true);
  });

  it("should return true if fetched just now", () => {
    const now = new Date("2024-01-01T12:00:00Z");
    const fetchedAt = new Date("2024-01-01T12:00:00Z");
    expect(isCacheValid(fetchedAt, now)).toBe(true);
  });

  it("should return true if fetched 59 minutes ago", () => {
    const now = new Date("2024-01-01T12:00:00Z");
    const fetchedAt = new Date("2024-01-01T11:01:00Z");
    expect(isCacheValid(fetchedAt, now)).toBe(true);
  });

  it("should return false if fetched exactly 1 hour ago", () => {
    const now = new Date("2024-01-01T12:00:00Z");
    const fetchedAt = new Date("2024-01-01T11:00:00Z");
    expect(isCacheValid(fetchedAt, now)).toBe(false);
  });

  it("should return false if fetched more than 1 hour ago", () => {
    const now = new Date("2024-01-01T12:00:00Z");
    const fetchedAt = new Date("2024-01-01T10:00:00Z");
    expect(isCacheValid(fetchedAt, now)).toBe(false);
  });
});

import { validateCityName } from "../../src/validation";

describe("validateCityName", () => {
  it("should return null for a valid city name", () => {
    expect(validateCityName("Tokyo")).toBeNull();
  });

  it("should return null for city name with spaces", () => {
    expect(validateCityName("New York")).toBeNull();
  });

  it("should return null for city name with hyphens", () => {
    expect(validateCityName("Saint-Denis")).toBeNull();
  });

  it("should return null for city name with apostrophe", () => {
    expect(validateCityName("O'Brien")).toBeNull();
  });

  it("should return error for undefined", () => {
    expect(validateCityName(undefined)).toBe("City name is required");
  });

  it("should return error for empty string", () => {
    expect(validateCityName("")).toBe("City name is required");
  });

  it("should return error for whitespace only", () => {
    expect(validateCityName("   ")).toBe("City name is required");
  });

  it("should return error for string with numbers", () => {
    expect(validateCityName("Tokyo123")).toBe("City name contains invalid characters");
  });

  it("should return error for string with special characters", () => {
    expect(validateCityName("Tokyo@#$")).toBe("City name contains invalid characters");
  });

  it("should return error for very long city name", () => {
    const longName = "a".repeat(101);
    expect(validateCityName(longName)).toBe("City name is too long");
  });
});

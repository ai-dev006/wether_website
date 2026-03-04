import { parseWeatherResponse, OpenWeatherMapResponse } from "../../src/weatherParser";

describe("parseWeatherResponse", () => {
  const validResponse: OpenWeatherMapResponse = {
    name: "Tokyo",
    main: {
      temp: 20.5,
      feels_like: 19.8,
      humidity: 65,
    },
    weather: [
      {
        description: "clear sky",
        icon: "01d",
      },
    ],
    wind: {
      speed: 3.5,
    },
  };

  it("should parse a valid response correctly", () => {
    const result = parseWeatherResponse(validResponse);
    expect(result).toEqual({
      city: "Tokyo",
      temperature: 20.5,
      feelsLike: 19.8,
      humidity: 65,
      description: "clear sky",
      windSpeed: 3.5,
      icon: "01d",
    });
  });

  it("should throw on null input", () => {
    expect(() => parseWeatherResponse(null as unknown as OpenWeatherMapResponse)).toThrow(
      "Invalid OpenWeatherMap API response format"
    );
  });

  it("should throw on missing main field", () => {
    const invalid = { ...validResponse, main: undefined } as unknown as OpenWeatherMapResponse;
    expect(() => parseWeatherResponse(invalid)).toThrow(
      "Invalid OpenWeatherMap API response format"
    );
  });

  it("should throw on empty weather array", () => {
    const invalid = { ...validResponse, weather: [] };
    expect(() => parseWeatherResponse(invalid)).toThrow(
      "Invalid OpenWeatherMap API response format"
    );
  });

  it("should throw on missing wind field", () => {
    const invalid = { ...validResponse, wind: undefined } as unknown as OpenWeatherMapResponse;
    expect(() => parseWeatherResponse(invalid)).toThrow(
      "Invalid OpenWeatherMap API response format"
    );
  });
});

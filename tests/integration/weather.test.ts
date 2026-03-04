import request from "supertest";
import app from "../../src/app";
import * as weatherService from "../../src/weatherService";
import { WeatherData } from "../../src/weatherParser";

jest.mock("../../src/weatherService");

const mockedGetWeather = weatherService.getWeather as jest.MockedFunction<
  typeof weatherService.getWeather
>;

const mockWeatherData: WeatherData = {
  city: "Tokyo",
  temperature: 20.5,
  feelsLike: 19.8,
  humidity: 65,
  description: "clear sky",
  windSpeed: 3.5,
  icon: "01d",
};

describe("GET /weather", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return weather data for a valid city", async () => {
    mockedGetWeather.mockResolvedValue(mockWeatherData);

    const res = await request(app).get("/weather").query({ city: "Tokyo" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockWeatherData);
    expect(mockedGetWeather).toHaveBeenCalledWith("Tokyo");
  });

  it("should use cached data on second request for same city", async () => {
    mockedGetWeather.mockResolvedValue(mockWeatherData);

    const res1 = await request(app).get("/weather").query({ city: "Tokyo" });
    expect(res1.status).toBe(200);

    const res2 = await request(app).get("/weather").query({ city: "Tokyo" });
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual(mockWeatherData);

    expect(mockedGetWeather).toHaveBeenCalledTimes(2);
  });

  it("should return 400 for missing city parameter", async () => {
    const res = await request(app).get("/weather");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "City name is required" });
  });

  it("should return 400 for invalid city name", async () => {
    const res = await request(app).get("/weather").query({ city: "123" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "City name contains invalid characters" });
  });

  it("should return 404 when city is not found in external API", async () => {
    const axiosError = {
      isAxiosError: true,
      response: { status: 404 },
    };
    Object.defineProperty(axiosError, "isAxiosError", { value: true });
    mockedGetWeather.mockRejectedValue(axiosError);

    const res = await request(app).get("/weather").query({ city: "Nonexistent" });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "City not found" });
  });

  it("should return 500 on external API error", async () => {
    mockedGetWeather.mockRejectedValue(new Error("API Error"));

    const res = await request(app).get("/weather").query({ city: "Tokyo" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to fetch weather data" });
  });
});

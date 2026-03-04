import axios from "axios";
import { config } from "./config";
import { getPool } from "./db";
import { isCacheValid } from "./cache";
import {
  parseWeatherResponse,
  OpenWeatherMapResponse,
  WeatherData,
} from "./weatherParser";

export async function getWeather(city: string): Promise<WeatherData> {
  const pool = getPool();
  const normalizedCity = city.trim().toLowerCase();

  const cacheResult = await pool.query(
    "SELECT data, fetched_at FROM weather_cache WHERE city = $1",
    [normalizedCity]
  );

  if (cacheResult.rows.length > 0) {
    const row = cacheResult.rows[0];
    const fetchedAt = new Date(row.fetched_at);
    if (isCacheValid(fetchedAt)) {
      return row.data as WeatherData;
    }
  }

  const response = await axios.get<OpenWeatherMapResponse>(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city.trim(),
        appid: config.openWeatherApiKey,
        units: "metric",
      },
    }
  );

  const weatherData = parseWeatherResponse(response.data);

  await pool.query(
    `INSERT INTO weather_cache (city, data, fetched_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (city)
     DO UPDATE SET data = $2, fetched_at = NOW()`,
    [normalizedCity, JSON.stringify(weatherData)]
  );

  return weatherData;
}

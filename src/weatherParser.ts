export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  windSpeed: number;
  icon: string;
}

export interface OpenWeatherMapResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export function parseWeatherResponse(data: OpenWeatherMapResponse): WeatherData {
  if (
    !data ||
    !data.name ||
    !data.main ||
    !Array.isArray(data.weather) ||
    data.weather.length === 0 ||
    !data.wind
  ) {
    throw new Error("Invalid OpenWeatherMap API response format");
  }

  return {
    city: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
  };
}

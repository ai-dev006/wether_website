import express, { Request, Response } from "express";
import axios from "axios";
import { validateCityName } from "./validation";
import { getWeather } from "./weatherService";

const app = express();

app.get("/weather", async (req: Request, res: Response) => {
  const city = req.query.city as string | undefined;

  const validationError = validateCityName(city);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    const weather = await getWeather(city as string);
    res.json(weather);
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      res.status(404).json({ error: "City not found" });
      return;
    }
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default app;

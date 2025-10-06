import axios from "axios";
import "dotenv/config";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city) {
  try {
    const { data } = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        lang: "ru",
        units: "metric",
      },
    });

    return {
      name: data.name,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      weather: data.weather[0].description,
      wind: data.wind.speed,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Город не найден");
    }
    if (error.response?.status === 401) {
      throw new Error("Неверный API ключ");
    }
    throw new Error("Не удалось получить данные о погоде");
  }
}

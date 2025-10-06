import express from "express";
import { getWeather } from "./services/weather.service.js";
import "dotenv/config";

const port = 8000;
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Тестовый маршрут для проверки работы сервера
app.get("/", (req, res) => {
  res.json({ message: "API работает!" });
});

app.get("/api/weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({
      error: "Не указан город в параметре city",
    });
  }

  try {
    const weatherData = await getWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(error.message.includes("не найден") ? 404 : 500).json({
      error: error.message,
    });
  }
});

const server = app.listen(port, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${port}`);
  if (!process.env.WEATHER_API_KEY) {
    console.log("⚠️  Не указан WEATHER_API_KEY в переменных окружения");
  }
});

// Обработка ошибок сервера
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Порт ${port} уже используется. Попробуйте другой порт.`);
  } else {
    console.error("❌ Ошибка сервера:", error);
  }
  process.exit(1);
});

// Обработка необработанных ошибок
process.on("uncaughtException", (error) => {
  console.error("❌ Необработанная ошибка:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ Необработанное отклонение промиса:", error);
  process.exit(1);
});

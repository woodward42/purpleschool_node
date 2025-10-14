import axios from "axios"
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js"

const getWeather = async (city: string) => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token))
  const lang = process.env.LANG ?? (await getKeyValue(TOKEN_DICTIONARY.lang))

  if (!token) {
    throw new Error("Не задан API ключ, задайте его через -t [API_KEY]")
  }

  const { data, request } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: lang,
        units: "metric",
      },
    }
  )
console.log(data)
  return data
}

export { getWeather }

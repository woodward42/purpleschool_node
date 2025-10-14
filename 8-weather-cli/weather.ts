#!/usr/bin/env node
import { getArgs } from "./helpers/args.helpers.js"
import { getWeather } from "./services/api.service.js"
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js"
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storage.service.js"

interface WeatherError {
  status?: number;
  message?: string;
}

const saveToken = async (token: string): Promise<void> => {
  if (!token.length) {
    printError("Не передан токен")
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess("токен сохранен")
  } catch (err) {
    if (err instanceof Error) {
      printError(err.message)
    }
  }
}

const saveCity = async (city: string | string[]): Promise<void> => {
  if (!Array.isArray(city) || !city.length) {
    printError("Не передан город")
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city.join(','))
    printSuccess("город сохранен")
  } catch (err) {
    if (err instanceof Error) {
      printError(err.message)
    }
  }
}

const saveLang = async (lang: string): Promise<void> => {
  if (!lang.length) {
    printError("Не передан язык")
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.lang, lang)
    printSuccess("язык сохранен")
  } catch (err) {
    if (err instanceof Error) {
      printError(err.message)
    }
  }
}

const getForecast = async (): Promise<void> => {
  try {
    const citiesStr = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
    if (!citiesStr) {
      printError("Не указан город")
      return
    }

    const cities = citiesStr.split(',')
    const promises = cities.map((city) => getWeather(city))
    const promisesResults = await Promise.all(promises)
    printWeather(promisesResults)
  } catch (err) {
    const weatherError = err as WeatherError
    if (weatherError?.status === 404) {
      printError("Неверно указан город")
    } else if (weatherError?.status === 401) {
      printError("Неверно указан токен")
    } else {
      printError(weatherError?.message || 'Произошла ошибка')
    }
  }
}

const initCLI = async (): Promise<void> => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelp()
    return
  }
  if (args.s && (typeof args.s === 'string' || Array.isArray(args.s))) {
    await saveCity(args.s)
    return
  }
  if (args.t && typeof args.t === 'string') {
    await saveToken(args.t)
    return
  }
  if (args.l && typeof args.l === 'string') {
    await saveLang(args.l)
    return
  }

  await getForecast()
}

initCLI()
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

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен")
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess("токен сохранен")
  } catch (err) {
    printError(err.message)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город")
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess("город сохранен")
  } catch (err) {
    printError(err.message)
  }
}

const saveLang = async (lang) => {
  if (!lang.length) {
    printError("Не передан язык")
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.lang, lang)
    printSuccess("язык сохранен")
  } catch (err) {
    printError(err.message)
  }
}

const getForecast = async () => {
  try {
    const cities =
      process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))

    // Создаем массив промисов вызовов getWeather для каждого города
    const promises = cities.map((city) => getWeather(city))

    // Ждем завершения всех промисов и получаем массив результатов в том же порядке
    const promisesResults = await Promise.all(promises)

    printWeather(promisesResults)
  } catch (err) {
    if (err?.status == 404) {
      printError("Неверно указан город")
    } else if (err?.status == 401) {
      printError("Неверно указан токен")
    } else {
      printError(err?.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelp()
  }
  if (args.s) {
    return saveCity(args.s)
  }
  if (args.t) {
    return saveToken(args.t)
  }
  if (args.l) {
    return saveLang(args.l)
  }

  getForecast()
}

initCLI()

import { homedir } from "node:os"
import { join } from "node:path"
import { promises } from "node:fs"

const filePath = join(homedir(), "weather-data.json")

const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
  lang: "lang"
} as const

type TokenDictionaryKey = keyof typeof TOKEN_DICTIONARY;
type StorageData = Record<string, string>;

const saveKeyValue = async (key: string, value: string): Promise<void> => {
  let data: StorageData = {}

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath, 'utf8')
    data = JSON.parse(file)
  }

  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}

const getKeyValue = async (key: string): Promise<string | undefined> => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath, 'utf8')
    const data: StorageData = JSON.parse(file)
    return data[key]
  }
  return undefined
}

const isExist = async (path: string): Promise<boolean> => {
  try {
    await promises.stat(path)
    return true
  } catch (err) {
    return false
  }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }
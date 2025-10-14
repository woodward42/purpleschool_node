import chalk from "chalk"
import dedent from "dedent-js"

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const printError = (err: string | Error): void => {
  console.log(chalk.bgRed(" ERROR ") + ` ${err}`)
}

const printSuccess = (msg: string): void => {
  console.log(chalk.bgGreen(" SUCCESS ") + ` ${msg}`)
}

const printHelp = (): void => {
  console.log(
    dedent(`${chalk.bgCyan(" HELP ")}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -t [API_KEY] для установки токена
    -h для вывода помощи    
    `)
  )
}

const printWeather = (results: WeatherData[]): void => {
  results.forEach((res) => {
    console.log(
      dedent(`${chalk.bgYellow(" WEATHER: ")} Погода в городе ${res.name}
    Температура: ${res.main.temp} (ощущается как ${res.main.feels_like}) 
    Влажность: ${res.main.humidity}
    Скорость ветра: ${res.wind.speed}
    //------------------------------------------------

    `)
    )
  })
}

export { printError, printHelp, printSuccess, printWeather }
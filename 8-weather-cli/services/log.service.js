import chalk from "chalk"
import dedent from "dedent-js"

const printError = (err) => {
  console.log(chalk.bgRed(" ERROR ") + ` ${err}`)
}

const printSuccess = (msg) => {
  console.log(chalk.bgGreen(" SUCCESS ") + ` ${msg}`)
}

const printHelp = (err) => {
  console.log(
    dedent(`${chalk.bgCyan(" HELP ")}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -t [API_KEY] для установки токена
    -h для вывода помощи    
    `)
  )
}

const printWeather = (results) => {
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

//переданные аргументы
const args = process.argv.slice(2)
//console.log(args)

//строка, которую парсим
const stringTimeToParse = args[0]

//часы
const hours = +args[0].slice(0, -1)

//минуты
const minutes = +args[1].slice(0, -1)

//секунды
const seconds = +args[2].slice(0, -1)

function toMilliseconds(hours, minutes, seconds) {
  return (hours * 3600 + minutes * 60 + seconds) * 1000
}

// Пример использования:
const delay = toMilliseconds(hours, minutes, seconds) // 1 час, 30 минут, 15 секунд
setTimeout(() => {
  console.log("ITS TIME")
}, delay)

//переданные аргументы
const args = process.argv.slice(2);
    //console.log(args)

//часы
const hours = +args[0];

//минуты
const minutes = +args[1];

//секунды
const seconds = args[2];


function toMilliseconds(hours, minutes, seconds) {
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

// Пример использования:
const delay = toMilliseconds(hours, minutes, seconds); // 1 час, 30 минут, 15 секунд
setTimeout(() => {
  console.log('ITS TIME');
}, delay);

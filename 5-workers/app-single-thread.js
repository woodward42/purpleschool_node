//генерим массив
const array = Array.from({ length: 300000 }, (_, i) => i + 1)

//счетчик
let divBy3Count = 0

//начало замера
performance.mark("start")

for (let i = 0; i < array.length; i++) {
  if (array[i] % 3 == 0) {
    divBy3Count++
  }
}

console.log(`divBy3Count: ${divBy3Count}`)

//конец замера
performance.mark("end")

//измерение
performance.measure("divBy3Count_result", "start", "end")

console.log(performance.getEntriesByName("divBy3Count_result"))

/*
PerformanceMeasure {
    name: 'divBy3Count_result',
    entryType: 'measure',
    startTime: 30.5156,
    duration: 7.9472999999999985,
    detail: null
  }
*/

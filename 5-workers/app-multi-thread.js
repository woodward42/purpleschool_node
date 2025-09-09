const { Worker } = require("worker_threads")

//счетчик
let divBy3Count = 0

//генерим массив
const array = Array.from({ length: 300000 }, (_, i) => i + 1)

//число ядер
const numCores = 8

//массив массивов
const arraySplit = Array.from({ length: numCores }, (_, i) =>
  array.slice(
    i * Math.ceil(array.length / numCores),
    (i + 1) * Math.ceil(array.length / numCores)
  )
)

//функция вычисления в воркере
const computeInWorker = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./app-multi-thread-worker.js", {
      workerData: {
        array,
      },
    })

    worker.on("message", (msg) => {
      resolve(msg)
    })

    worker.on("error", (msg) => {
      reject(msg)
    })

    //worker.on("exit", () => console.log(`worker завершил работу`))
  })
}

//main функция
const main = async () => {
  performance.mark("start")

  try {
    const results = await Promise.all(
      arraySplit.map((arr) => computeInWorker(arr))
    )

    //сумма
    divBy3Count = results.reduce((acc, current) => acc + current, 0)
    console.log(`divBy3Count: ${divBy3Count}`)
  } catch (err) {
    console.error(err)
  }

  performance.mark("end")
  performance.measure("divBy3Count_result", "start", "end")

  console.log(performance.getEntriesByName("divBy3Count_result"))
}

main()

/*
  PerformanceMeasure {
    name: 'divBy3Count_result',
    entryType: 'measure',
    startTime: 34.0049,
    duration: 58.6167,
    detail: null
  }
*/

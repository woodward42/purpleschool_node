const { parentPort, workerData } = require("worker_threads")


const getDivBy3CountInWorker = ({ array }) => {
  let count = 0

  for (let i = 0; i < array.length; i++) {
    if (array[i] % 3 == 0) {
      count++
    }
  }

  return count
}

parentPort.postMessage(getDivBy3CountInWorker(workerData))

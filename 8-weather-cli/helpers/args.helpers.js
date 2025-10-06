const getArgs = (args) => {
  const res = {}
  const [ex, file, ...rest] = args

  rest.forEach((val, idx, arr) => {
    if (val.toString().startsWith("-")) {
      const key = val.substring(1)
      if (idx === arr.length - 1) {
        res[key] = true
      } else if (!arr[idx + 1].toString().startsWith("-")) {
        let value = arr[idx + 1]
        if (key === "s" && typeof value === "string") {
          // Разбиваем по запятым, убираем пробелы, фильтруем пустое
          value = value
            .split(",")
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
        }

        // Всегда чтобы значение для s было массивом
        if (key === "s") {
          value = Array.isArray(value) ? value : [value]
        }

        res[key] = value
      } else {
        res[key] = true
      }
    }
  })

  return res
}

export { getArgs }

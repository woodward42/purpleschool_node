// Определяем интерфейс для результата
interface Arguments {
  [key: string]: boolean | string | string[];
}

// Типизируем основную функцию
const getArgs = (args: string[]): Arguments => {
  const res: Arguments = {};
  const [ex, file, ...rest] = args;

  rest.forEach((val: string, idx: number, arr: string[]) => {
    if (val.toString().startsWith("-")) {
      const key: string = val.substring(1);

      if (idx === arr.length - 1) {
        res[key] = true;
      } else if (idx + 1 < arr.length && !arr[idx + 1].toString().startsWith("-")) {
        let value: string | string[] = arr[idx + 1];

        if (key === "s" && typeof value === "string") {
          value = value
            .split(",")
            .map((v: string) => v.trim())
            .filter((v: string) => v.length > 0);
        }

        // Всегда чтобы значение для s было массивом
        if (key === "s") {
          value = Array.isArray(value) ? value : [value];
        }

        res[key] = value;
      } else {
        res[key] = true;
      }
    }
  });

  return res;
};

export { getArgs };

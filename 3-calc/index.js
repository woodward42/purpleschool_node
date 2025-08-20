import { add } from "./add.js";
import { multiply } from "./multiply.js";

//переданные аргументы
const args = process.argv.slice(2);

//первое число
const firstNum = +args[0];

//второе число
const secondNum = +args[1];

//операция
const operation = args[2];

//результат
let result = 0;

switch (operation) {
  case "add":
    result = add(firstNum, secondNum);
    break;

  case "multiply":
    result = multiply(firstNum, secondNum);
    break;

  default:
    console.log("no such operation");
}

console.log(result);

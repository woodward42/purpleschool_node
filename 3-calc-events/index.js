import { EventEmitter } from 'events';
const emitter = new EventEmitter();

emitter.on("result", (res) => {
  console.log("ИТОГ", res);
});

emitter.on("add", (a, b) => {
  emitter.emit("result", firstNum + secondNum);
});

emitter.on("multiply", (a, b) => {
  emitter.emit("result", firstNum * secondNum);
});

//переданные аргументы
const args = process.argv.slice(2);

//первое число
const firstNum = +args[0];

//второе число
const secondNum = +args[1];

//операция
const operation = args[2];

switch (operation) {
  case "add":
    emitter.emit("add", firstNum, secondNum);
    break;

  case "multiply":
    emitter.emit("multiply", firstNum, secondNum);
    break;

  default:
    console.log("no such operation!");
}

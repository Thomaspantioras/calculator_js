import { sum, multiply, subtract, divide } from "./calcOperations.js";

let currentNum = 0;
let firstNumber;
let action = null;
const screen = document.querySelector("section.screen");
const buttons = document.querySelectorAll("button");

const getCurrentScreenValue = () => screen.textContent;

const getCalculationResult = (num1, num2) => {
  return action === "÷"
    ? divide(num1, num2)
    : action === "×"
    ? multiply(num1, num2)
    : action === "-"
    ? subtract(num1, num2)
    : action === "+"
    ? sum(num1, num2)
    : currentNum;
};
const includePreviousCalculation = (num1, num2) => {
  return getCalculationResult(num1, num2);
};

const addListenerToNumeralBtn = (button, value) => {
  button.addEventListener("click", () => {
    screen.innerHTML =
      getCurrentScreenValue() === "0" ? value : getCurrentScreenValue() + value;
    currentNum = parseInt(getCurrentScreenValue(), 10);
  });
};

const addListenerToActionBtn = (button, value) => {
  button.addEventListener("click", () => {
    let secondNumber;
    if (action !== null) {
      secondNumber = currentNum;
      firstNumber = includePreviousCalculation(firstNumber, secondNumber);
      currentNum = 0;
    } else {
      firstNumber = currentNum;
      currentNum = 0;
    }
    action = value;
    screen.innerHTML = 0;
  });
};

buttons.forEach(button => {
  switch (button.textContent) {
    case "C":
      button.addEventListener("click", () => {
        screen.innerHTML = currentNum = firstNumber = 0;
      });
      break;
    case "←":
      button.addEventListener("click", () => {
        screen.innerHTML =
          getCurrentScreenValue().length === 1
            ? 0
            : getCurrentScreenValue().substring(
                0,
                getCurrentScreenValue().length - 1
              );
        currentNum = parseInt(getCurrentScreenValue(), 10);
      });
      break;
    case "=":
      button.addEventListener("click", () => {
        screen.innerHTML = currentNum = getCalculationResult(
          firstNumber,
          currentNum
        );
        action = null;
      });
      break;
    case "÷":
    case "×":
    case "-":
    case "+":
      addListenerToActionBtn(button, button.textContent);
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      addListenerToNumeralBtn(button, button.textContent);
      break;
    default:
      console.log("error - unknown btn clicked");
  }
});

export { action, buttons, getCalculationResult };

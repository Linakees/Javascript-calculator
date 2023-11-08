const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  function updateDisplay(){
    const display = document.querySelector("#answer");
    display.value=calculator.displayValue;
  }
  updateDisplay();

const keys = document.querySelector(".calculator");

keys.addEventListener("click", (event) => {
    const { target } = event;
    console.log("classList", target.classList)
    if(target.classList.contains("number")){
        updateScreen(target.innerHTML);
        updateDisplay();
        return;
    } if(target.classList.contains("operation")){
        handleOperator(target.innerHTML);
        updateDisplay();
        return;
    }
    if (target.classList.contains("ceButton")){
        resetCalculator();
        updateDisplay();
    }
    if (target.classList.contains("dot")){
        inputDecimal(target.innerHTML);
        updateDisplay();
    }
    if(target.classList.contains("cButton")){
      toDelete();
      updateDisplay();
    }
    if(target.classList.contains("percent")){
      percent();
      updateDisplay();
    }
  });

  function updateScreen(digit){
    const {displayValue, waitingForSecondOperand} = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else if (calculator.displayValue === '0'){
        calculator.displayValue = digit;
    } else {
        calculator.displayValue = displayValue + digit;
    }
    console.log(calculator);
  }

  function inputDecimal (dot){
    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
      calculator.waitingForSecondOperand = false;
      return;
    }
  }

  function handleOperator (nextOperator){
    const { firstOperand, displayValue, operator } = calculator;
    console.log({ firstOperand, displayValue, operator })
    const inputValue = parseFloat(displayValue);
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
      }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
      } else if (operator){
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
      }
      calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
        console.log(calculator);
  }

  function calculate (firstOperand, secondOperand, operator){
    if (operator === "+"){
        return firstOperand + secondOperand;
    } else if (operator === "-"){
        return firstOperand - secondOperand;
    } else if (operator === "X"){
        return firstOperand * secondOperand;
    } else if (operator === "/"){
        return firstOperand / secondOperand;
    }
    return secondOperand;
  }

function resetCalculator (){
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function toDelete(){
  const {displayValue} = calculator;
  if (calculator.displayValue.length > 1){
    calculator.displayValue = displayValue.slice(0, -1);
  }
  else if (calculator.displayValue.length=1) {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
} 

function percent (){
  const {displayValue} = calculator;
  calculator.displayValue = displayValue * 0.01;
}

document.addEventListener("keydown", something);

function something (event){
  event.preventDefault();
  event.stopPropagation();
  press (event.key);
}

function press (currentKey){
  var activeButton = document.getElementById(currentKey);
  console.log(activeButton);
  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);

  if (activeButton.classList.contains("number")){
        updateScreen(activeButton.innerHTML);
        updateDisplay();
        return;
  }
  if(activeButton.classList.contains("operation")){
    handleOperator(activeButton.innerHTML);
    updateDisplay();
   return;
}
  if(activeButton.classList.contains("cButton")){
    toDelete();
    updateDisplay();
  }

}

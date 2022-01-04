//Get elements from the DOM;
const evaluationEl = document.getElementById('evaluation'),
  sumEl = document.getElementById('sum'),
  operatorsEl = document.querySelectorAll('.operator'),
  equalEl = document.querySelector('.equal'),
  decimalEL = document.querySelector('.decimal'),
  plusMinusEl = document.querySelector('.plus-minus'),
  numbersKeyEl = document.querySelectorAll('.number-key'),
  clearBtn = document.querySelector('.clear');

//Storing left && right operand
let leftOperand = '',
  rightOperand = '';

//Storing operator sign
let operatorStore;

//Storing sum value
let result;

let index = -1;

function checkResult() {
  if (result) {
    if (result == Infinity) return divisionHandler();
    leftOperand = result;
    sumEl.innerHTML = result;
    evaluationEl.value = leftOperand + operatorStore;
    rightOperand = '';
  }
}

//Event Listeners
function eventListeners() {
  //Loop over key-numbers
  numbersKeyEl.forEach(numberKey => {
    numberKey.addEventListener('click', keyNumbersHandler);
  });
  //Loop over operators
  operatorsEl.forEach(operator => {
    operator.addEventListener('click', operatorHandler);
  });

  //Equal eventHandler
  equalEl.addEventListener('click', equalHandler);

  //Decimal eventHandler
  decimalEL.addEventListener('click', decimalHandler);

  //DOM loaded focus on input
  window.addEventListener('DOMContentLoaded', () => {
    evaluationEl.focus();
    evaluationEl.value = '';
    sumEl.innerHTML = '';
  });

  //Clear input and all variables
  clearBtn.addEventListener('click', () => {
    evaluationEl.value = '';
    leftOperand = '';
    rightOperand = '';
    operatorStore = '';
    result = '';
    sumEl.innerHTML = '';
  });
}

eventListeners();

//Calculate function
function calculate() {
  const toNumberLeftOperand = Number(leftOperand);
  const toNumberRightOperand = Number(rightOperand);

  switch (operatorStore) {
    case '+':
      return (result = toNumberLeftOperand + toNumberRightOperand);
      break;
    case '×':
      return (result = toNumberLeftOperand * toNumberRightOperand);
      break;
    case '-':
      return (result = toNumberLeftOperand - toNumberRightOperand);
      break;
    case '÷':
      return (result = toNumberLeftOperand / toNumberRightOperand);
      break;
  }
}

//Number event handler
function keyNumbersHandler(e) {
  //Check operatorStore value
  if (!operatorStore) {
    leftOperand += e.target.innerText;
    evaluationEl.value += e.target.innerText;
  } else {
    rightOperand += e.target.innerText;
    evaluationEl.value += e.target.innerText;
  }

  index = -1;
  calculate();
}

//Operator event handler
function operatorHandler(e) {
  index++;
  if (leftOperand && index === 0) {
    operatorStore = e.target.innerText;
    evaluationEl.value += operatorStore;
  }

  checkResult();
}

//Equal handler
function equalHandler() {
  evaluationEl.value = result + operatorStore;
  checkResult();
  result ? (sumEl.innerHTML = result) : (sumEl.innerHTML = '');
  divisionHandler();
}

function divisionHandler() {
  if (rightOperand === '0' && operatorStore === '÷') {
    sumEl.innerHTML = 'Cannot divide by zero';
  }
}

//Decimal handler
function decimalHandler(e) { 
    if (!operatorStore && leftOperand.indexOf('.') < 0) {
    leftOperand += '.';
    evaluationEl.value += '.';
  } else if (operatorStore && rightOperand.indexOf('.') < 0) {
    rightOperand += '.';
    evaluationEl.value += '.';
  }

}

//Get elements from the DOM;
const evaluationEl = document.getElementById('evaluation'),
  sumEl = document.getElementById('sum'),
  operatorsEl = document.querySelectorAll('.operator'),
  equalEl = document.querySelector('.equal'),
  dotEL = document.querySelector('.dot'),
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

  //PlusMinus eventHandler
  plusMinusEl.addEventListener('click', plusMinusHandler);

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
    index = -1;
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
    leftOperand += e.target.textContent;
    evaluationEl.value += e.target.textContent;
  } else {
    rightOperand += e.target.textContent;
    evaluationEl.value += e.target.textContent;
  }

  calculate();
}

//Operator event handler
function operatorHandler(e) {
  if (leftOperand) {
    operatorStore = e.target.textContent;
    evaluationEl.value = leftOperand + operatorStore;
  }

  if (result) {
    if (result == Infinity) return divisionHandler();
    sumEl.innerHTML = result;
    leftOperand = result;
    evaluationEl.value = leftOperand + operatorStore;
    rightOperand = '';
  }
}

//Equal handler
function equalHandler() {
  result ? (sumEl.innerHTML = result) : (sumEl.innerHTML = '');
  divisionHandler();
}

function divisionHandler() {
  if (rightOperand === '0' && operatorStore === '÷') {
    sumEl.innerHTML = 'Cannot divide by zero';
  }
}

function plusMinusHandler() {
  if (leftOperand && !operatorStore) {
    leftOperand = '-'.concat(leftOperand);
  } else if (rightOperand && operatorStore) {
    rightOperand = '-'.concat(rightOperand);
  }

}

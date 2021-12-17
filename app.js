//Get elements from the DOM;
const evaluationEl = document.getElementById('evaluation'),
  sumEl = document.getElementById('sum'),
  operatorsEl = document.querySelectorAll('.operator'),
  numbersKeyEl = document.querySelectorAll('.number-key'),
  clearBtn = document.querySelector('button[data-clear=AC]');

//Storing left && right operand
let leftOperand = '',
  rightOperand = '';

//Storing operator sign
let operatorStore;

//Storing sum value
let result;

//EventListeners
const keyNumbersHandler = e => {
  //Check operatorStore value
  if (!operatorStore) {
    leftOperand += e.target.textContent;
  } else {
    rightOperand += e.target.textContent;
  }

  leftOperand
    ? (evaluationEl.value = leftOperand)
    : rightOperand
    ? (evaluationEl.value = rightOperand)
    : null;

  calculate();
};

//Calculate function
function calculate() {
  //Convert from string to number
  const toNumberLeftOperand = Number(leftOperand);
  const toNumberRightOperand = Number(rightOperand);

  switch (operatorStore) {
    case '+':
      return (result = toNumberLeftOperand + toNumberRightOperand);
      break;
    case 'x':
      return (result = toNumberLeftOperand * toNumberRightOperand);
      break;
    case '-':
      return (result = toNumberLeftOperand - toNumberRightOperand);
      break;
    case '÷':
      return (result = toNumberLeftOperand / toNumberRightOperand);
      break;
    case '%':
      return (result = toNumberLeftOperand % toNumberRightOperand);
      break;
    default:
      break;
  }
}

function equalHandler() {
  if (operatorStore === '=') {
    evaluationEl.value = '';
  }
}

const operatorHandler = e => {
  if (leftOperand) {
    operatorStore = e.target.textContent;
    evaluationEl.value = operatorStore;
  }

  if (result) {
    sumEl.innerHTML = result;
    leftOperand = result;
    rightOperand = '';
  }

  equalHandler();
};

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

// calculator func
calculator();

function calculator() {
  //Loop over key-numbers
  numbersKeyEl.forEach(numberKey => {
    numberKey.addEventListener('click', keyNumbersHandler);
  });
  //Loop over operators
  operatorsEl.forEach(operator => {
    operator.addEventListener('click', operatorHandler);
  });
}

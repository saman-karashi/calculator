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

//Storing sum
let result=''

//EventListeners
const keyNumbersHandler = e => {
  //Check operatorStore value
  if (!operatorStore) {
    leftOperand += e.target.textContent;
    evaluationEl.value = `${leftOperand}`;
  } else {
    rightOperand += e.target.textContent;
    evaluationEl.value += `${rightOperand}`;
  }

  calculate();
};

const operatorHandler = e => {
  if (leftOperand) {
    operatorStore = e.target.textContent;
    evaluationEl.value += operatorStore;
}

};

//Calculate function
function calculate() {
  //Convert from string to number
  const toNumberLeftOperand = Number(leftOperand);
  const toNumberRightOperand = Number(rightOperand);

  switch (operatorStore) {
    case '+':
      return toNumberLeftOperand + toNumberRightOperand;
      break;
    case 'x':
        return toNumberLeftOperand * toNumberRightOperand;
    default:
      break;
  }
console.log(leftOperand)
}

//DOM loaded focus on input
window.addEventListener('DOMContentLoaded', () => {
  evaluationEl.focus();
  evaluationEl.value = '';
});

//Clear input and all variables
clearBtn.addEventListener('click', () => {
  evaluationEl.value = '';
  leftOperand = '';
  rightOperand = '';
  operatorStore = '';
  result=''
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

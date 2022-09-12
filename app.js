// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time

// Scroll

// Get Random Number up to a max number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  };
  shuffle(equationsArray);
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsArray.forEach((i) => {
    const item = document.createElement('div');
    item.classList.add('item');
    itemContainer.append(item);
    const itemText = document.createElement('h1');
    item.append(itemText);
    itemText.textContent = i.value;
  })

  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

//Function to get the value from the selected radio button
function getRadioValue() {
    let radioValue;
    radioInputs.forEach((radioInput) => {
        if(radioInput.checked) {
            radioValue = radioInput.value;
        }
    });
    return radioValue;
}

//Function to start the countdown and populate it
function startCountdown(seconds) {
    let counter = seconds;  
    const interval = setInterval(() => {
      countdown.textContent = counter;
      counter--;
      if (counter < 0 ) {
        clearInterval(interval);
        countdown.textContent = "Go!";
        setTimeout(() => showGamePage(), 1000)
      }
    }, 1000);
  };

//Navigate from Splash page to show countdown page;
function showCountdown() {
    splashPage.hidden = true;
    countdownPage.hidden = false;
    startCountdown(3);
}

//Navigate to Game page
function showGamePage() {
    countdownPage.hidden = true;
    gamePage.hidden = false;
    populateGamePage();
}

//Form that decides amount of questions
function selectQuestionAmount(e) {
    e.preventDefault();
    questionAmount = getRadioValue();
    if(questionAmount) {
        showCountdown();
    } else {
        console.log("Error");
    }
}

//Event listeners
startForm.addEventListener('click', () => {
    radioContainers.forEach((radioEl) => {
        //Remove Selected label styling
        radioEl.classList.remove('selected');
        //Add it back if the radio element selected
        if (radioEl.children[1].checked) {
            radioEl.classList.add('selected');
        }
    })
});

startForm.addEventListener('submit', selectQuestionAmount);
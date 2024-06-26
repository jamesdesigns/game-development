const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
const character = document.getElementById("character");
const coins = document.querySelectorAll(".coin");

let currentIndex = 76
const width = 9
let timerId
let outcomeTimerId 
let currentTime = 30
let score = 0

function moveCharacter(e) {
  squares[currentIndex].classList.remove('character')

  switch(e.key) {
    case 'ArrowLeft' : 
      if (currentIndex % width !== 0) currentIndex -= 1
      break
    case 'ArrowRight' : 
      if (currentIndex % width < width -1) currentIndex += 1
      break
    case 'ArrowUp' : 
      if (currentIndex - width >= 0) currentIndex-= width
      break  
    case 'ArrowDown' : 
      if (currentIndex + width < width * width) currentIndex += width
      break       
  }
  squares[currentIndex].classList.add('character')
}



function autoMoveElements() {
  currentTime--
  timeLeftDisplay.textContent = currentTime
  logsLeft.forEach(logLeft => moveLogLeft(logLeft))
  logsRight.forEach(logRight => moveLogRight(logRight))
  carsLeft.forEach(carLeft => moveCarLeft(carLeft))
  carsRight.forEach(carRight => moveCarRight(carRight))
}

function checkOutComes() {
  lose()
  win()
}

// Update the displayed score
function updateScore() {
  let score = 0;
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = "Score: " + score;
  console.log(score);
}

// Example function to increase the score
function increaseScore(points) {
  let score = 0;
  score += points;
  updateScore();
  console.log(score);
}


function moveLogLeft(logLeft) {
  switch(true) {
    case logLeft.classList.contains('l1') :
          logLeft.classList.remove('l1')
          logLeft.classList.add('l2')
          break
    case logLeft.classList.contains('l2') :
          logLeft.classList.remove('l2')
          logLeft.classList.add('l3')
          break
    case logLeft.classList.contains('l3') :
          logLeft.classList.remove('l3')
          logLeft.classList.add('l4')
          break
    case logLeft.classList.contains('l4') :
          logLeft.classList.remove('l4')
          logLeft.classList.add('l5')
          break
    case logLeft.classList.contains('l5') :
          logLeft.classList.remove('l5')
          logLeft.classList.add('l1')
          break
  }
}

function moveLogRight(logRight) {
  switch(true) {
    case logRight.classList.contains('l1') :
          logRight.classList.remove('l1')
          logRight.classList.add('l5')
          break
    case logRight.classList.contains('l2') :
          logRight.classList.remove('l2')
          logRight.classList.add('l1')
          break
    case logRight.classList.contains('l3') :
          logRight.classList.remove('l3')
          logRight.classList.add('l2')
          break
    case logRight.classList.contains('l4') :
          logRight.classList.remove('l4')
          logRight.classList.add('l3')
          break
    case logRight.classList.contains('l5') :
          logRight.classList.remove('l5')
          logRight.classList.add('l4')
          break
  }
}

function moveCarLeft(carLeft) {
  switch(true) {
    case carLeft.classList.contains('c1') :
      carLeft.classList.remove('c1')
      carLeft.classList.add('c2')
          break
    case carLeft.classList.contains('c2') :
      carLeft.classList.remove('c2')
      carLeft.classList.add('c3')
          break
    case carLeft.classList.contains('c3') :
      carLeft.classList.remove('c3')
      carLeft.classList.add('c1')
          break
  }
}

function moveCarRight(carRight) {
  switch(true) {
    case carRight.classList.contains('c1') :
      carRight.classList.remove('c1')
      carRight.classList.add('c3')
          break
    case carRight.classList.contains('c2') :
      carRight.classList.remove('c2')
      carRight.classList.add('c1')
          break
    case carRight.classList.contains('c3') :
      carRight.classList.remove('c3')
      carRight.classList.add('c2')
          break
  }
}

function lose() {
  if(
    squares[currentIndex].classList.contains('c1') ||
    squares[currentIndex].classList.contains('l4') ||
    squares[currentIndex].classList.contains('l5') ||
    currentTime <= 0
    ) {

      const explosion = document.getElementById('explosion');
      explosion.style.display = 'block';
      explosion.setAttribute('id', 'explosion'); // Append an id of explosion 
      setTimeout(function() {
        explosion.style.backgroundImage = 'url("images/explode.gif")';
      }, 500);

    resultDisplay.textContent = 'You Lose!'
    clearInterval(timerId)
    clearInterval(outcomeTimerId)
    squares[currentIndex].classList.remove('character')
    document.removeEventListener('keyup', moveCharacter)
    checkCollisions()
  }
}

function win() {
  if (squares[currentIndex].classList.contains('ending-block')
  ) {
    resultDisplay.textContent = 'You Win!'
    clearInterval(timerId)
    clearInterval(outcomeTimerId)
    document.removeEventListener('keyup', moveCharacter)
    increaseScore(score)
  }
}

startPauseButton.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId)
    clearInterval(outcomeTimerId)
    outcomeTimerId = null
    timerId = null
    document.removeEventListener('keyup', moveCharacter);
  } else {
    timerId = setInterval(autoMoveElements, 1000)
    outcomeTimerId = setInterval(checkOutComes, 50)
    document.addEventListener('keyup', moveCharacter);
  }
})

// Check for collisions with coins and update score
function checkCollisions() {
  characterRect = character.getBoundingClientRect();

  coins.forEach((coin) => {
    coinRect = coin.getBoundingClientRect();

    if (
      characterRect.left < coinRect.right &&
      characterRect.right > coinRect.left &&
      characterRect.top < coinRect.bottom &&
      characterRect.bottom > coinRect.top
    ) {
      // Frog collided with a coin
      coin.style.display = "none"; // Remove the collected coin
      score += 10; // Increase the score
      updateScore(); // Update the displayed score
    }
  });
}




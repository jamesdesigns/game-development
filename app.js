const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');

let currentIndex = 76;
const width = 9;

function moveCharacter(e) {
  squares[currentIndex].classList.remove('character')

  switch(e.key) {
    case 'ArrowLeft' : 
      currentIndex =- 1
      break
    case 'ArrowRight' : 
      currentIndex += 1
      break
    case 'ArrowUp' : 
      currentIndex -= width
      break  
    case 'ArrowDown' : 
      currentIndex += width
      break       
  }
  squares[currentIndex].classList.add('character')
}

document.addEventListener('keyup', moveCharacter);
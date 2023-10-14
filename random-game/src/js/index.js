import { controlAudio, playAudio } from './audio.js';
import { getRandomNumber } from './helper.js';
// import { moveCatcherLeft, moveCatcherRight,  } from './control_move.js';

const btnRestart = document.querySelector('.restart');
const buttonPlay = document.querySelector('.button__play-game');
const buttonVolume = document.querySelector('.btn-sound-volume');
const buttonCloseScore = document.querySelector('.close-score');
const canvas = document.querySelector('.canvas');
const catcher = document.querySelector('.catcher');
const scoreList = document.querySelectorAll('li');
const catcherCenter =
  parseInt(window.getComputedStyle(canvas).getPropertyValue('width')) / 2 -
  parseInt(window.getComputedStyle(catcher).getPropertyValue('width')) / 2;
const catcherBottom = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('bottom'),
);
const dialogGameOver = document.querySelector('.modal-game-over');
const dialogHello = document.querySelector('.modal-hello');
const dialogScore = document.querySelector('.dialog-score');
const openScoreList = document.querySelectorAll('.top-score')
const gameWidth =
  parseInt(window.getComputedStyle(canvas).getPropertyValue('width')) -
  parseInt(window.getComputedStyle(canvas).getPropertyValue('border-width')) *
    3;
const gameHeight = parseInt(
  window.getComputedStyle(canvas).getPropertyValue('height'),
);
const hpImages = document.querySelectorAll('.hp');
const fallingObjects = document.querySelector('.falling-objects');
const scorePoint = document.querySelector('.score-points');
const scorePointFinally = document.querySelector('.score-points-finally');

let catcherLeft = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('left'),
);
let hp = 3;
let score = 0;

// const arr = new Array(10);
let scoreStatistic = JSON.parse(localStorage.getItem('assavr-scoreStatistic')) ?? [];
updateScoreTable(scoreList, scoreStatistic);



function startGame() {
  hp = 3;
  score = 0;
  scorePoint.innerText = `${score}`;
  for (let hp of hpImages) {
    hp.style.opacity = 1;
  }
  fallingObjects.innerHTML = '';
  catcher.style.left = catcherCenter + 'px';
  dialogHello.classList.remove('open');
  dialogGameOver.classList.remove('open');
  setTimeout(() => dialogHello.close(), 500);
  setTimeout(() => dialogGameOver.close(), 500);
  startGameLoop();
  playAudio('background audio');
  document.addEventListener('keydown', control);
}

function endGame() {
  scorePointFinally.innerText = `${score}`;
  console.log(`${Date.now()}endGame`)
  addResultToScore(score);
  controlAudio('game over');
  dialogGameOver.show();
  dialogGameOver.classList.add('open');
  document.removeEventListener('keydown', control);
}




function moveCatcherLeft() {
  if (catcherLeft > 0) {
    catcherLeft -= 20;
    catcher.style.left = catcherLeft + 'px';
  }
}

function moveCatcherRight() {
  if (catcherLeft < 670) {
    catcherLeft += 20;
    catcher.style.left = catcherLeft + 'px';
  }
}

function control(event) {
  if (event.key === 'ArrowLeft' || event.code === 'KeyA') {
    // moveCatcherLeft(catcher, catcherLeft);
    moveCatcherLeft();
  }
  if (event.key === 'ArrowRight' || event.code === 'KeyD') {
    // moveCatcherRight(catcher, catcherLeft);
    moveCatcherRight();
  }
}

function generateObject(objType /* leaf or drop */) {
  const elem = document.createElement('div');
  const x = getRandomNumber(gameWidth);
  const y = gameHeight;

  elem.classList.add(objType);
  fallingObjects.appendChild(elem);

  return {
    x,
    y,
    elem,
    objType,
    isActive: true,
  };
}

function startGameLoop() {
  const generatedObjects = [generateObject('leaf'), generateObject('drop')];

  function fallDownObjects() {
    const objParams = {
      leaf: {
        velocity: 5,
        catcherOffsetLeft: 40,
        catcherOffsetRight: 40,
        catchSound: 'catch leaf',
      },
      drop: {
        velocity: 10,
        catcherOffsetLeft: 40,
        catcherOffsetRight: 40,
        catchSound: 'catch drop',
      },
    };

    for (const obj of generatedObjects) {
      if (!obj.isActive) {
        continue;
      }

      if (
        obj.y < catcherBottom + 80 &&
        obj.y > catcherBottom &&
        obj.x > catcherLeft - objParams[obj.objType].catcherOffsetLeft &&
        obj.x < catcherLeft + objParams[obj.objType].catcherOffsetRight
      ) {
        controlAudio(objParams[obj.objType].catchSound);
        obj.elem.style.opacity = 0;
        obj.isActive = false;

        if (obj.objType === 'leaf') {
          score++;
          scorePoint.innerText = `${score}`;
        } else if (obj.objType === 'drop') {
          hp--;
          hpImages[hp].style.opacity = 0;
        }
      }

      if (obj.y < catcherBottom) {
        obj.isActive = false;

        if (obj.objType === 'leaf') {
          hp--;
          hpImages[hp].style.opacity = 0;
        } else if (obj.objType === 'drop') {
          obj.elem.style.opacity = 0;
        }
      }

      if (hp === 0) {
        clearInterval(fallIntervalId);
        clearInterval(generateLeafId);
        clearInterval(generateDropId);
        break;
      }

      obj.y -= objParams[obj.objType].velocity;
      obj.elem.style.bottom = `${obj.y}px`;
      obj.elem.style.left = `${obj.x}px`;
    }
    if (hp === 0) {
      endGame();
    }

  }


  const generateLeafId = setInterval(() => {
    generatedObjects.push(generateObject('leaf'));
  }, 2000);
  const generateDropId = setInterval(() => {
    generatedObjects.push(generateObject('drop'));
  }, 1000);
  const fallIntervalId = setInterval(fallDownObjects, 20);
}

buttonPlay.addEventListener('click', startGame);

document.onkeydown = function startPlay(event) {
  if (event.code === 'Space') {
    startGame();
  }
};


// SCORE STATISTIC START
function sortArray(array) {
  return array.sort(function(a,b) {
    return b - a;
  })
}

function updateScoreTable(arrayHtml, arrayStore) {
  for (let i = 0; i < arrayStore.length; i++) {
    arrayHtml[i].innerText = `${arrayStore[i]}`
  }
}

function addResultToScore(result) {
  console.log('assavr', result);
  scoreStatistic.push(result)
  sortArray(scoreStatistic);
  scoreStatistic = scoreStatistic.slice(0, 10);
  localStorage.setItem('assavr-scoreStatistic', JSON.stringify(scoreStatistic));
  updateScoreTable(scoreList, scoreStatistic);
}




// localStorage.setItem('assavr-scoreStatistic', JSON.stringify(scoreStatistic));
// const statParseFromStorage = JSON.parse(localStorage.getItem('assavr-scoreStatistic'));

// sortArray(scoreStatistic);
// showScore(scoreList, scoreStatistic);

// SCORE STATISTIC END

buttonVolume.addEventListener('click', () => controlAudio('background audio'));

btnRestart.addEventListener('click', startGame);

openScoreList.forEach((elem) => {
  elem.addEventListener('click', () => {
    dialogScore.show();
    dialogScore.classList.add('open');
    dialogGameOver.classList.remove('open')
    dialogGameOver.close();
    dialogHello.close()
    dialogHello.classList.remove('open')
  })
})

buttonCloseScore.addEventListener('click', () => {
  dialogScore.classList.remove('open');
  dialogScore.close();
  dialogHello.classList.add('open');
  dialogHello.show();
})



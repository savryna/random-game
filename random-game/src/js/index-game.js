import { controlAudio, playAudio } from './audio.js';
import { getRandomNumber } from './helper.js';
// import { moveCatcherLeft, moveCatcherRight,  } from './control_move.js';

const btnRestart = document.querySelector('.restart');
const buttonPlay = document.querySelector('.button__play-game');
const buttonVolume = document.querySelector('.btn-sound-volume');
const canvas = document.querySelector('.canvas');
const catcher = document.querySelector('.catcher');
const catcherCenter =
  parseInt(window.getComputedStyle(canvas).getPropertyValue('width')) / 2 -
  parseInt(window.getComputedStyle(catcher).getPropertyValue('width')) / 2;
const catcherBottom = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('bottom'),
);
const dialogGameOver = document.querySelector('.modal-game-over');
const dialogHello = document.querySelector('.modal-hello');
const gameWidth =
  parseInt(window.getComputedStyle(canvas).getPropertyValue('width')) -
  parseInt(window.getComputedStyle(canvas).getPropertyValue('border-width')) *
    3;
const hpImages = document.querySelectorAll('.hp');
const fallingObjects = document.querySelector('.falling-objects');
const scorePoint = document.querySelector('.score-points');
const scorePointFinally = document.querySelector('.score-points-finally');

let catcherLeft = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('left'),
);
let hp = 3;
let score = 0;
let totalScore = [];

function startGame() {
  hp = 3;
  score = 0;
  scorePoint.innerText = `${score}`;
  for (let hp of hpImages) {
    hp.style.opacity = 1;
  }
  fallingObjects.innerHTML = '';
  catcher.style.left = catcherCenter + 'px';
  dialogHello.removeAttribute('opened', '');
  dialogGameOver.close();
  setTimeout(() => dialogHello.close(), 500);
  startGameLoop();
  playAudio('background audio');
  document.addEventListener('keydown', control);
}

function endGame() {
  scorePointFinally.innerText = `${score}`;
  controlAudio('game over');
  dialogGameOver.show();
  dialogGameOver.setAttribute('opened', '');
  console.log(score);
  totalScore.push(`${score}`);
  console.log(totalScore);
  localStorage.setItem('totalScore', `${totalScore}`);
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
  const y = 750;

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
        catcherOffsetLeft: 30,
        catcherOffsetRight: 80,
        catchSound: 'catch leaf',
      },
      drop: {
        velocity: 10,
        catcherOffsetLeft: 10,
        catcherOffsetRight: 50,
        catchSound: 'catch drop',
      },
    };

    for (const obj of generatedObjects) {
      if (!obj.isActive) {
        continue;
      }

      if (
        obj.y < catcherBottom + 50 &&
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
        endGame();
      }

      obj.y -= objParams[obj.objType].velocity;
      obj.elem.style.bottom = `${obj.y}px`;
      obj.elem.style.left = `${obj.x}px`;
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
buttonVolume.addEventListener('click', () => controlAudio('background audio'));
btnRestart.addEventListener('click', startGame);
console.log(score);

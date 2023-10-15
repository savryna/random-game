import { controlAudio, playAudio } from './audio.js';
import { getRandomNumber } from './helper.js';
import { openDialog, closeDialog } from './control-dialogs.js';

const btnRestart = document.querySelector('.restart');
const buttonCloseScore = document.querySelector('.close-score');
const buttonPlay = document.querySelector('.button__play-game');
const buttonPlayAlso = buttonPlay.cloneNode(true);
const buttonOpenRules = document.querySelector('.button-rules');
const buttonGoBack = document.querySelector('.btn-arrow-back');
const buttonVolume = document.querySelector('.btn-sound-volume');
const canvas = document.querySelector('.canvas');
const catcher = document.querySelector('.catcher');
const catcherBottom = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('bottom'),
);
const catcherCenter =
  parseInt(window.getComputedStyle(canvas).getPropertyValue('width')) / 2 -
  parseInt(window.getComputedStyle(catcher).getPropertyValue('width')) / 2;
const dialogGameOver = document.querySelector('.modal-game-over');
const dialogRules = document.querySelector('.dialog-rules');
const dialogRulesInside = document.querySelector('.dialog-rules-content');
const dialogHello = document.querySelector('.modal-hello');
const dialogScore = document.querySelector('.dialog-score');
const fallingObjects = document.querySelector('.falling-objects');
const gameHeight = parseInt(
  window.getComputedStyle(canvas).getPropertyValue('height'),
);
const gameWidth =
  parseInt(window.getComputedStyle(canvas).getPropertyValue('width')) -
  parseInt(window.getComputedStyle(canvas).getPropertyValue('border-width')) *
    3;
const hpImages = document.querySelectorAll('.hp');
const openScoreList = document.querySelectorAll('.top-score');
const scoreList = document.querySelectorAll('li');
const scorePoint = document.querySelector('.score-points');
const scorePointFinally = document.querySelector('.score-points-finally');

let catcherLeft = parseInt(
  window.getComputedStyle(catcher).getPropertyValue('left'),
);
let hp = 3;
let score = 0;

// localStorage
let scoreStatistic =
  JSON.parse(localStorage.getItem('assavr-scoreStatistic')) ?? [];
updateScoreTable(scoreList, scoreStatistic);

// add a button in the rules dialog
buttonPlayAlso.innerText = 'Точно начать';
dialogRulesInside.append(buttonPlayAlso);

// localStorage
function sortArray(array) {
  return array.sort(function (a, b) {
    return b - a;
  });
}

function updateScoreTable(arrayHtml, arrayStore) {
  for (let i = 0; i < arrayStore.length; i++) {
    arrayHtml[i].innerText = `${arrayStore[i]}`;
  }
}

function addResultToScore(result) {
  console.log('assavr', result);
  scoreStatistic.push(result);
  sortArray(scoreStatistic);
  scoreStatistic = scoreStatistic.slice(0, 10);
  localStorage.setItem('assavr-scoreStatistic', JSON.stringify(scoreStatistic));
  updateScoreTable(scoreList, scoreStatistic);
}

function startGame() {
  hp = 3;
  score = 0;
  scorePoint.innerText = `${score}`;
  for (let hp of hpImages) {
    hp.style.opacity = 1;
  }
  fallingObjects.innerHTML = '';
  catcher.style.left = catcherCenter + 'px';
  closeDialog(dialogHello);
  closeDialog(dialogGameOver);
  closeDialog(dialogRules);
  startGameLoop();
  playAudio('background audio');
  document.addEventListener('keydown', control);
}

function endGame() {
  scorePointFinally.innerText = `${score}`;
  console.log(`${Date.now()}endGame`);
  addResultToScore(score);
  controlAudio('game over');
  dialogGameOver.show();
  dialogGameOver.classList.add('open');
  document.removeEventListener('keydown', control);
}

function moveCatcherLeft() {
  if (catcherLeft > 0 /* left edge game field */) {
    catcherLeft -= 20;
    catcher.style.left = catcherLeft + 'px';
  }
}

function moveCatcherRight() {
  const widthCatcher = 80;
  const widthBorder = 40;
  const widthGame = 800;
  if (catcherLeft < (widthGame - widthCatcher - widthBorder)) {
    catcherLeft += 20;
    catcher.style.left = catcherLeft + 'px';
  }
}

function control(event) {
  if (event.key === 'ArrowLeft' || event.code === 'KeyA') {
    moveCatcherLeft();
  }
  if (event.key === 'ArrowRight' || event.code === 'KeyD') {
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
  const catcherWidthHeight = 80;
  function fallDownObjects() {
    const objParams = {
      leaf: {
        velocity: 5,
        catcherOffsetLeft: 40,  /* catcher width / 2 ;) */
        catcherOffsetRight: catcherWidthHeight,
        catchSound: 'catch leaf',
      },
      drop: {
        velocity: 10,
        catcherOffsetLeft: 40,  /* catcher width / 2 ;) */
        catcherOffsetRight: catcherWidthHeight,
        catchSound: 'catch drop',
      },
    };

    for (const obj of generatedObjects) {
      if (!obj.isActive) {
        continue;
      }

      if (
        obj.y < catcherBottom + catcherWidthHeight &&
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
buttonPlayAlso.addEventListener('click', startGame);

document.onkeydown = function startPlay(event) {
  if (event.code === 'Space') {
    startGame();
  }
};

buttonVolume.addEventListener('click', () => controlAudio('background audio'));

btnRestart.addEventListener('click', startGame);

openScoreList.forEach((elem) => {
  elem.addEventListener('click', () => {
    closeDialog(dialogGameOver);
    closeDialog(dialogHello);
    openDialog(dialogScore);
  });
});

buttonCloseScore.addEventListener('click', () => {
  closeDialog(dialogScore);
  openDialog(dialogHello);
});

buttonOpenRules.addEventListener('click', () => {
  closeDialog(dialogHello);
  openDialog(dialogRules);
});

buttonGoBack.addEventListener('click', () => {
  closeDialog(dialogRules);
  openDialog(dialogHello);
})

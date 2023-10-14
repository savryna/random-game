const bgAudio = new Audio('./assets/audio/bgAudio.mp3');
const leafAudio = new Audio('./assets/audio/leaf.mp3');
const dropAudio = new Audio('./assets/audio/drop.mp3');
const gameOver = new Audio('./assets/audio/game-over.mp3');
const buttonVolume = document.querySelector('.btn-sound-volume');

const listAudio = {
  'background audio': bgAudio,
  'catch leaf': leafAudio,
  'catch drop': dropAudio,
  'game over': gameOver,
};

export function controlAudio(audioKey) {
  let audio;
  if (audioKey === 'background audio') {
    audio = listAudio['background audio'];
    audio.setAttribute('loop', '');
    buttonVolume.classList.toggle('volume-max');
  }
  if (audioKey === 'catch leaf') {
    audio = listAudio['catch leaf'];
  }
  if (audioKey === 'catch drop') {
    audio = listAudio['catch drop'];
  }
  if (audioKey === 'game over') {
    audio = listAudio['game over'];
  }
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  controlVolume(audioKey);
}

function controlVolume(audioKey) {
  let audio;
  audio = listAudio[audioKey];
  if (audioKey === 'background audio' && audio.paused) {
    for (let key in listAudio) {
      listAudio[key].volume = 0;
    }
  } else if ((audioKey === 'background audio' && !audio.paused)) {
    audio.play();
    setStartVolumes()
  }
}

export function playAudio(audioKey) {
  let audio;
  setStartVolumes()
  if (audioKey === 'background audio') {
    audio = listAudio['background audio'];
    buttonVolume.classList.add('volume-max');
  }
  audio.play();
}

function setStartVolumes() {
  leafAudio.volume = 0.1;
  dropAudio.volume = 0.1;
  gameOver.volume = 0.3;
  bgAudio.volume = 0.3;
}

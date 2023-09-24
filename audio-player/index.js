const audio = document.querySelector('.audio');
const audioSrc = document.querySelector('audio > source');
const play = document.querySelector('.btn-play');
const range = document.querySelector('.range');
const path = document.querySelector('.path');
const current = document.querySelector('.current');
const duration = document.querySelector('.remaining');
const nextBtn = document.querySelector('.btn-right');
const prevBtn = document.querySelector('.btn-left');
const author = document.querySelector('.author-name');
const songName = document.querySelector('.song-name');
const blockPlayer = document.querySelector('.container-audio')
const album = document.querySelector('.container-audio-img')
const background = document.querySelector('.background')
const btnRepeat = document.querySelector('.btn-repeat')
const pathRepeat = document.querySelector('.path-repeat')
const btnRandom = document.querySelector('.btn-random')
const pathRandom = document.querySelector('.path-random')

audio.volume = 0.4;
// 
// play pause audio
function playAudio() {
  audio.load()
  audio.play();
  path.setAttribute('d', 'M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM11 14V7H12V14H11ZM8 7V14H9V7H8Z');
  play.classList.remove('pause')

 
}

function pauseAudio() {
  audio.pause();
  path.setAttribute('d', 'M19 10C19 14.9706 14.9706 19 10 19C5.02943 19 1 14.9706 1 10C1 5.02943 5.02943 1 10 1C14.9706 1 19 5.02943 19 10ZM20 10C20 15.5229 15.5228 20 10 20C4.47716 20 0 15.5229 0 10C0 4.47715 4.47716 0 10 0C15.5228 0 20 4.47715 20 10ZM7.5 14.3301L15 10L7.5 5.66988V14.3301Z')
  play.classList.add('pause')
}

function controlAudio() {
  if (play.classList.contains('pause')) {
    playAudio()
  } else {
    pauseAudio()
  }
}

play.addEventListener('click', controlAudio)

// progress



function progressTime() {
  if (audio.play()) {
    setInterval(() => {
      range.value = audio.currentTime;
      let audioDuration = audio.duration;
      let totalMin = Math.floor(audioDuration / 60);
      let totalSec = Math.floor(audioDuration % 60);
      if (totalSec < 10) {
        totalSec = `0${totalSec}`;
      }
      duration.innerText = `${totalMin}:${totalSec}`;
      range.setAttribute('max', `${audioDuration}`)

      
    }, 500);
  }
}

audio.addEventListener('timeupdate', (e) => {
  const audioCurrent = e.target.currentTime;
  let currentMin = Math.floor(audioCurrent / 60);
let currentSec = Math.floor(audioCurrent % 60);
if (currentSec < 10) {
  currentSec = `0${currentSec}`;
}
current.innerText = `${currentMin}:${currentSec}`;

})

range.onchange = function () {
  audio.play();
  audio.currentTime = range.value;
  path.setAttribute('d', 'M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM11 14V7H12V14H11ZM8 7V14H9V7H8Z');
}

progressTime()



// prev next song
const songsAuthor = ['Joji', 'Shortparis', `Jahman'sLove`, 'Творожное озеро', 'Альянс', 'Сова']; //array with authors
const songsName = ['Like you do', 'Страшно', 'Одна любовь', 'Секрет', 'На заре', 'Первый снег'] //array with songs
const videoSrc = [
  'https://www.youtube.com/watch?v=mS-d5PEomYs',
  'https://youtu.be/FUdteCBRX9c?si=kzdx7Gg8kxZBrF8j',
  'https://youtu.be/tW0iCBZCM7I?si=5MNHI0zbSkKR3dYe',
  'https://www.youtube.com/watch?v=yzufzjg5Qho',

]
let songsIndex = 0;
let rand = 0;

btnRandom.addEventListener('click', () => {
  pathRandom.classList.toggle('path-random');
  audio.classList.toggle('random')
})

function currentSong(song) {
  if(audio.classList.contains('random')) {
    author.innerHTML = songsAuthor[rand];
    songName.innerHTML = songsName[rand];
    audio.src = `./assets/audio/${songsAuthor[rand]}.mp3`;
    album.src = `./assets/img/${songsAuthor[rand]}.jpg`;
    background.src = `./assets/img/${songsAuthor[rand]}.jpg`;
    author.href = `${videoSrc[rand]}`;
    songName.href = `${videoSrc[rand]}`;
    blockPlayer.setAttribute('data-shadow', `${rand}`);
  } else {
  author.innerHTML = songsAuthor[songsIndex];
  songName.innerHTML = songsName[songsIndex];
  audio.src = `./assets/audio/${song}.mp3`;
  album.src = `./assets/img/${song}.jpg`;
  background.src = `./assets/img/${song}.jpg`;
  author.href = `${videoSrc[songsIndex]}`;
  songName.href = `${videoSrc[songsIndex]}`;
  blockPlayer.setAttribute('data-shadow', `${songsIndex}`);
}
}

currentSong(songsAuthor[songsIndex])


function nextSong() {
  songsIndex++;
  rand = Math.floor(Math.random() * songsAuthor.length);
  if (songsIndex > songsAuthor.length - 1) {
    songsIndex = 0;
  }
  currentSong(songsAuthor[songsIndex])
  playAudio();
  
}

function prevSong() {
  songsIndex--;
  if (songsIndex < 0) {
    songsIndex = songsAuthor.length - 1;
  }
  currentSong(songsAuthor[songsIndex])
  playAudio();
}


nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)

// loop

btnRepeat.addEventListener('click', () => {
  if(pathRepeat.classList.contains('path-repeat')){
  audio.classList.add('repeat')
  pathRepeat.classList.remove('path-repeat')
} else  if(audio.classList.contains('repeat')) {
  audio.classList.remove('repeat')
  audio.classList.add('repeat_one')
    pathRepeat.setAttribute('d', 'M8.75 0.5C4.19365 0.5 0.5 4.19365 0.5 8.75C0.5 13.3063 4.19365 17 8.75 17H10.5C15.9543 17 20.3888 12.6332 20.4979 7.20505L22.6464 9.35355L23.3536 8.64645L20.3536 5.64645L20 5.29289L19.6464 5.64645L16.6464 8.64645L17.3536 9.35355L19.4976 7.2095C19.3863 12.0833 15.4005 16 10.5 16H8.75C4.74594 16 1.5 12.7541 1.5 8.75C1.5 4.74594 4.74594 1.5 8.75 1.5H20V0.5H8.75ZM10.0528 3.77639L8.55279 6.77639L9.44721 7.22361L10 6.11803V12H11V4L10.0528 3.77639Z')
  } else if(audio.classList.contains('repeat_one')) {
    audio.classList.remove('repeat_one')
    pathRepeat.classList.add('path-repeat')
    pathRepeat.setAttribute('d', 'M0 8.25C0 3.69365 3.69365 0 8.25 0H19.5V1H8.25C4.24594 1 1 4.24594 1 8.25C1 12.2541 4.24594 15.5 8.25 15.5H10C14.9005 15.5 18.8863 11.5833 18.9976 6.7095L16.8536 8.85355L16.1464 8.14645L19.1464 5.14645L19.5 4.79289L19.8536 5.14645L22.8536 8.14645L22.1464 8.85355L19.9979 6.70505C19.8888 12.1332 15.4543 16.5 10 16.5H8.25C3.69365 16.5 0 12.8063 0 8.25Z')
  }

})

audio.addEventListener('ended', () => {
if(audio.classList.contains('repeat')) {
  nextSong();
} else if(audio.classList.contains('repeat_one')) {
  playAudio();
} else {
  pauseAudio()
}
})


// playlist 

const modal = document.querySelector('.modal__playlist');
const openBtn = document.querySelector('.menu');
const closeBtn = document.querySelector('.btn__close');
const wrapperModal = document.querySelector('.wrapper__modal')

const songBtn = document.querySelectorAll('.song__item');
const songBtntoo = document.querySelectorAll('.song__item__author');

function chooseSong(e) {
  if(e.target.classList.contains(`zero`)) {
    currentSong(songsAuthor[0])
    playAudio();
  } else if(e.target.classList.contains(`one`)) {
    currentSong(songsAuthor[1]);
    playAudio()
  } else if(e.target.classList.contains(`two`)) {
    currentSong(songsAuthor[2]);
    playAudio()
  } else if(e.target.classList.contains(`three`)) {
    currentSong(songsAuthor[3]);
    playAudio()
  } else if(e.target.classList.contains('four')) {
    currentSong(songsAuthor[4]);
    playAudio()
  } else if(e.target.classList.contains(`five`)) {
    currentSong(songsAuthor[5]);
    playAudio()
  }
}
songBtn.forEach( e => {
  e.addEventListener('click', chooseSong);
})
songBtntoo.forEach( e => {
  e.addEventListener('click', chooseSong);
})

function modalControl() {
  modal.classList.toggle('none')

}
openBtn.addEventListener('click', modalControl)
closeBtn.addEventListener('click', modalControl)
wrapperModal.addEventListener('click', modalControl)
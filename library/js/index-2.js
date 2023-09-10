
// Бургер меню
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("button__burger-open").addEventListener("click", function () {
    document.querySelector(".header").classList.toggle("open")
  })
});
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("button__burger-close").addEventListener("click", function () {
    document.querySelector(".header").classList.toggle("open")
  })
});

document.getElementById("header__nav").addEventListener('click', event => {
  event._isClickWithUnMenu = true;
});
document.getElementById("button__burger-open").addEventListener('click', event => {
  event._isClickWithUnMenu = true;
});

document.body.addEventListener('click', event => {
  if (event._isClickWithUnMenu) return;
  document.querySelector(".header").classList.remove("open")
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("header__list").addEventListener("click", function () {
    document.querySelector(".header").classList.toggle("open")
  })
});




// Слайдер в блоке about
const blockImg = document.querySelector(".slider__block__img");
const liButtons = document.querySelectorAll(".carousel__item");
const carouselButtons = document.querySelectorAll(".carousel__item__circle");
const arrowLeft = document.querySelector(".arrow-right");
const arrowRight = document.querySelector(".arrow-left");

let position = 0;
let dotIndex = 0;


const dotsActive = (index) => {
  for (let dot of carouselButtons) {
    dot.classList.remove('carousel__item__circle-v2')
  }
  carouselButtons[index].classList.add('carousel__item__circle-v2')
}

liButtons.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    position = 475 * index;
    blockImg.style.left = -position + 'px'
    dotIndex = index;
    dotsActive(dotIndex)
  })
})

arrowLeft.addEventListener('click', () => {
  if (position < ((carouselButtons.length - 1) * 475)) {
    position += 475;
    dotIndex++;
  } else {
    position = (carouselButtons.length - 1) * 475;
    dotIndex = carouselButtons.length - 1;
  }
  blockImg.style.left = -position + 'px'
  dotsActive(dotIndex)
})

arrowRight.addEventListener('click', () => {
  if (position > 0) {
    position -= 475;
    dotIndex--;
  } else {
    position = 0
    dotIndex = 0
  }
  blockImg.style.left = -position + 'px'
  dotsActive(dotIndex)
})

// Слайдер сезонов блок Favorites
const favoritesUl = document.querySelectorAll('.favorites__list');
const labelClick = document.querySelectorAll('.favorites__label');


labelClick[0].addEventListener('click', () => {
  for (let item of favoritesUl) {
    item.classList.add('favorites__list_none')
  }
  // setTimeout( () => favoritesUl[0].classList.remove('favorites__list_none'), 1000)
  favoritesUl[0].classList.remove('favorites__list_none')
})

labelClick[1].addEventListener('click', () => {
  for (let item of favoritesUl) {
    item.classList.add('favorites__list_none')
  }
  // setTimeout( () => favoritesUl[1].classList.remove('favorites__list_none'), 1000)
  favoritesUl[1].classList.remove('favorites__list_none')
})
labelClick[2].addEventListener('click', () => {
  for (let item of favoritesUl) {
    item.classList.add('favorites__list_none')
  }
  // setTimeout( () => favoritesUl[2].classList.remove('favorites__list_none'), 1000)
  favoritesUl[2].classList.remove('favorites__list_none')
})
labelClick[3].addEventListener('click', () => {
  for (let item of favoritesUl) {
    item.classList.add('favorites__list_none')
  }
  // setTimeout( () => favoritesUl[3].classList.remove('favorites__list_none'), 1000)
  favoritesUl[3].classList.remove('favorites__list_none')

})




// ТЫК КНОПОЧЕК ДЛЯ МОДАЛЬНЫХ ОКОН
const white = document.querySelector('.white');
const userButton = document.querySelector('.button__user-profile');
const headerModal = document.querySelector('.header__profile');
const headerModalAfter = document.querySelector('.header__profile__after');
const userButton2 = document.querySelector('.button__user-profile-menu');
const burgerOpenButton = document.querySelector('.button__burger-open');
const burgerCloseButton = document.querySelector('.button__burger');
const header = document.querySelector('header');

function closeAll() {
  gray.classList.add('none');
  white.classList.add('none');
  registrationForm.classList.add('none')
  loginForm.classList.add('none')
  headerModal.classList.add('none');
  headerModalAfter.classList.add('none')
  windowMyProfile.classList.add('none')
  windowBuyBook.classList.add('none')
}



userButton.addEventListener('click', () => {
  headerModal.classList.toggle('none')
  white.classList.toggle('none')
})

userButton2.addEventListener('click', () => {
  headerModal.classList.toggle('none')
  white.classList.toggle('none')
})

white.addEventListener('click', closeAll)
//  для размера с бургер меню
white.addEventListener('click', () => {
  white.classList.remove('z-index')
  headerModal.classList.remove('z-index')
}
)

burgerOpenButton.addEventListener('click', () => {
  white.classList.toggle('z-index')
  headerModal.classList.toggle('z-index')
  headerModal.classList.add('none')
  white.classList.add('none')
})

burgerCloseButton.addEventListener('click', () => {

  headerModal.classList.add('none')
  white.classList.add('none')
})

// Окошко регистрации или входа в личный кабинет

const registrationButton = document.querySelector('.profile__register');
const loginButton = document.querySelector('.profile__login');
const registerAttention = document.querySelector('.window-login__attention-button')
const loginAttention = document.querySelector('.window-register__attention-button')
const registrationForm = document.querySelector('.form__window-register');
const loginForm = document.querySelector('.form__window-login');
const registerCloseBtn = document.querySelector('.register-close__button');
const loginCloseBtn = document.querySelector('.login-close__button');
const librSignUp = document.querySelector('.button-sign')
const librLogIn = document.querySelector('.button-log')
const profileFromCard = document.querySelector('.button-sign-after')


const gray = document.querySelector('.gray');



registrationButton.addEventListener('click', () => {
  headerModal.classList.add('none');
  registrationForm.classList.remove('none')
  white.classList.add('none')
  gray.classList.remove('none')
})



loginButton.addEventListener('click', () => {
  headerModal.classList.add('none');
  loginForm.classList.remove('none')
  white.classList.add('none')
  gray.classList.remove('none')
  registrationForm.classList.add('none')
})
gray.addEventListener('click', closeAll)

registerCloseBtn.addEventListener('click', closeAll)


loginCloseBtn.addEventListener('click', closeAll)

registerAttention.addEventListener('click', () => {
  registrationForm.classList.remove('none')
  loginForm.classList.add('none')
})
loginAttention.addEventListener('click', () => {
  loginForm.classList.remove('none')
  registrationForm.classList.add('none')
})

librSignUp.addEventListener('click', () => {
  headerModal.classList.add('none');
  registrationForm.classList.remove('none')
  white.classList.add('none')
  gray.classList.remove('none')
  loginForm.classList.add('none')
})


librLogIn.addEventListener('click', () => {
  headerModal.classList.add('none');
  loginForm.classList.remove('none')
  white.classList.add('none')
  gray.classList.remove('none')
  registrationForm.classList.add('none')
})


// LOCALSTORAGE

const inputsRegister = document.querySelectorAll('.window-register__input')
const signUPBtn = document.querySelector('.window-register__button');
const libraryAfter = document.querySelector('.block__check-the-card')
const libraryBefore = document.querySelector('.library-card__container')
const userButtonAfter = document.querySelector('.icon-user__after')
const myProfileFromIcon = document.querySelector('.btn__my-profile');
const LogOut = document.querySelector('.btn-log-out');
const windowMyProfile = document.querySelector('.window__my-profile')
const letterName = document.querySelectorAll('.icon-span')
const userName = document.querySelector('.window__my-profile__name')

function change() {
  for (let i = 0; i < inputsRegister.length; i++) {
    inputsRegister[i].addEventListener('change', changeHandler)
  }
}

function changeHandler() {
  localStorage.setItem(this.name, this.value)
}




signUPBtn.addEventListener('click', () => {
  localStorage.setItem('register', 'true')
  location.reload();
})

myProfileFromIcon.addEventListener('click', () => {
  // windowMyProfile.classList.remove('none');

})

LogOut.addEventListener('click', () => {
  localStorage.setItem('register', 'false')
  location.reload();
})

// Забираю буковки у имени фамилии 
const first = localStorage.firstName;
const last = localStorage.lastName;
let letters = first.toUpperCase().slice(0,1) + last.toUpperCase().slice(0, 1)

// Делаю случайное число
// // Math.ceil(Math.random() * 1000000000)
// let cardNumber;
// function randomNum() {
//   cardNumber = Math.ceil(Math.random() * 1000000000);
// }
// Не сделала :) 

// Имя держателя карты 
const readerNameAfter = document.querySelector('.input__check-the-card');
const test = `${first + ' ' + last}`
readerNameAfter.setAttribute('placeholder', test)

profileFromCard.addEventListener('click', () => {
windowMyProfile.classList.remove('none');
gray.classList.remove('none');
})

// покупка книжечек я уже схожу с ума
const buyBookBtn = document.querySelectorAll('.button-book')

const windowBuyBook = document.querySelector('.window__buy-card')
for (item of buyBookBtn) {
item.addEventListener('click', () => {
  windowBuyBook.classList.remove('none');
  gray.classList.remove('none')
})
}

function isRegister() {
  if (localStorage.register === 'true') {
    userButtonAfter.classList.remove('none');
    userButton.classList.add('none')
    
    userButtonAfter.addEventListener('click', () => {
      headerModalAfter.classList.toggle('none')
      white.classList.toggle('none')
    })

    myProfileFromIcon.addEventListener('click', () => {
      windowMyProfile.classList.remove('none');
      gray.classList.remove('none')
      headerModalAfter.classList.add('none');
      white.classList.add('none')
      windowBuyBook.classList.add('none')
    })
    for (item of letterName) {
    item.innerHTML = letters;
    }

    userName.innerHTML = `${first + ' ' + last}`;
    
    libraryAfter.classList.remove('none');
    libraryBefore.classList.add('none');
  }
}

isRegister();
change();



// alert(localStorage.FirstName)

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
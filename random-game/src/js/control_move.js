export function moveCatcherLeft(hero, heroLeft) {
  if (heroLeft > 0) {
    heroLeft -= 20;
    hero.style.left = heroLeft + 'px';
  }
}

export function moveCatcherRight(hero, heroLeft) {
  if (heroLeft < 670) {
    heroLeft += 20;
    hero.style.left = heroLeft + 'px';
  }
}


// export function control(event) {
//   if (event.key === 'ArrowLeft' || event.code === 'KeyA') {
//     moveCatcherLeft(hero, heroLeft)
//   }
//   if (event.key === 'ArrowRight' || event.code === 'KeyD') {
//     moveCatcherRight(hero, heroLeft);
//   }
// }

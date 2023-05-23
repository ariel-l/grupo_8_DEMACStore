const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let translateX = 0;
const slideWidth = carousel.offsetWidth;

prevButton.addEventListener('click', () => {
  if (translateX < 0) {
    translateX += slideWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
  }
});

nextButton.addEventListener('click', () => {
  if (translateX > -(slideWidth * (carousel.childElementCount - 1))) {
    translateX -= slideWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
  }
});
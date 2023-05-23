function initCarousel() {
  const carousel2 = document.querySelector('.carousel2');
  const prevButton2 = document.querySelector('.carousel-prev2');
  const nextButton2 = document.querySelector('.carousel-next2');

  let translateX2 = 0;
  const slideWidth2 = carousel2.offsetWidth;

  prevButton2.addEventListener('click', () => {
    if (translateX2 < 0) {
      translateX2 += slideWidth2;
      carousel2.style.transform = `translateX(${translateX2}px)`;
    }
  });

  nextButton2.addEventListener('click', () => {
    if (translateX2 > -(slideWidth2 * (carousel2.childElementCount - 1))) {
      translateX2 -= slideWidth2;
      carousel2.style.transform = `translateX(${translateX2}px)`;
    }
  });
}

module.exports = { initCarousel };
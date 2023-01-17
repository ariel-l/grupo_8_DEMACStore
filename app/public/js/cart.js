/* DECREMENT & INCREMENT BTN */
const minusBtn = document.querySelector('.decr');
const plusBtn = document.querySelector('.incr');
const countInput = document.querySelector('.count__input');

minusBtn.addEventListener('click', decrement);
plusBtn.addEventListener('click', increment);

function decrement() {
  let count = parseInt(countInput.value);
  if(count > 0){
     count -= 1;
     countInput.value = count;
  }
}

function increment() {
  countInput.value = parseInt(countInput.value) + 1;
}

/* OCULTAR */

const acc = document.getElementsByClassName("input__title--container");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    const panel = this.nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
}


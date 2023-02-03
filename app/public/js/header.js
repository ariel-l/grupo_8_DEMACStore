let burgerMenu = document.querySelector(".burger-menu");
let btnClose = document.querySelector("#btn__close");
let navCategories = document.querySelector(".header__nav--categories");

burgerMenu.addEventListener("click", () => {
    navCategories.classList.add("active");
})

btnClose.addEventListener("click", () => {
    navCategories.classList.remove("active");
})
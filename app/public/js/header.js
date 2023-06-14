let burgerMenu = document.querySelector(".header__burger--menu");//i
let menuContainer = document.querySelector(".menu-container");//nav - ul menu
let userAvatar = document.querySelector(".user-avatar");//img
let menuUser = document.querySelector(".menu-user");

burgerMenu.addEventListener("click", () => {
  menuContainer.classList.toggle("active");
});

userAvatar.addEventListener("click", () => {
  menuUser.classList.toggle("active");
});


window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    document.querySelector(".header__container").classList.add("header-opacity");
  } else {
    document.querySelector(".header__container").classList.remove("header-opacity");
  }
});
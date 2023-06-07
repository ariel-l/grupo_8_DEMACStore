let navBar = document.getElementById("navigation-bar-mobile");
let menuUser = document.querySelector(".menu-user");
let userAvatar = document.querySelector(".user-avatar");

function dropMenu() {
  menuUser.classList.toggle("active");
  if (menuUser.classList.contains("active")) {
    navBar.style.display = "block";
  }
}

function closeWindow() {
  if (menuUser.classList.contains("active")) {
    menuUser.classList.remove("active");
  }
}

userAvatar.addEventListener("click", dropMenu);
window.addEventListener("click", function (event) {
  if (!userAvatar.contains(event.target)) {
    closeWindow();
  }
});

window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    document.querySelector(".header__container").classList.add("header-opacity");
  } else {
    document.querySelector(".header__container").classList.remove("header-opacity");
  }
});
let subCategoryMenu = document.querySelector(".subCategoryMenu");
let burgerMenu = document.querySelector(".header__burger--menu");
let menuUser = document.querySelector(".menu-user");
let userAvatar = document.querySelector(".user-avatar");

function dropMenu() {
  menuUser.classList.toggle("active");
  /*Alterna la clase CSS "active" en el elemento menuUser. 
  Si la clase ya está presente, la quita; de lo contrario, la agrega. */
  if (menuUser.classList.contains("active")) {
    menuUser.style.display = "block";
  /* Si menuUser tiene la clase "active" después de la acción anterior, se establece la propiedad 
  display del elemento navBar en "block" (visible). D*/
  } else {
    menuUser.style.display = "none";
  /* De lo contrario, se establece en "none" (oculto).*/
  }
}

function closeWindow() {
    if (menuUser.classList.contains("active")) {
      /* Comprueba si menuUser tiene la clase "active". */
      menuUser.classList.remove("active");
      /* Si lo tiene, la quita. */
      menuUser.style.display = "none";
      /* y se establece la propiedad display del elemento 
      navBar en "none" (oculto). */
    }
}

userAvatar.addEventListener("click", dropMenu);
window.addEventListener("click", function (event) {
  if (!userAvatar.contains(event.target)) {
    closeWindow();
  }
});

function dropMenuSubcategories() {
  subCategoryMenu.classList.toggle("active");
  if (subCategoryMenu.classList.contains("active")) {
    subCategoryMenu.style.display = "block";
  } else {
    subCategoryMenu.style.display = "none";
  }
}

function closeWindow() {
  if (subCategoryMenu.classList.contains("active")) {
    subCategoryMenu.classList.remove("active");
    subCategoryMenu.style.display = "none";
  }
}

burgerMenu.addEventListener("click", dropMenuSubcategories);

window.addEventListener("click", function (event) {
  if (!burgerMenu.contains(event.target) && !subCategoryMenu.contains(event.target)) {
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
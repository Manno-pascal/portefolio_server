let menu = document.querySelector("#navMenu")
let carousel = document.querySelector('.carousel');
let cells = carousel.querySelectorAll('.carousel__cell');
let cellCount; // cellCount set from cells-range input value
let selectedIndex = 0;
let cellWidth = carousel.offsetWidth;
let cellHeight = carousel.offsetHeight;
let isHorizontal = true;
let radius, theta;

window.onresize = function () {

  cellWidth = carousel.offsetWidth;
  cellHeight = carousel.offsetHeight;
  radius, theta;
  rotateCarousel()
  changeCarousel()

}

function displayMenu() {

  if (menu.classList.contains("menu")) {
    menu.classList.remove("menu")
  } else {
    menu.classList.add("menu")
  }
}

function rotateCarousel() {
  let angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) rotateY(' + angle + 'deg)';
}

let prevButton = document.querySelector('.previous-button');
prevButton.addEventListener('click', function () {
  selectedIndex--;
  rotateCarousel();
});

let nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', function () {
  selectedIndex++;
  rotateCarousel();
});



function changeCarousel() {
  cellCount = document.querySelectorAll(".carousel__cell").length;
  theta = 360 / cellCount;
  let cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round((cellSize / 2) / Math.tan(Math.PI / cellCount));
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    if (i < cellCount) {
      // visible cell
      cell.style.opacity = 1;
      let cellAngle = theta * i;
      cell.style.transform = "rotateY(" + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }

  rotateCarousel();
}

changeCarousel();

let myNav = document.querySelector("nav");
window.onscroll = function () {
  if (document.documentElement.scrollTop >= 20) {
    myNav.classList.add("scrolledNav");
  }
  else {
    myNav.classList.remove("scrolledNav");
  }
};





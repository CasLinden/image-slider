import "./styles/main.scss";
import slide1 from "./assets/slideshow-images/slide1.jpg";
import slide2 from "./assets/slideshow-images/slide2.jpg";
import slide3 from "./assets/slideshow-images/slide3.jpeg";
import slide4 from "./assets/slideshow-images/slide4.jpg";
import slide5 from "./assets/slideshow-images/slide5.jpg";
import heavyDot from "./assets/heavy-dot.svg";
import lightDot from "./assets/light-dot.svg";

function loadImages() {
  const slides = document.getElementsByClassName("slide");
  const images = [slide5, slide1, slide2, slide3, slide4, slide5, slide1];
  for (let i = 0; i < images.length; i++) {
    slides[i].src = images[i];
  }
}
loadImages();

let slides = document.querySelector(".slides-container");

let currentPosition = -1000;

const move = {
  position0: () => (slides.style.left = "-1000px"),
  position1: () => (slides.style.left = "-2000px"),
  position2: () => (slides.style.left = "-3000px"),
  position3: () => (slides.style.left = "-4000px"),
  position4: () => (slides.style.left = "-5000px"),
  right: () => {
    if (currentPosition === -6000) {
      snapTo0();
    }
    slides.style.left = `${currentPosition - 1000}px`;
  },
  left: () => {
    if (currentPosition === 0) {
      snapTo4();
    }
    slides.style.left = `${currentPosition + 1000}px`;
  },
};

const trackPosition = () => {
  currentPosition = parseInt(slides.style.left);
  highlight()
};

function highlight() {
  addDots()
  let position = (currentPosition / -1000) - 1
  if (position === 5) { position = 0 }
  if (position === -1) {position = 4}
  Array.from(dots())[position].src = heavyDot
}

highlight()

const snapTo0 = () => {
  slides.classList.add("notransition");
  move.position0();
  trackPosition();
  slides.offsetHeight; // this forces class notransition
  slides.classList.remove("notransition");
};

const snapTo4 = () => {
  slides.classList.add("notransition");
  move.position4();
  trackPosition();
  slides.offsetHeight;
  slides.classList.remove("notransition");
};

let intervID;

function slideShow() {
  if (!intervID) {
    intervID = setInterval(moveRight, 7000);
  }
}
slideShow();

function stopShow() {
  clearInterval(intervID);
  intervID = null;
}

function moveRight() {
  move.right();
  trackPosition();
}

const manualRight = () => {
  stopShow();
  moveRight();
  slideShow();
};

const rightArrow = () => {
    const arrow = document.getElementById('right-arrow')
    arrow.addEventListener('click', manualRight)
}
rightArrow()

function moveLeft() {
  move.left();
  trackPosition();
}

const manualLeft = () => {
  stopShow();
  moveLeft();
  slideShow();
};

const leftArrow = () => {
    const arrow = document.getElementById('left-arrow')
    arrow.addEventListener('click', manualLeft)
}
leftArrow()

function dots () {
  return document.getElementsByClassName("dot");
}

function addDots() {
  Array.from(dots()).forEach((e) => (e.src = lightDot));
}

addDots()
Array.from(dots())[0].src = heavyDot;

function clickDots() {
  for (let i = 0; i < dots().length; i++) {
    dots()[i].addEventListener('click', () => {
      stopShow()
      move[`position${i}`]()
      trackPosition()
      slideShow()
    })
  }
}
clickDots();



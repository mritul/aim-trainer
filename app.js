const gameField = document.querySelector(".game-field");
const dot = document.querySelector(".dot");
const startModal = document.querySelector(".start-modal");
const endModal = document.querySelector(".end-modal");
const startBtn = document.querySelector(".start-btn");
const retryBtn = document.querySelector(".retry-btn");
const resTimeField = document.querySelector(".response-time");
let lastClicked = 0;
let avgResTime = 0;
let num = 0;
let denom = 0;
let mousePosX = 0;
let mousePosY = 0;
let dotPosX = 0;
let dotPosY = 0;
let started = false;

const beginGame = () => {
  startModal.style.display = "none";
  lastClicked = new Date().getTime();
};

const endGame = () => {
  resTimeField.textContent = (avgResTime / 1000).toFixed(4);
  endModal.style.display = "flex";
  dot.style.display = "none";
};

const handleDotClick = (e) => {
  started = true;
  // Checking for loss first
  dotPosX = dot.getBoundingClientRect().x;
  dotPosY = dot.getBoundingClientRect().y;

  // If user clicks the dot correctly
  const d = new Date();
  dot.style.top = `${Math.random() * (window.innerHeight - 80) + 40}px`;
  dot.style.left = `${Math.random() * (window.innerWidth - 120) + 20}px`;
  const currTime = new Date().getTime();
  const response_time = currTime - lastClicked;
  num += response_time;
  denom += 1;
  avgResTime = num / denom;
  lastClicked = currTime;
};

startBtn.addEventListener("click", beginGame);

retryBtn.addEventListener("click", () => {
  location.reload();
});

dot.addEventListener("click", handleDotClick);

window.addEventListener("keypress", (e) => {
  if (e.key == "q") {
    endGame();
  }
});

window.addEventListener("click", (e) => {
  if (started) {
    mousePosX = e.clientX;
    mousePosY = e.clientY;
    console.log(dotPosX, mousePosX);
    console.log(dotPosY, mousePosY);
    if (
      Math.abs(mousePosX - dotPosX > 30) ||
      Math.abs(mousePosY - dotPosY > 30)
    ) {
      endGame();
    }
  }
});

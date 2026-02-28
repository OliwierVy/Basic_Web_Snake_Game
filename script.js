const game = document.getElementById("game");
const Best_Display = document.getElementById("Best");
const Points_Display = document.getElementById("now");
const size = 20;
let snake = [42, 41];
let food = 110;
let direction = 1;
let speed = 150;
let interval;
let points = 0;
let canChangeDirection = true;
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const Menu = document.getElementById("Menu");
const turn = new Audio("pickupCoin.wav");
const eat = new Audio("apple-bite-316785.mp3");
const bgmusic = new Audio("bgmusic.mp3");

let best_score = localStorage.getItem("best_score");
if (best_score === null) {
  best_score = 0;
  localStorage.setItem("best_score", best_score);
}

for (let i = 0; i < size * size; i++) {
  const div = document.createElement("div");
  div.classList.add("pole");
  game.appendChild(div);
}

const pola = game.querySelectorAll(".pole");

function draw() {
  pola.forEach((p) => {
    p.className = "pole";
    p.style.transform = "rotate(0deg)";
  })

  snake.forEach((i, index) => {
    pola[i].classList.add("snake");
    if (index === 0) {
      pola[i].classList.add("head");
    }
  });

  pola[food].classList.add("food");

  const headEl = document.querySelector(".snake.head");
  if (headEl) {
    let angle = 0;
    if (direction === 1) angle = 90;
    if (direction === -1) angle = -90;
    if (direction === size) angle = 180;
    if (direction === -size) angle = 0;
    headEl.style.transform = `rotate(${angle}deg)`;
  }
}

function move() {
  canChangeDirection = true;

  const head = snake[0] + direction;

  if (
    head < 0 ||
    head >= size * size ||
    (direction === 1 && head % size === 0) ||
    (direction === -1 && head % size === size - 1) ||
    snake.includes(head)
  ) {
    clearInterval(interval);
    bgmusic.pause()
    alert("You lose");
    location.reload();
    return;
  }

  snake.unshift(head);

  if (head === food) {
    do {
      food = Math.floor(Math.random() * size * size);
    } while (snake.includes(food));
    points += 1;
    eat.play();
  } else {
    snake.pop();
  }
  if (points > best_score) {
    best_score = points;
    localStorage.setItem("best_score", best_score);
  }
  Best_Display.innerHTML = `Best Score: ${Number(localStorage.getItem("best_score"))}`;
  Points_Display.innerHTML = `Score: ${points}`;

  draw();
}

document.addEventListener("keydown", (e) => {
  if (!canChangeDirection) return;

  if ((e.key === "w" || e.key === "ArrowUp") && direction !== size) {
    direction = -size;
    turn.play();
  } else if ((e.key === "s" || e.key === "ArrowDown") && direction !== -size) {
    direction = size;
    turn.play();
  } else if ((e.key === "a" || e.key === "ArrowLeft") && direction !== 1) {
    direction = -1;
    turn.play();
  } else if ((e.key === "d" || e.key === "ArrowRight") && direction !== -1) {
    direction = 1;
    turn.play();
  }

  canChangeDirection = false;
});

draw();
easy.addEventListener("click", () => {
  Menu.style.display = "none";
  speed = 250;
  interval = setInterval(move, speed);
  bgmusic.loop = true;
  bgmusic.volume = 0.5;
  bgmusic.play();
});
medium.addEventListener("click", () => {
  Menu.style.display = "none";
  speed = 150;
  interval = setInterval(move, speed);
  bgmusic.loop = true;
  bgmusic.volume = 0.5;
  bgmusic.play();
});
hard.addEventListener("click", () => {
  Menu.style.display = "none";
  speed = 75;
  interval = setInterval(move, speed);
  bgmusic.loop = true;
  bgmusic.volume = 0.5;
  bgmusic.play();
});

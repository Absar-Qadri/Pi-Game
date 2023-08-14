let roll;
let scoreHoldP0 = Number(document.querySelector("#score--0").textContent);
let scoreHoldP1 = Number(document.querySelector("#score--1").textContent);
const p0 = document.querySelector(".player--0");
const p1 = document.querySelector(".player--1");
let winner = document.querySelector(".winner");
const dice = document.querySelector(".dice");
const overlay = document.querySelector(".overlay");
let scorep0 = Number(document.querySelector("#current--0").textContent);
let scorep1 = Number(document.querySelector("#current--1").textContent);
dice.classList.add("hide");

const rightSideRoll = function () {
  roll = Math.trunc(Math.random() * 6) + 1;
  dice.src = `/images/dice-${roll}.png`;
  scorep1 += roll;
  if (roll === 1) {
    scorep1 = 0;
    document.querySelector("#current--1").textContent = scorep1;
    leftChange();
  } else {
    document.querySelector("#current--1").textContent = scorep1;
  }
};

const sideLeftRoll = function () {
  roll = Math.trunc(Math.random() * 6) + 1;
  dice.src = `/images/dice-${roll}.png`;
  scorep0 += roll;
  if (roll === 1) {
    scorep0 = 0;
    document.querySelector("#current--0").textContent = scorep0;
    rightChange();
  } else {
    document.querySelector("#current--0").textContent = scorep0;
  }
};

const sideLeftHold = function () {
  scoreHoldP0 += scorep0;
  document.querySelector("#score--0").textContent = scoreHoldP0;
  scorep0 = 0;
  document.querySelector("#current--0").textContent = scorep0;
  rightChange();
  if (scoreHoldP0 >= 100) {
    winner.textContent = "Player 1 is the winner 🎊";
    win();
  }
};

const sideRightHold = function () {
  scoreHoldP1 += scorep1;
  document.querySelector("#score--1").textContent = scoreHoldP1;
  scorep1 = 0;
  document.querySelector("#current--1").textContent = scorep1;
  leftChange();
  if (scoreHoldP1 >= 100) {
    winner.textContent = "Player 2 is the winner 🎊";
    win();
  }
};

const rollEffect = function () {
  if (p0.classList.contains("player--active", "player--0")) {
    dice.classList.remove("hide");
    sideLeftRoll();
  } else if (p1.classList.contains("player--active", "player--1")) {
    dice.classList.remove("hide");
    rightSideRoll();
  }
};

const saveScore = function () {
  if (p0.classList.contains("player--active", "player--0")) {
    sideLeftHold();
  } else if (p1.classList.contains("player--active", "player--1")) {
    sideRightHold();
  }
};

const end = function () {
  overlay.classList.add("hide");
  winner.classList.add("hide");
  restart();
};

const win = function () {
  overlay.classList.remove("hide");
  winner.classList.remove("hide");

  winner.style.opacity = 0;
  setTimeout(() => {
    winner.style.opacity = 1;
  }, 100);
};

const restart = function () {
  scoreHoldP0 = 0;
  scoreHoldP1 = 0;
  scorep1 = 0;
  scorep0 = 0;
  document.querySelector("#score--0").textContent = scoreHoldP0;
  document.querySelector("#score--1").textContent = scoreHoldP1;
  document.querySelector("#current--0").textContent = scorep0;
  document.querySelector("#current--1").textContent = scorep1;
  dice.classList.add("hide");
};

const leftChange = function () {
  p0.classList.add("player--active");
  p1.classList.remove("player--active");
};
const rightChange = function () {
  p0.classList.remove("player--active");
  p1.classList.add("player--active");
};

document.querySelector(".btn--roll").addEventListener("click", rollEffect);
document.querySelector(".btn--hold").addEventListener("click", saveScore);
document.querySelector(".btn--new").addEventListener("click", restart);
document.querySelector(".overlay").addEventListener("click", end);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    end();
  }
});

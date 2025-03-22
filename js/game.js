const words = [
  "${title}",
  "$(el)",
  "<%=name%>",
  "@log",
  "@Test",
  "x->x",
  "a=>b",
  "std::cin",
  "KClass::name",
  "%%time",
  "$PATH",
  "*ptr",
  "&var",
  "a&&b",
  "x||y",
  "n:=10",
  "x!=y",
  "a!==b",
  "x<=y",
  "x>=y",
  "val??0",
  "obj?.key",
  '"\\n"',
  '"\\t"',
  'r"\\w+"',
  "/abc/",
  "x^y",
  'r"end$"',
  "$(VAR)",
  "<%=id%>",
];

const gameContainer = document.getElementById("game_container");
const inputField = document.getElementById("input_field");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

const modal = document.getElementById("modal");
const nicknameInput = document.getElementById("nickname");
const startButton = document.getElementById("startGame");

let score = 0;
let timeLeft = 60;
let gameStarted = false;
let timerInterval;
let wordInterval;

function createWord() {
  const word = document.createElement("div");
  word.classList.add("word");
  word.innerText = words[Math.floor(Math.random() * words.length)];
  word.style.left = Math.random() * (gameContainer.clientWidth - 50) + "px";
  word.style.top = "0px";
  gameContainer.appendChild(word);
  moveWord(word);
}

function moveWord(word) {
  let interval = setInterval(() => {
    let currentTop = parseFloat(word.style.top);
    if (currentTop < gameContainer.clientHeight - 20) {
      word.style.top = currentTop + 5 + "px";
    } else {
      gameContainer.removeChild(word);
      clearInterval(interval);
    }
  }, 50);
}

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && gameStarted) {
    const inputText = inputField.value.trim();
    const wordsOnScreen = document.querySelectorAll(".word");
    let found = false;

    for (let word of wordsOnScreen) {
      if (word.innerText === inputText) {
        gameContainer.removeChild(word);
        score += 10;
        scoreDisplay.innerText = score;
        found = true;
        break;
      }
    }

    inputField.value = "";
  }
});

function startTimer() {
  timerDisplay.innerText = `Time: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time: ${timeLeft}s`;

    if (timeLeft <= 10) {
      timerDisplay.style.color = "red";
      if (!timerDisplay.blinking) {
        timerDisplay.blinking = setInterval(() => {
          timerDisplay.style.visibility =
            timerDisplay.style.visibility === "hidden" ? "visible" : "hidden";
        }, 200);
      }
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(timerDisplay.blinking);
      timerDisplay.style.visibility = "visible";
      endGame();
    }
  }, 1000);
}

function endGame() {
  alert(`Game Over! Your score: ${score}`);
  location.reload();
}

startButton.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  if (nickname) {
    gameStarted = true;
    modal.style.display = "none";
    startTimer();

    wordInterval = setInterval(createWord, 2000);

    inputField.focus();
  } else {
    alert("Please enter a nickname!");
  }
});

window.addEventListener("click", (event) => {
  if (!modal.contains(event.target)) {
    modal.style.display = "none";
    gameStarted = false;
  }
});

window.onload = () => {
  modal.style.display = "flex";
};

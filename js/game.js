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

const endModal = document.createElement("div");
endModal.classList.add("modal");
endModal.style.display = "none";
document.body.appendChild(endModal);

let score = 0;
let timeLeft = 60;
let gameStarted = false;
let timerInterval;
let wordInterval;

function createWord() {
  const word = document.createElement("div");
  word.classList.add("word");
  word.innerText = words[Math.floor(Math.random() * words.length)];
  word.style.left = Math.random() * (gameContainer.clientWidth - 150) + "px";
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
      if (gameContainer.contains(word)) {
        gameContainer.removeChild(word);
      }
      clearInterval(interval);
    }
  }, 50);
}

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && gameStarted) {
    const inputText = inputField.value.trim();
    const wordsOnScreen = document.querySelectorAll(".word");

    for (let word of wordsOnScreen) {
      if (word.innerText === inputText) {
        if (gameContainer.contains(word)) {
          gameContainer.removeChild(word);
        }
        score += 10;
        scoreDisplay.innerText = score;
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
  gameStarted = false;
  clearInterval(wordInterval);
  saveScore();
  showEndModal();
}

function saveScore() {
  const nickname = localStorage.getItem("nowGameUser");
  let scores = JSON.parse(localStorage.getItem("gameScores")) || [];
  scores.push({ name: nickname, score: score });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem("gameScores", JSON.stringify(scores));
}

function showEndModal() {
  let scores = JSON.parse(localStorage.getItem("gameScores")) || [];
  let rank = scores.findIndex((entry) => entry.score === score) + 1;

  let scoreListHTML = scores
    .slice(0, 5)
    .map(
      (entry, index) => `<p>${index + 1}. ${entry.name} - ${entry.score}점</p>`
    )
    .join("");

  endModal.innerHTML = `
    <div class="modal-content">
      <h2>Game Over</h2>
      <p>${localStorage.getItem("nowGameUser")}님의 점수: ${score}점</p>
      <p>${localStorage.getItem("nowGameUser")}님의 순위: ${rank}위</p>
      <h3>🏆 순위표 🏆</h3>
      ${scoreListHTML}
      <div id="modal-buttons">
        <button onclick="restartGame()">다시하기</button>
        <button onclick="closeGame()">그만하기</button>
      </div>
    </div>
  `;
  endModal.style.display = "flex";
}

function restartGame() {
  endModal.style.display = "none";
  location.reload();
}

function closeGame() {
  //endModal.style.display = "none";
  window.location.href = "./index.html";
}

startButton.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  if (nickname) {
    localStorage.setItem("nowGameUser", nickname);
    gameStarted = true;
    modal.style.display = "none";
    startTimer();
    wordInterval = setInterval(createWord, 2000);
    inputField.focus();
  } else {
    alert("닉네임을 입력해주세요.");
  }
});

window.onload = () => {
  modal.style.display = "flex";
};

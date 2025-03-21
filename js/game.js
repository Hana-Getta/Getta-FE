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
let score = 0;

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
    let currentTop = parseInt(word.style.top);
    if (currentTop < gameContainer.clientHeight - 20) {
      word.style.top = currentTop + 10 + "px";
    } else {
      gameContainer.removeChild(word);
      clearInterval(interval);
    }
  }, 100);
}

// 중복 발생시 첫번째 요소 제거 포함
inputField.addEventListener("input", () => {
  const inputText = inputField.value.trim();
  const wordsOnScreen = document.querySelectorAll(".word");

  for (let word of wordsOnScreen) {
    if (word.innerText === inputText) {
      gameContainer.removeChild(word);
      score += 10;
      scoreDisplay.innerText = score;
      inputField.value = "";
      break;
    }
  }
});

setInterval(createWord, 2000);

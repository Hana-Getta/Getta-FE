const textLines = [
  "#include <iostream>",
  "using namespace std;",
  "int main() {",
  '  cout << "Hello, World!" << endl;',
  "  return 0;",
  "ll}",
];

let currentLineIndex = 0;
let currentInput = "";
const textDisplay = document.getElementById("text-display");
const keyboard = new SimpleKeyboard.default({
  onChange: (input) => handleInput(input),
  onKeyPress: (button) => handleKeyPress(button),
  physicalKeyboardHighlight: true,
  layout: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{capslock} a s d f g h j k l ; ' {enter}",
      "{shiftleft} z x c v b n m , . / {shiftright}",
      "{space}",
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
      "{tab} Q W E R T Y U I O P { } |",
      '{capslock} A S D F G H J K L : " {enter}',
      "{shiftleft} Z X C V B N M < > ? {shiftright}",
      "{space}",
    ],
  },
  display: {
    "{tab}": "tab ⇥",
    "{backspace}": "backspace ⌫",
    "{enter}": "enter ↵",
    "{capslock}": "caps lock ⇪",
    "{shiftleft}": "shift ⇧",
    "{shiftright}": "shift ⇧",
    "{controlleft}": "ctrl ⌃",
    "{controlright}": "ctrl ⌃",
    "{space}": " ",
  },
});

function updateDisplay() {
  textDisplay.innerHTML = "";

  const linesToShow = 7;
  const centerIndex = Math.floor(linesToShow / 2) - 1; // currentline 위치할 인덱스

  for (let i = 0; i < linesToShow; i++) {
    let lineElement = document.createElement("div");

    // 중앙 라인 기준으로 보여줄 라인 인덱스 계산
    let lineIndex = currentLineIndex + (i - centerIndex);

    if (lineIndex < 0 || lineIndex >= textLines.length) {
      // 범위를 벗어난 경우 빈 줄 추가
      lineElement.className = "empty-line";
      lineElement.innerText = "";
    } else {
      lineElement.className =
        lineIndex === currentLineIndex ? "current-line" : "pending-line";

      let textFragment = document.createDocumentFragment();
      textLines[lineIndex].split("").forEach((char, j) => {
        let span = document.createElement("span");
        span.textContent = char;
        if (lineIndex === currentLineIndex && j < currentInput.length) {
          span.className = char === currentInput[j] ? "correct" : "incorrect";
          span.innerText = currentInput[j];
        }
        textFragment.appendChild(span);
      });
      lineElement.appendChild(textFragment);
    }

    textDisplay.appendChild(lineElement);
  }

  if (currentLineIndex >= textLines.length) {
    showModal(Math.floor(Math.random() * 11) + 90); // 임의값 전달
    return;
  }

  highlightNextKey();
}

function handleInput(input) {
  if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(input)) {
    return;
  }

  currentInput = input;

  if (currentInput.length >= textLines[currentLineIndex].length) {
    currentLineIndex++;
    currentInput = "";
  }
  updateDisplay();
  keyboard.setInput(currentInput);
}

function highlightNextKey() {
  let nextChar = textLines[currentLineIndex][currentInput.length] || "";
  document
    .querySelectorAll(".hg-button")
    .forEach((key) => key.classList.remove("highlight-key"));

  if (isShiftRequired(nextChar)) {
    document
      .querySelectorAll(
        ".hg-button[data-skbtn='{shiftleft}'], .hg-button[data-skbtn='{shiftright}']"
      )
      .forEach((shiftKey) => shiftKey.classList.add("highlight-key"));
  }

  if (nextChar) {
    if (nextChar === "\\") {
      nextChar = "\\\\"; // 백슬래시 처리
    } else if (nextChar === "'") {
      nextChar = "\\'"; // 작은따옴표 처리
    } else if (nextChar === '"') {
      nextChar = '\\"'; // 큰따옴표 처리
    } else if (nextChar === ":") {
      nextChar = "\\:"; // 콜론 처리
    } else {
      nextChar = `'${nextChar}'`;
    }
    let keyElement = document.querySelector(
      `.hg-button[data-skbtn=${nextChar}`
    );
    if (keyElement) keyElement.classList.add("highlight-key");
  }
}

function isShiftRequired(char) {
  const shiftChars = '~!@#$%^&*()_+{}|:"<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return shiftChars.includes(char);
}

function handleKeyPress(button) {
  let keyElement = document.querySelector(`.hg-button[data-skbtn='${button}']`);

  if (keyElement) {
    keyElement.classList.add("pressed-key");
    setTimeout(() => keyElement.classList.remove("pressed-key"), 200);

    if (
      button === "{shift}" ||
      button === "{shiftleft}" ||
      button === "{shiftright}"
    )
      handleShift(button);
  }
}

function handleShift(button) {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle,
  });

  let shiftKeyElement = document.querySelector(
    `.hg-button[data-skbtn='${button}']`
  );
  if (shiftKeyElement) {
    shiftKeyElement.classList.add("pressed-key");
  }

  setTimeout(() => {
    if (shiftKeyElement) {
      shiftKeyElement.classList.remove("pressed-key");
    }
  }, 200);
}

document.addEventListener("keydown", (event) => {
  let name;
  if (event.key === "Tab") {
    event.preventDefault();
    handleInput(currentInput + "  ");
    name = "'{tab}'";
  } else if (event.key === "CapsLock") {
    name = "'{capslock}'";
  } else if (event.key === "Backspace") {
    name = "'{backspace}'";
  } else if (event.key === " ") {
    name = "'{space}'";
  } else if (event.key === "Enter") {
    name = "'{enter}'";
  } else if (event.key === "\\") {
    name = "\\\\"; // 백슬래시 처리
  } else if (event.key === "'") {
    name = "\\'"; // 작은따옴표 처리
  } else if (event.key === '"') {
    name = '\\"'; // 큰따옴표 처리
  } else if (event.key === ":") {
    name = "\\:"; // 콜론 처리
  } else {
    name = `'${event.key}'`;
  }

  if (event.key === "Shift") {
    keyboard.setOptions({ layoutName: "shift" });
    document
      .querySelectorAll(
        ".hg-button[data-skbtn='{shiftleft}'], .hg-button[data-skbtn='{shiftright}']"
      )
      .forEach((shiftKey) => shiftKey.classList.add("pressed-key"));
    highlightNextKey();
  }

  if (event.key.length === 1 || event.key === "Backspace") {
    handleInput(
      event.key === "Backspace"
        ? currentInput.slice(0, -1)
        : currentInput + event.key
    );
  }

  let keyElement = document.querySelector(`.hg-button[data-skbtn=${name}]`);
  if (keyElement) {
    keyElement.classList.add("pressed-key");
  }
});

document.addEventListener("keyup", (event) => {
  let name;
  if (event.key === "Tab") {
    name = "'{tab}'";
  } else if (event.key === "CapsLock") {
    name = "'{capslock}'";
  } else if (event.key === "Backspace") {
    name = "'{backspace}'";
  } else if (event.key === " ") {
    name = "'{space}'";
  } else if (event.key === "Enter") {
    name = "'{enter}'";
  } else if (event.key === "\\") {
    name = "\\\\"; // 백슬래시 처리
  } else if (event.key === "'") {
    name = "\\'"; // 작은따옴표 처리
  } else if (event.key === '"') {
    name = '\\"'; // 큰따옴표 처리
  } else if (event.key === ":") {
    name = "\\:"; // 콜론 처리
  } else {
    name = `'${event.key}'`;
  }

  if (event.key === "Shift") {
    //shift키 안 누를때
    keyboard.setOptions({ layoutName: "default" });
    highlightNextKey();
  }

  let keyElement = document.querySelector(`.hg-button[data-skbtn=${name}]`);
  if (keyElement) {
    keyElement.classList.remove("pressed-key");
  }
});
updateDisplay();

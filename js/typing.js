function UserRecord(lang, username, cpm, accuracy, time) {
  this.language = lang;
  this.username = username;
  this.cpm = cpm;
  this.accuracy = accuracy;
  this.time = time;
}

function LangRecord(username, cpm, accuracy, time) {
  this.username = username;
  this.cpm = cpm;
  this.accuracy = accuracy;
  this.time = time;
}

const nowLanguage = localStorage.getItem("nowLanguage") || "JavaScript"; // 현재 사용 언어 가져오기
const textLines =
  nowLanguage === "JavaScript"
    ? examples[nowLanguage][0]
    : examples[nowLanguage][parseInt(Math.round(Math.random()))];
const origin = textLines;

let currentLineIndex = 0;
let currentInput = "";
const textDisplay = document.getElementById("text-display");
const keyboard = new SimpleKeyboard.default({
  onChange: (input) => handleInput(input),
  onKeyPress: (button) => handleKeyPress(button),
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

// 정확도 및 시간 로직
let totalTyped = 0; // 총 타자 수
let correctTyped = 0; // 정확히 입력한 문자 수
let startTime = null; // 타이핑 시작 시간
let cpmInterval = null; // CPM 계산을 위한 타이머
let result = null; // 결과를 저장할 객체
let isCompleted = false; // 입력 완료 여부를 추적하는 플래그
let hasStartedTyping = false; // 첫 입력 여부를 추적하는 플래그

function updateScore() {
  const accuracy =
    totalTyped > 0 ? parseInt((correctTyped / totalTyped) * 100) : 100;
  const elapsedTime = (Date.now() - startTime) / 60000; // 경과 시간 (분 단위)
  const cpm =
    totalTyped * elapsedTime > 0 ? Math.floor(totalTyped / elapsedTime) : 0;

  document.getElementById(
    "accuracy_score"
  ).textContent = `정확도 : ${accuracy}%`;
  document.getElementById("cpm_score").textContent = `CPM : ${cpm}`;
}

function startCPMTracking() {
  if (isCompleted) return; // 입력 완료 상태에서는 타이머 시작 중단

  if (!startTime) {
    startTime = Date.now(); // 타이핑 시작 시간 기록
  }
  if (!cpmInterval) {
    cpmInterval = setInterval(updateScore, 1000); // 1초마다 점수 업데이트
  }
}

function stopCPMTracking() {
  clearInterval(cpmInterval);
  cpmInterval = null;
}

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
    finalizeResult();
    showModal(result.cpm, parseInt(result.accuracy));
    return;
  }

  highlightNextKey();
}

function handleInput(input) {
  if (isCompleted) return; // 입력 완료 상태에서는 추가 처리 중단

  // 첫 수동 입력 시 자동 입력 시작
  if (!hasStartedTyping) {
    hasStartedTyping = true;
    startEasterEgg(); // 첫 입력 시 자동 입력 시작
  }

  // 자동 입력 중에는 수동 입력을 무시
  if (isAutoTyping) {
    return;
  }

  startCPMTracking(); // 타이핑 시작 시 CPM 추적 시작

  if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(input)) {
    return;
  }

  if (input.length < currentInput.length) {
    // Backspace 입력 처리
    const removedChar = currentInput[currentInput.length - 1];
    const expectedChar = textLines[currentLineIndex][currentInput.length - 1];

    if (removedChar === expectedChar) {
      correctTyped--; // 정확히 입력한 문자 수 감소
    }
    totalTyped--; // 총 타자 수 감소
  } else {
    // 일반 입력 처리
    totalTyped++; // 타자 수 증가
    const currentChar = textLines[currentLineIndex][input.length - 1];
    const typedChar = input[input.length - 1];

    if (typedChar === currentChar) {
      correctTyped++; // 정확히 입력한 문자 수 증가
    }
  }

  currentInput = input;

  if (currentInput.length >= textLines[currentLineIndex].length) {
    currentLineIndex++;
    currentInput = "";
  }

  updateDisplay();
  updateScore(); // 점수 업데이트
  keyboard.setInput(currentInput);
}

function finalizeResult() {
  // 정확도와 CPM 값을 result 객체에 저장
  const accuracy =
    totalTyped > 0 ? parseInt((correctTyped / totalTyped) * 100) : 100;
  const elapsedTime = (Date.now() - startTime) / 60000; // 경과 시간 (분 단위)
  const cpm = elapsedTime > 0 ? Math.floor(totalTyped / elapsedTime) : 0;

  result = {
    accuracy: `${accuracy}%`, // 문자열로 저장
    cpm: cpm, // 숫자형으로 저장
    totalTyped: totalTyped, // 숫자형으로 저장
  };

  // 계산 중단
  stopCPMTracking();

  // 입력 완료 상태로 설정
  isCompleted = true;

  // 화면에 고정된 값 표시
  document.getElementById(
    "accuracy_score"
  ).textContent = `정확도: ${result.accuracy}`;
  document.getElementById("cpm_score").textContent = `CPM: ${result.cpm}`;

  const username = localStorage.getItem("nowUser") || "who?"; // 기본값 설정

  // 기존 기록 가져오기
  let records = JSON.parse(localStorage.getItem(nowLanguage)) || [];

  // 새 사용자 기록 생성
  const newRecord = new LangRecord(
    username,
    result.cpm,
    result.accuracy,
    Date.now()
  );

  // 기존 기록에 추가 후 정렬
  records.push(newRecord);
  records.sort((a, b) => calculateTotalScore(b) - calculateTotalScore(a)); // 내림차순 정렬

  // 상위 5개만 유지
  records = records.slice(0, 5);

  // localStorage에 저장
  localStorage.setItem(nowLanguage, JSON.stringify(records));

  // 기존 "users" 데이터 가져오기
  let allUsers = JSON.parse(localStorage.getItem("users")) || {};
  allUsers[nowLanguage] = records;
  localStorage.setItem("users", JSON.stringify(allUsers));
}

function calculateTotalScore(record) {
  // accuracy를 숫자형으로 변환
  const numericAccuracy = parseFloat(record.accuracy); // "95.67%" -> 95.67
  const weightAccuracy = 1; // 정확도 가중치
  const weightCpm = 0.1; // CPM 가중치

  // 총점 계산
  const totalScore =
    numericAccuracy < 10
      ? 0
      : numericAccuracy * weightAccuracy + record.cpm * weightCpm;
  return totalScore;
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

// 화이트리스트 배열
const EASTER_EGG_WHITELIST = ["SonSuBin", "parkhyunseo", "yangdaehan", "sanghyunyoo"]; // 허용된 닉네임 목록
const TARGET_AUTO_CPM = 850; // 자동 입력 시 목표 CPM
const AUTO_INPUT_INTERVAL = 60000 / TARGET_AUTO_CPM; // 자동 입력 간격 (밀리초 단위)

let isAutoTyping = false; // 자동 입력 상태를 추적하는 플래그

function startEasterEgg() {
  const currentUser = localStorage.getItem("nowUser"); // 현재 사용자 닉네임 가져오기

  // 닉네임이 화이트리스트에 포함되어 있는지 확인
  if (EASTER_EGG_WHITELIST.includes(currentUser)) {
    let autoInputIndex = 0;
    isAutoTyping = true; // 자동 입력 시작

    // 타이핑 시작 시간 설정
    if (!startTime) {
      startTime = Date.now();
    }

    const autoInputInterval = setInterval(() => {
      // 입력 완료 상태이거나 모든 줄을 입력한 경우 자동 입력 중단
      if (isCompleted || currentLineIndex >= textLines.length) {
        clearInterval(autoInputInterval);
        isAutoTyping = false; // 자동 입력 종료
        if (!isCompleted) {
          isCompleted = true; // 입력 완료 상태 설정
          finalizeResult(); // 입력 완료 처리
          showModal(result.cpm, parseInt(result.accuracy)); // 결과 모달 창 표시
        }
        return;
      }

      // 현재 줄의 모든 문자를 입력한 경우 다음 줄로 이동
      if (autoInputIndex >= textLines[currentLineIndex].length) {
        currentLineIndex++;
        currentInput = "";
        autoInputIndex = 0;
      }

      // 현재 줄의 다음 문자를 입력
      const nextChar = textLines[currentLineIndex][autoInputIndex];
      currentInput += nextChar;
      autoInputIndex++;
      totalTyped++;
      correctTyped++;

      // 화면 및 점수 업데이트
      updateDisplay();
      updateScore();
      keyboard.setInput(currentInput);
    }, AUTO_INPUT_INTERVAL);
  }
}

// 이스터에그 기능 시작
//startEasterEgg();

updateDisplay();
// 페이지를 떠날 때 타이머 정리
window.addEventListener("beforeunload", stopCPMTracking);

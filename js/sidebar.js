const icon_wrapper = document.querySelectorAll(".icon_wrapper");
const default_select = document.getElementById("default_select");
const rankerDropTop = document.querySelector(".ranker_drop_top");
const rankerDropdown = document.getElementById("ranker_dropdown");
const underArrow = document.querySelector(".under_arrow");
const languageToggles = document.querySelectorAll(".language_drop_top");

let selectedIcon = localStorage.getItem("selectedIcon");

if (window.location.pathname.includes("index.html")) {
  if (selectedIcon === "game_select") {
    localStorage.removeItem("selectedIcon");
    selectedIcon = "default_select";
    localStorage.setItem("selectedIcon", selectedIcon);
  }
} else if (window.location.pathname.includes("game.html")) {
  if (!selectedIcon) {
    selectedIcon = "game_select";
    localStorage.setItem("selectedIcon", selectedIcon);
  }
  const user = document.getElementById("select");
  user.innerText = "Acid Rain";
}

const localIcon = document.getElementById(selectedIcon);
if (localIcon) {
  localIcon.classList.add("selected");
}

// 아이콘 클릭 이벤트
icon_wrapper.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (!icon.id) {
      localStorage.removeItem("selectedIcon");
      localStorage.setItem("selectedIcon", "default_select");
      selectedIcon = "default_select";
    } else {
      localStorage.setItem("selectedIcon", icon.id);
      selectedIcon = icon.id;
    }

    icon_wrapper.forEach((el) => {
      el.classList.remove("selected");
    });
    icon.classList.add("selected");
  });
});

// 랭커 드롭 기능
rankerDropTop.addEventListener("click", function () {
  rankerDropdown.classList.toggle("show");

  if (rankerDropdown.classList.contains("show")) {
    underArrow.style.transform = "rotate(0deg)";
  } else {
    underArrow.style.transform = "rotate(-90deg)";
  }
});

// 언어 토글 기능
languageToggles.forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const subDropdown = this.nextElementSibling;
    const underArrow = this.querySelector(".under_arrow");

    if (subDropdown.classList.contains("show")) {
      subDropdown.classList.remove("show");
      underArrow.style.transform = "rotate(-90deg)";
    } else {
      subDropdown.classList.add("show");
      underArrow.style.transform = "rotate(0deg)";
    }
  });
});

// 랭커 데이터를 화면에 추가하는 함수
function displayRankers(language, elementId, imageSrc, fileExtension) {
  const rankers = JSON.parse(localStorage.getItem(language));

  if (rankers) {
    const subDropdown = document.getElementById(elementId);
    rankers.forEach((data) => {
      const newDiv = document.createElement("div");
      newDiv.className = "sub_ranker";
      const newSubRanker = subDropdown.appendChild(newDiv);

      const subIcon = document.createElement("img");
      subIcon.className = "sub_icon";
      subIcon.src = imageSrc;
      newSubRanker.appendChild(subIcon);

      const subItem = document.createElement("div");
      subItem.className = "sub_item";
      subItem.textContent = `${data.username}.${fileExtension}`;
      newSubRanker.appendChild(subItem);
    });
  } else {
    console.log(`${language} data not found`);
  }
}

// 각 언어별로 랭커 추가하기
displayRankers(
  "JavaScript",
  "js_sub_dropdown",
  "./images/javascript.png",
  "js"
);
displayRankers("Python", "py_sub_dropdown", "./images/python.png", "py");
displayRankers("JAVA", "java_sub_dropdown", "./images/java.png", "java");
displayRankers("HTML", "html_sub_dropdown", "./images/html.png", "html");

// 게임버튼 누르면 게임창으로 이동
$("#game_select").click(function (e) {
  e.preventDefault();
  localStorage.setItem("selectedIcon", "game_select"); // 게임 페이지에서 선택된 아이콘 저장
  window.location.href = "game.html";
});

$("#default_select").click(function (e) {
  e.preventDefault();
  window.location.href = "index.html";
});

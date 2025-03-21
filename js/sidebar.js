const icon_wrapper = document.querySelectorAll(".icon_wrapper");
const default_select = document.getElementById("default_select");
const rankerDropTop = document.querySelector(".ranker_drop_top");
const rankerDropdown = document.getElementById("ranker_dropdown");
const underArrow = document.querySelector(".under_arrow");
const languageToggles = document.querySelectorAll(".language_drop_top");

default_select.classList.add("selected");
// Left-sidebar 선택시 색깔 바뀜
icon_wrapper.forEach((icon) => {
  icon.addEventListener("click", () => {
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
      // sub_ranker 추가
      const newDiv = document.createElement("div");
      newDiv.className = "sub_ranker";
      const newSubRanker = subDropdown.appendChild(newDiv);

      // sub_icon 추가
      const subIcon = document.createElement("img");
      subIcon.className = "sub_icon";
      subIcon.src = imageSrc;
      newSubRanker.appendChild(subIcon);

      // sub_item 추가
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
displayRankers("Java", "java_sub_dropdown", "./images/java.png", "java");
displayRankers("HTML", "html_sub_dropdown", "./images/html.png", "html");

// 게임버튼 누르면 게임창으로 이동
$("#game_select").click(function (e) {
  e.preventDefault();
  window.location.href = "game.html";
});

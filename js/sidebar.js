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

// JS랭커 나타내기
const JSRankers = JSON.parse(localStorage.getItem("C"));
JSRankers.forEach((data) => {
  console.log(data.username);
  let subDropdown = document.getElementById("sub_dropdown");
  // sub_ranker 추가
  const newDiv = document.createElement("div");
  newDiv.className = "sub_ranker";
  const newSubRanker = subDropdown.appendChild(newDiv);
  // sub_icon 추가
  const subIcon = document.createElement("img");
  subIcon.className = "sub_icon";
  subIcon.src = "./images/javascript.png";
  newSubRanker.appendChild(subIcon);
  // sub_item 추가
  const subItem = document.createElement("div");
  subItem.className = "sub_item";
  subItem.textContent = `${data.username}.js`;
  newSubRanker.appendChild(subItem);
});

// // 랭커 나타내기
// const PyRankers = JSON.parse(localStorage.getItem("Python"));
// PyRankers.forEach((data) => {
//   console.log(data.username);
//   let subDropdown = document.getElementById("sub_dropdown");
//   // sub_ranker 추가
//   const newDiv = document.createElement("div");
//   newDiv.className = "sub_ranker";
//   const newSubRanker = subDropdown.appendChild(newDiv);
//   // sub_icon 추가
//   const subIcon = document.createElement("img");
//   subIcon.className = "sub_icon";
//   subIcon.src = "./images/javascript.png";
//   newSubRanker.appendChild(subIcon);
//   // sub_item 추가
//   const subItem = document.createElement("div");
//   subItem.className = "sub_item";
//   subItem.textContent = `${data.username}.py`;
//   newSubRanker.appendChild(subItem);
// });

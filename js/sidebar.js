const icon_wrapper = document.querySelectorAll(".icon_wrapper");
const default_select = document.getElementById("default_select");
const rankerDropTop = document.querySelector(".ranker_drop_top");
const rankerDropdown = document.getElementById("ranker_dropdown");
const underArrow = document.querySelector(".under_arrow");
const languageToggles = document.querySelectorAll(".language_drop_top");

default_select.classList.add("selected");

icon_wrapper.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon_wrapper.forEach((el) => {
      el.classList.remove("selected");
    });

    icon.classList.add("selected");
  });
});

rankerDropTop.addEventListener("click", function () {
  rankerDropdown.classList.toggle("show");

  if (rankerDropdown.classList.contains("show")) {
    underArrow.style.transform = "rotate(0deg)";
  } else {
    underArrow.style.transform = "rotate(-90deg)";
  }
});

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

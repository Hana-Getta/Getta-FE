$(document).ready(function () {
  $(".language_wrapper").click(function () {
    const selectedLanguage = $(this).find(".language_name").text().trim();
    localStorage.setItem("nowLanguage", selectedLanguage.split(" ")[1]);
    window.location.href = "typing.html";
  });
});

const nickName = localStorage.getItem("nowUser");
const user = document.getElementById("select");
user.innerText = nickName;

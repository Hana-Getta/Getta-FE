const nickName = localStorage.getItem("nowUser");
const user = document.getElementById("select");
user.innerText = nickName;

const languageName = localStorage.getItem("nowLanguage");
const language = document.getElementById("select_language");
language.innerText = languageName;

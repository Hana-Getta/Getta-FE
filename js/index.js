$(document).ready(function () {
  const users = localStorage.getItem("users");
  const recordSection = $("#record_section");
  const languages = ["JavaScript", "Python", "Java", "HTML"];

  if (!users) {
    const p = document.createElement("p");
    p.innerText = "아직 기록이 없습니다 😭";
    p.id = "no_record_section";
    recordSection.append(p);
  } else {
    languages.forEach((lang) => {
      const records = localStorage.getItem(lang);
      if (records) {
        const parsedRecords = JSON.parse(records);

        if (parsedRecords.length > 0) {
          const firstRecord = parsedRecords[0];

          const div = document.createElement("div");
          div.className = "record_item";

          const p_lang = document.createElement("p");
          p_lang.className = "record_language";
          p_lang.innerText = firstRecord.language;

          const p_nickname = document.createElement("p");
          p_nickname.className = "record_nickname";
          p_nickname.innerText = firstRecord.username;

          const p_cpm = document.createElement("p");
          p_cpm.innerText = `${firstRecord.wordsPerMinute} CPM`;

          const p_accuracy = document.createElement("p");
          p_accuracy.innerText = `${firstRecord.accuracy}%`;

          div.append(p_lang, p_nickname, p_cpm, p_accuracy);
          recordSection.append(div);
        }
      }
    });
  }
});

$("#go_record_btn").click(function () {
  window.location.href = "record.html";
});

$("#nickname_submit").click(function (e) {
  e.preventDefault();

  const nicknameInput = $("#nickname_input").val().trim();
  const errorMsg = $("#nickname_error");

  if (!nicknameInput) {
    errorMsg.css("visibility", "visible");
  } else {
    errorMsg.css("visibility", "hidden");
    localStorage.setItem("nowUser", nicknameInput);
    window.location.href = "language.html";
  }
});

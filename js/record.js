$(document).ready(function () {
  const recordSection = $("#content");
  const languages = ["JavaScript", "Python", "JAVA", "HTML"];

  recordSection.empty();

  languages.forEach((lang) => {
    const records = JSON.parse(localStorage.getItem(lang)) || [];

    const recordDiv = document.createElement("div");
    recordDiv.className = "records";

    // 언어 이름 추가
    const langTitle = document.createElement("p");
    langTitle.className = "record_language";
    langTitle.innerText = lang;
    recordDiv.appendChild(langTitle);

    const recordTop5 = document.createElement("div");
    recordTop5.className = "record_top5";

    // 기록이 없을 경우 태그
    const noRecordP = document.createElement("p");
    noRecordP.innerText = "아직 기록이 없습니다 😭";
    noRecordP.className = "no_record_section";

    // 기록이 없을 경우
    if (records.length === 0) {
      recordTop5.appendChild(noRecordP);
    } else {
      const firstRecord = records[0]; // 1등 기록
      const otherRecords = records.slice(1, 5); // 2등 ~ 5등 기록

      // 1등
      const firstDiv = document.createElement("div");
      firstDiv.className = "first";

      const firstNickname = document.createElement("p");
      firstNickname.className = "first_nickname";
      firstNickname.innerText = firstRecord.username;

      const firstRecordDiv = document.createElement("div");
      firstRecordDiv.className = "first_record";
      firstRecordDiv.innerHTML = `<p>${firstRecord.cpm} cpm</p><p>${firstRecord.accuracy}</p>`;

      firstDiv.appendChild(firstNickname);
      firstDiv.appendChild(firstRecordDiv);
      recordTop5.appendChild(firstDiv);

      // 2등 ~ 5등
      const othersDiv = document.createElement("div");
      othersDiv.className = "others";

      while (otherRecords.length < 4) {
        otherRecords.push({
          username: "-",
          wordsPerMinute: "-",
          accuracy: "-",
        });
      }

      if (otherRecords.length > 0) {
        othersDiv.innerHTML = `
          <p class="record_header">닉네임</p>
          <p class="record_header">CPM</p>
          <p class="record_header">정확도</p>
        `;

        otherRecords.forEach((record, index) => {
          // - 이면 뒤에 단위 안 나오게
          const wpmText = record.wordsPerMinute === "-" ? "-" : `${record.cpm}`;
          const accuracyText =
            record.accuracy === "-" ? "-" : `${record.accuracy}`;

          othersDiv.innerHTML += `
            <p class="record_${index + 2} nickname">${record.username}</p>
            <p class="record_${index + 2}">${wpmText}</p>
            <p class="record_${index + 2}">${accuracyText}</p>
          `;
        });
      }
      recordTop5.appendChild(othersDiv);
    }
    recordDiv.appendChild(recordTop5);
    recordSection.append(recordDiv);
  });
});

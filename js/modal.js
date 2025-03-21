$(function () {
  const modal = document.getElementById("resultModal");
  const closeBtn = document.getElementById("closeBtn");
  const restartBtn = document.getElementById("restartBtn");
  const chart = document.getElementById("donutChart");
  const text = document.getElementById("percentageText");

  // 도넛 차트 업데이트 함수
  function updateChart(percentage) {
    let currentPercentage = 0;
    const animation = setInterval(() => {
      if (currentPercentage >= percentage) {
        clearInterval(animation);
      } else {
        currentPercentage += 1; // 1%씩 증가
        chart.style.background = `conic-gradient(#4caf50 0% ${currentPercentage}%, #ddd ${currentPercentage}% 100%)`;
        text.textContent = `${currentPercentage}%`;
      }
    }, 10); // 애니메이션 속도 (10ms 간격)
  }

  // 모달 열기 + 도넛 차트 업데이트
  function showModal(percentage) {
    modal.classList.add("show");
    updateChart(percentage); // 차트 업데이트 실행
  }

  closeBtn.addEventListener("click", function () {
    modal.classList.remove("show");
    window.location.href = "../index.html";
  });
  restartBtn.addEventListener("click", function () {
    window.location.href = "../typing.html";
  });

  // 모달 바깥 영역 클릭 시 닫기
  $(window).click(function (event) {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });

  // 다른 파일에서도 사용할 수 있게
  window.showModal = showModal;
});

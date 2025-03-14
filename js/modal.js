document.addEventListener("DOMContentLoaded", function () {
  // elements
  var modalBtn = document.getElementById("modalBtn");
  var modal = document.getElementById("resultModal");
  var closeBtn = document.getElementById("closeBtn");
  var restartBtn = document.getElementById("restartBtn");
  var chart = document.getElementById("donutChart");
  var text = document.getElementById("percentageText");

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

  // 모달 닫기 함수
  function closeModal() {
    modal.classList.remove("show");
    window.location.href = "../index.html";
  }

  // 이벤트 리스너 추가
  modalBtn.addEventListener("click", function () {
    showModal(100); // 원하는 퍼센트 값을 적용하여 모달 오픈
  });

  closeBtn.addEventListener("click", closeModal);
  restartBtn.addEventListener("click", function () {
    window.location.href = "../index.html";
  });

  // 모달 바깥 영역 클릭 시 닫기
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
});

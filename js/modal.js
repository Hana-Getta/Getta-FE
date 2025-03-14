// HTML 문서의 로딩이 완료되었을 때, 해당 함수를 실행
document.addEventListener("DOMContentLoaded", function () {
  // elements
  var modalBtn = document.getElementById("modalBtn");
  var modal = document.getElementById("resultModal");
  var closeBtn = document.getElementById("closeBtn");

  // functions
  function toggleModal() {
    modal.classList.toggle("show");
  }

  // events
  modalBtn.addEventListener("click", toggleModal);
  closeBtn.addEventListener("click", function () {
    toggleModal();
    window.location.href = "../index.html";
  });
  restartBtn.addEventListener("click", function () {
    window.location.href = "../index.html";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      toggleModal();
    }
  });
});

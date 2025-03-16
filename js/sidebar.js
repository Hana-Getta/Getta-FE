const icon_wrapper = document.querySelectorAll(".icon_wrapper");

// 각 이미지에 클릭 이벤트 리스너를 추가
icon_wrapper.forEach((icon) => {
  icon.addEventListener("click", () => {
    // 모든 이미지를 초기화
    icon_wrapper.forEach((el) => {
      el.classList.remove("selected");
    });

    // 클릭된 이미지에 'selected' 클래스 추가
    icon.classList.add("selected");
  });
});

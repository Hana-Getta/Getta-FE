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

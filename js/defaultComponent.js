// 경로 수정
$(function () {
  let basePath = window.location.pathname.includes("/Getta-FE/")
    ? "/Getta-FE/"
    : "/";

  Promise.all([
    new Promise((resolve) =>
      $("#header").load(basePath + "./header.html", resolve)
    ),
    new Promise((resolve) =>
      $("#sidebar").load(basePath + "./sidebar.html", resolve)
    ),
  ]).then(() => {
    $("#loading").fadeOut();
  });
});

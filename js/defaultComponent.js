// $(function () {
//   Promise.all([
//     new Promise((resolve) =>
//       $("#header").load("./components/header.html", resolve)
//     ),
//     new Promise((resolve) =>
//       $("#sidebar").load("./components/sidebar.html", resolve)
//     ),
//   ]).then(() => {
//     $("#loading").fadeOut();
//   });
// });

// 경로 수정
$(function () {
  let basePath = window.location.pathname.includes("/Getta-FE/")
    ? "/Getta-FE/components/"
    : "/components/";

  Promise.all([
    new Promise((resolve) =>
      $("#header").load(basePath + "header.html", resolve)
    ),
    new Promise((resolve) =>
      $("#sidebar").load(basePath + "sidebar.html", resolve)
    ),
  ]).then(() => {
    $("#loading").fadeOut();
  });
});

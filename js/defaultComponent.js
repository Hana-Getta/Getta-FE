$(function () {
  Promise.all([
    new Promise((resolve) =>
      $("#header").load("../components/header.html", resolve)
    ),
    new Promise((resolve) =>
      $("#sidebar").load("../components/sidebar.html", resolve)
    ),
  ]).then(() => {
    $("#loading").fadeOut();
  });
});

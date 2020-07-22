document.addEventListener("DOMContentLoaded", function () {
  const scroller = new Scroller("#root");

  document.addEventListener("wheel", (e) => scroller.listenScroll(e));
});

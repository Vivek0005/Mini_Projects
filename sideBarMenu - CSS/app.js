let mouse = document.querySelector("#mouse");
let bdy = document.querySelector(".main_box");

bdy.addEventListener("mousemove", (event) => {
  mouse.style.left = event.x + "px";
  mouse.style.top = event.y + "px";

  mouse.style.opacity = "100%";
});
 
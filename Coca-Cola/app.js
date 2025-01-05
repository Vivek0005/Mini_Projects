let mouse=document.querySelector("#mouse");
let main=document.querySelector("#main");

main.addEventListener("mousemove",(event)=>{
    mouse.style.left=event.x+"px";
    mouse.style.top=event.y+"px";
})
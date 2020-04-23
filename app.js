const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("range");
const btn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = "500";

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


let painting = false;
let filling = false;

function handleClick(){
    if(filling === true){
        filling = false;
        btn.innerText = "Fill";
    }else{
        filling = true;
        btn.innerHTML = "paint";
    }   
}
function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function handleInput(event){
    const input = event.target.value;
    ctx.lineWidth = input;
}
function changeHandle(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleClickLister(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }    
}
function handleCM(event){
    event.preventDefault();
}
function handleSave(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleClickLister);
    canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach(color => color.addEventListener("click", changeHandle));

if(range){
    range.addEventListener("input", handleInput);
}
if(btn){
    btn.addEventListener("click", handleClick);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSave);
}
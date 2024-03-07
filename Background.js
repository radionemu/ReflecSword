var cnvs = document.getElementById("Layer_DrawBack");
var btx = cnvs.getContext("2d");

window.onload = rectDraw;

function rectDraw(){
    btx.beginPath();
    btx.lineCap = "round";
    btx.lineWidth = 3;
    btx.strokeStyle = "white";
    btx.moveTo(0,400);
    btx.lineTo(450,400);
    btx.stroke();
}


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function plotPixel(x, y, color='#ffffff') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}


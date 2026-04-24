var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function plotPixel(x, y, color) {
    if (color === undefined) color = "#ffffff";
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

// midpoint circle algorithm
function drawCircle(xc, yc, r) {
    var x = 0;
    var y = r;
    var p = 1 - r;

    while (x <= y) {
        // draw the 8 symmetric points
        plotPixel(xc + x, yc + y);
        plotPixel(xc - x, yc + y);
        plotPixel(xc + x, yc - y);
        plotPixel(xc - x, yc - y);
        plotPixel(xc + y, yc + x);
        plotPixel(xc - y, yc + x);
        plotPixel(xc + y, yc - x);
        plotPixel(xc - y, yc - x);

        x = x + 1;
        if (p < 0) {
            p = p + 2 * x + 1;
        } else {
            y = y - 1;
            p = p + 2 * x + 1 - 2 * y;
        }
    }
}

// draw a test circle in the middle
drawCircle(400, 300, 100);

// function to draw the midpoint of the circumference

function drawCircleMidpoint(cx, cy, r, color = '#ffffff') {
  let x = 0;
  let y = r;
  let p = 1 - r; 
  plotCirclePoints(cx, cy, x, y, color);

  while (x < y) {
    x++;

    if (p < 0) {
      
      p = p + 2 * x + 1;
    } else {
      
      y--;
      p = p + 2 * x - 2 * y + 1;
    }

    plotCirclePoints(cx, cy, x, y, color);
  }
}

drawCircleMidpoint(400, 300);

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

// function to draw the midpoint of the circumference
function drawMidpoint(x, y) {
    var color = "#ffffff";
    plotPixel(x, y, color);
    plotPixel(x - 1, y, color);
    plotPixel(x + 1, y, color);
    plotPixel(x, y - 1, color);
    plotPixel(x, y + 1, color);
}

// bresenham line algorithm
function drawLineBresenham(x0, y0, x1, y1, color) {
    if (color === undefined) color = "#daffda";
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;

    while (true) {
        plotPixel(x0, y0, color);

        if (x0 === x1 && y0 === y1) break;

        var e2 = 2 * err;
        if (e2 > -dy) {
            err = err - dy;
            x0 = x0 + sx;
        }
        if (e2 < dx) {
            err = err + dx;
            y0 = y0 + sy;
        }
    }
}

// draw test circle and midpoint
drawCircle(400, 300, 100);
drawMidpoint(400, 300);

// line tracing: draw lines from center to edge of circle
drawLineBresenham(400, 300, 400, 200);   // top
drawLineBresenham(400, 300, 500, 300);   // right
drawLineBresenham(400, 300, 400, 400);   // bottom
drawLineBresenham(400, 300, 300, 300);   // left
drawLineBresenham(400, 300, 470, 230);   // diagonal
drawLineBresenham(400, 300, 470, 370);   // diagonal
drawLineBresenham(400, 300, 330, 370);   // diagonal
drawLineBresenham(400, 300, 330, 230);   // diagonal


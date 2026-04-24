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

// orbital position calculations
function calculateOrbitalPositions(cx, cy, r, steps) {
    var positions = [];
    for (var i = 0; i < steps; i++) {
        var angle = (2 * Math.PI * i) / steps;
        var x = cx + r * Math.cos(angle);
        var y = cy + r * Math.sin(angle);
        positions.push({ x: Math.round(x), y: Math.round(y) });
    }
    return positions;
}

// example usage: calculate positions and draw them
var orbitArray = calculateOrbitalPositions(400, 300, 100, 24);

for (var i = 0; i < orbitArray.length; i++) {
    plotPixel(orbitArray[i].x, orbitArray[i].y, "#ffff00");
}

// draw a regular polygon using bresenham lines
function drawPolygon(cx, cy, sides, radius, rotation, color) {
    var points = [];
    for (var i = 0; i < sides; i++) {
        var angle = rotation + (2 * Math.PI * i) / sides;
        var x = Math.round(cx + radius * Math.cos(angle));
        var y = Math.round(cy + radius * Math.sin(angle));
        points.push({ x: x, y: y });
    }
    for (var i = 0; i < points.length; i++) {
        var next = (i + 1) % points.length;
        drawLineBresenham(points[i].x, points[i].y, points[next].x, points[next].y, color);
    }
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

// place random polygons on the border of the circle
function drawRandomBorderPolygons(circleX, circleY, circleR) {
    var count = Math.floor(Math.random() * 8) + 1; // 1 to 8 polygons
    var sides = Math.floor(Math.random() * 8) + 3; // 3 to 10 sides, same for all in this run
    for (var i = 0; i < count; i++) {
        var angle = Math.random() * 2 * Math.PI;
        var px = circleX + circleR * Math.cos(angle);
        var py = circleY + circleR * Math.sin(angle);
        var polyRadius = Math.floor(Math.random() * 15) + 10; // 10 to 25
        var rotation = Math.random() * 2 * Math.PI;
        drawPolygon(px, py, sides, polyRadius, rotation, randomColor());
    }
}

drawRandomBorderPolygons(400, 300, 100);


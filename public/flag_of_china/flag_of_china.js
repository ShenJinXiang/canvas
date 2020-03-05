(function(w) {
    var canvas = document.getElementById('canvas');
    var showLineBtn = document.getElementById('showLineBtn');
    canvas.width = w;
    canvas.height = w * 2 / 3;
    var context = canvas.getContext('2d');

    var gridWidth = w / 30;
    var showLines = false;
    var stars = [
        {x: 5, y: 5, r: 3, ro: -Math.PI / 2},
        {x: 10, y: 2, r: 1, ro: Math.PI - Math.atan(3 / 5)},
        {x: 12, y: 4, r: 1, ro: Math.PI - Math.atan(1 / 7)},
        {x: 12, y: 7, r: 1, ro: Math.PI + Math.atan(2 / 7)},
        {x: 10, y: 9, r: 1, ro: Math.PI + Math.atan(4 / 5)},
    ];

    draw();

    showLineBtn.onclick = function() {
        if (showLines) {
            showLineBtn.innerText = '显示辅助线';
        } else {
            showLineBtn.innerText = '隐藏辅助线';
        }
        showLines = !showLines;
        draw();
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#f00';
        context.fillRect(0, 0, canvas.width, canvas.height);
        drawStars();
        if (showLines) {
            drawLines();
        }
    }

    function drawStars() {
        stars.forEach(function(item) {
            star(item.x, item.y, item.r, item.ro);
        });
    }

    function drawLines() {
        drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height);
        drawLine(0, canvas.height / 2, canvas.width, canvas.height / 2);
        for (var i = 1; i < 15; i++) {
            drawGridLine(i, 0, i, 10);
            if (i < 10) {
                drawGridLine(0, i, 15, i);
            }
            if (i < 5) {
                drawGridLine(stars[0].x, stars[0].y, stars[i].x, stars[i].y);
            }
        }
        drawGridLine()
    }

    function drawGridLine(sx, sy, ex, ey) {
        drawLine(sx * gridWidth, sy * gridWidth, ex * gridWidth, ey * gridWidth);
    }

    function drawLine(sx, sy, ex, ey) {
        context.beginPath();
        context.moveTo(sx, sy);
        context.lineTo(ex, ey);
        context.stroke();
    }

    function star(x, y, r, ro) {
        drawStar(x * gridWidth, y * gridWidth, r * gridWidth, ro);
    }
    
    function drawStar(ox, oy, r, ro) {
        context.save();
        context.translate(ox, oy);
        context.scale(r, r);
        context.rotate(ro);
        context.fillStyle = '#FFFF00';
        context.beginPath();
        context.moveTo(1, 0);
        context.lineTo(Math.cos(4 * Math.PI / 5), -Math.sin(4 * Math.PI / 5));
        context.lineTo(Math.cos(-2 * Math.PI / 5), -Math.sin(-2 * Math.PI / 5));
        context.lineTo(Math.cos(2 * Math.PI / 5), -Math.sin(2 * Math.PI / 5));
        context.lineTo(Math.cos(-4 * Math.PI / 5), -Math.sin(-4 * Math.PI / 5));
        context.closePath();
        context.fill();
        context.restore();
    }
})(900);

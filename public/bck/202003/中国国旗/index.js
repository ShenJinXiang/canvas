(function(w) {
    var drawer = {
        init: function() {
            drawer.c = drawer.canvas = document.getElementById('canvas');
            drawer.showLineBtn = document.getElementById('showLineBtn');
            drawer.canvas.width = w;
            drawer.canvas.height = w * 2 / 3;
            drawer.context = canvas.getContext('2d');
            drawer.gridWidth = w / 30;
            drawer.showLines = false;
            drawer.stars = [
                {x: 5, y: 5, r: 3, ro: -Math.PI / 2},
                {x: 10, y: 2, r: 1, ro: Math.PI - Math.atan(3 / 5)},
                {x: 12, y: 4, r: 1, ro: Math.PI - Math.atan(1 / 7)},
                {x: 12, y: 7, r: 1, ro: Math.PI + Math.atan(2 / 7)},
                {x: 10, y: 9, r: 1, ro: Math.PI + Math.atan(4 / 5)},
            ];
            drawer.draw();
            drawer.bindEvent();
        },
        bindEvent: function() {
            drawer.showLineBtn.onclick = function() {
                if (drawer.showLines) {
                    drawer.showLineBtn.innerText = '显示辅助线';
                } else {
                    drawer.showLineBtn.innerText = '隐藏辅助线';
                }
                drawer.showLines = !drawer.showLines;
                drawer.draw();
            };
        },
        draw: function() {
            drawer.context.clearRect(0, 0, drawer.canvas.width, drawer.canvas.height);
            drawer.context.fillStyle = '#f00';
            drawer.context.fillRect(0, 0, drawer.canvas.width, drawer.canvas.height);
            drawer.drawStars();
            if (drawer.showLines) {
                drawer.drawLines();
            }
        },
        drawStars: function() {
            drawer.stars.forEach(function(item) {
                drawer.star(item.x, item.y, item.r, item.ro);
            });
        },
        drawLines: function() {
            drawer.drawLine(drawer.canvas.width / 2, 0, drawer.canvas.width / 2, drawer.canvas.height);
            drawer.drawLine(0, drawer.canvas.height / 2, drawer.canvas.width, drawer.canvas.height / 2);
            for (var i = 1; i < 15; i++) {
                drawer.drawGridLine(i, 0, i, 10);
                if (i < 10) {
                    drawer.drawGridLine(0, i, 15, i);
                }
                if (i < 5) {
                    drawer.drawGridLine(drawer.stars[0].x, drawer.stars[0].y, drawer.stars[i].x, drawer.stars[i].y);
                }
            }
            drawer.drawGridLine()
        },
        drawGridLine: function(sx, sy, ex, ey) {
            drawer.drawLine(sx * drawer.gridWidth, sy * drawer.gridWidth, ex * drawer.gridWidth, ey * drawer.gridWidth);
        },
        drawLine: function(sx, sy, ex, ey) {
            drawer.context.beginPath();
            drawer.context.moveTo(sx, sy);
            drawer.context.lineTo(ex, ey);
            drawer.context.stroke();
        },
        star: function(x, y, r, ro) {
            drawer.drawStar(x * drawer.gridWidth, y * drawer.gridWidth, r * drawer.gridWidth, ro);
        },
        drawStar: function(ox, oy, r, ro) {
            drawer.context.save();
            drawer.context.translate(ox, oy);
            drawer.context.scale(r, r);
            drawer.context.rotate(ro);
            drawer.context.fillStyle = '#FFFF00';
            drawer.context.beginPath();
            drawer.context.moveTo(1, 0);
            drawer.context.lineTo(Math.cos(4 * Math.PI / 5), -Math.sin(4 * Math.PI / 5));
            drawer.context.lineTo(Math.cos(-2 * Math.PI / 5), -Math.sin(-2 * Math.PI / 5));
            drawer.context.lineTo(Math.cos(2 * Math.PI / 5), -Math.sin(2 * Math.PI / 5));
            drawer.context.lineTo(Math.cos(-4 * Math.PI / 5), -Math.sin(-4 * Math.PI / 5));
            drawer.context.closePath();
            drawer.context.fill();
            drawer.context.restore();
        }
    };
    drawer.init();

})(900);

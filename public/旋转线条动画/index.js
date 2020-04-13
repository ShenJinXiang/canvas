(function() {
    var drawer = {
        option: {
            sideNum: 5,
            pointNum: 15,
            pointRadius: 2,
            pointColor: '#fff'
        },
        init: function() {
            this.c = document.getElementById('canvas');
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.mark = drawer.getMarkCanvas();            
            this.points = [];
            this.n = 0;
            this.initPoints(drawer.option);
            this.animate();
            this.bindEvent();
        },
        bindEvent: function() {
            $("#sidesRange").mousemove(function() {
                $("#sides_span").text($(this).val());
                drawer.option.sideNum = ~~$(this).val();
                drawer.initPoints(drawer.option);
            });
            $("#pointsRange").mousemove(function() {
                $("#points_span").text($(this).val());
                drawer.option.pointNum = ~~$(this).val();
                drawer.initPoints(drawer.option);
            });
            $(window).resize(function() {
                drawer.w = drawer.c.width = window.innerWidth <= 900 ? 900 : window.innerWidth;
                drawer.h = drawer.c.height = window.innerHeight <= 600 ? 600 : window.innerHeight;
                drawer.initPoints(drawer.option);
            });
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.n = performance.now() / 2000;
        },
        draw: function() {
            drawer.ctx.clearRect(0, 0, drawer.w, drawer.h);
            for (var i = 0 ; i < drawer.points.length; i++) {
                var p1 = drawer.points[i];
                p1.draw(drawer.ctx);
                var t = Math.floor(i * drawer.n) % drawer.points.length;
                var p2 = drawer.points[t];
                drawer.drawLine(drawer.ctx, p1, p2);
            }
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        drawLine: function(ctx, p1, p2, color) {
            ctx.save();
            ctx.strokeStyle = '#fff';
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
        },
        initPoints: function(config) {
            drawer.points = [];
            var roStep = 2 * Math.PI / config.sideNum;
            var radius = Math.min(drawer.w, drawer.h) * 3 / 8;
            for (var i = 0; i < config.sideNum; i++) {
                var sro = -0.5 * Math.PI + i * roStep;
                var ero = sro + roStep;
                var sx = 0.5 * drawer.w + Math.cos(sro) * radius;
                var sy = 0.5 * drawer.h + Math.sin(sro) * radius;
                var ex = 0.5 * drawer.w + Math.cos(ero) * radius;
                var ey = 0.5 * drawer.h + Math.sin(ero) * radius;
                var xStep = (ex - sx) / config.pointNum;
                var yStep = (ey - sy) / config.pointNum;
                for (var j = 0; j < config.pointNum; j++) {
                    drawer.points.push(new drawer.Point(sx + j * xStep, sy + j * yStep, config.pointRadius, config.pointColor, drawer.points.length));
                }
            }
        },
        drawPoints: function() {
            drawer.points.forEach(function(item) {
                item.draw(drawer.ctx);
            });
        },
        Point: function(x, y, r, color, index) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.color = color;
            this.target = index;
            this.index = index;
            this.draw = function(ctx) {
                ctx.save();
                ctx.fillStyle = this.color; 
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
            };
        },
        getMarkCanvas: function(fillStyle) {
            var markCanvas = document.createElement('canvas');
            markCanvas.width = 240;
            markCanvas.height = 60;
            var ctx = markCanvas.getContext('2d');
            
            ctx.fillStyle = fillStyle || 'rgba(250, 250, 250, 0.5)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '30px cursive';
            ctx.fillText('shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2 );
            return markCanvas;
        },
        drawMark: function(ctx, mark) {
            ctx.drawImage(mark, ctx.canvas.width - mark.width, ctx.canvas.height - mark.height);
        }
    };
    drawer.init();
})();

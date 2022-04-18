(function() {
    let drawer = {
        option: {
            num: 200
        },
        init: function() {
            this.c = this.canvas = document.getElementById("canvas");
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.mark = drawer.getMarkCanvas();
            this.current = 0;
            // this.incr = .005;
            this.initPoints();
            this.bindEvent();
            this.animate();
        },
        bindEvent: function() {
            window.onresize = function() {
                drawer.w = drawer.c.width = window.innerWidth;
                drawer.h = drawer.c.height = window.innerHeight;
                drawer.initPoints();
            };
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.current = performance.now() / 2000;
            // drawer.current += drawer.incr;
            // if (drawer.current >= 10 || drawer < 0) {
            //     drawer.incr = -drawer.incr;
            //     drawer.current = Math.abs(drawer.current);
            // }
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            for (let i = 0; i < drawer.option.num; i++) {
                let innerPoint = drawer.innerPoints[i],
                    outerPoint = drawer.outerPoints[i],
                    target = ~~(i * drawer.current % drawer.innerPoints.length),
                    targetPoint = drawer.innerPoints[target],
                    dist = drawer.pointDistance(innerPoint, targetPoint);
                if (dist > 1) {
                    dist = ~~drawer.distance(drawer.w / 2, drawer.h / 2, (innerPoint.x + targetPoint.x) / 2, (innerPoint.y + targetPoint.y) / 2);
                }
                let strokeStyle = 'hsla(' + drawer.mapVal(dist, 0, 2 * drawer.innerRadius, 0, 360) + ', 100%, 50%, .6)';
                innerPoint.draw(ctx);
                drawer.drawLine(ctx, innerPoint, targetPoint, strokeStyle);
                drawer.drawLine(ctx, innerPoint, outerPoint, strokeStyle);
            }
            ctx.restore();
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        drawLine(ctx, point1, point2, color) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(point1.x, point1.y);
            ctx.lineTo(point2.x, point2.y);
            ctx.stroke();
            ctx.restore();
        },
        initPoints: function() {
            drawer.innerPoints = [];
            drawer.outerPoints = [];
            drawer.innerRadius = Math.min(drawer.w, drawer.h) * .4 + 10;
            drawer.outerRadius = drawer.innerRadius * 3;
            let angleStep = 2 * Math.PI / drawer.option.num;
            for (let i = 0; i < drawer.option.num; i++) {
                drawer.innerPoints.push(new drawer.Point(drawer.innerRadius * Math.cos(angleStep * i), drawer.innerRadius * Math.sin(angleStep * i)));
                drawer.outerPoints.push(new drawer.Point(drawer.outerRadius * Math.cos(angleStep * i), drawer.outerRadius * Math.sin(angleStep * i)));
            }
        },
        Point: function(x, y) {
            this.x = x;
            this.y = y;
            this.draw = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = '#fff';
                ctx.arc(this.x, this.y, 0.5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
            }
        },
        pointDistance: function(point1, point2) {
            return drawer.distance(point1.x, point1.y, point2.x, point2.y);
        },
        distance: function(sx, sy, ex, ey) {
            return Math.sqrt(Math.pow(sx - ex, 2) + Math.pow(sy - ey, 2));
        },
        mapVal: function(num, in_min, in_max, out_min, out_max) {
            return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
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
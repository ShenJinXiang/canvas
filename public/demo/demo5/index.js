(function() {
    var drawer = {
        option: {
            sideNum: 5,
            pointNum: 20,
            radius: 200,
            pointRadius: 2,
            pointColor: '#084'
        },
        init: function() {
            this.c = document.getElementById('canvas');
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.points = [];
            this.n = 0;
            this.initPoints(drawer.option);
            console.log(this.points);
            this.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            //this.n += 0.01;
            this.n = performance.now() / 1000;
            drawer.points.forEach(function(item) {
                item.update();
            });
        },
        draw: function() {
            drawer.ctx.clearRect(0, 0, drawer.w, drawer.h);
            /*
            drawer.points.forEach(function(item) {
                item.draw(drawer.ctx);
            });
            */
            for (var i = 0 ; i < drawer.points.length; i++) {
                var p1 = drawer.points[i];
                p1.draw(drawer.ctx);
                var t = Math.floor(i * drawer.n) % drawer.points.length;
                var p2 = drawer.points[t];
                drawer.drawLine(drawer.ctx, p1, p2, 'hsla('+ i * drawer.n +', 100%, 40%, 1)');
            }
        },
        drawLine: function(ctx, p1, p2, color) {
            ctx.save();
            //ctx.strokeStyle = '#000';
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
        },
        initPoints: function(config) {
            var roStep = 2 * Math.PI / config.sideNum;
            for (var i = 0; i < config.sideNum; i++) {
                var sro = -0.5 * Math.PI + i * roStep;
                var ero = sro + roStep;
                var sx = 0.5 * drawer.w + Math.cos(sro) * config.radius;
                var sy = 0.5 * drawer.h + Math.sin(sro) * config.radius;
                var ex = 0.5 * drawer.w + Math.cos(ero) * config.radius;
                var ey = 0.5 * drawer.h + Math.sin(ero) * config.radius;
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
            this.update = function() {
                this.targetPoint = drawer.points[this.target];
                this.target+=2;
                if (this.target >= drawer.points.length) {
                    this.target = 0;
                }
            };
            this.draw = function(ctx) {
                ctx.save();
                ctx.fillStyle = this.color; 
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
                
                /*
                //if (this.index == 1) {
                ctx.save();
                ctx.strokeStyle = '#000';
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.targetPoint.x, this.targetPoint.y);
                ctx.stroke();
                ctx.restore();
                //}
                */
            };
        }
    };
    drawer.init();
})();

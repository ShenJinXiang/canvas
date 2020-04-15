(function() {
    let drawer = {
        option: {
            startNum: 400,
            maxStartRadius: 1,
            fireRadius: 3,
            fireTrailLen: 20,
            g: 5e-2,
            a: 1e-3
        },
        init: function() {
            this.c = this.canvas = document.getElementById('canvas');
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.fireWords = [];
            this.createStarts();
            this.createFireWord();
            this.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.starts.forEach(item => item.update());
            drawer.fireWords.forEach(item => item.update());
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.starts.forEach(item => item.draw(ctx));
            drawer.fireWords.forEach(item => item.draw(ctx));
        },
        createStarts: function() {
            drawer.starts = [];
            for (let i = 0; i < drawer.option.startNum; i++) {
                let x = drawer.w * Math.random(),
                    y = drawer.h * Math.random(),
                    r = drawer.option.maxStartRadius * Math.random(),
                    alpha = Math.random();
                drawer.starts.push(new drawer.Start(x, y, r, alpha));
            }
        },
        Start: function(x, y, r, alpha) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.alpha = alpha;
            this.flag = Math.random() < 0/5 ? 1 : -1;
            this.update = function() {
                this.alpha += this.flag * (Math.random() * 0.05);
                if (this.alpha > 1 || this.alpha < 0) {
                    this.flag = - this.flag;
                }
            };
            this.draw = function(ctx) {
                ctx.save();
                ctx.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
            };
        },
        createFireWord: function() {
            drawer.fireWords.push(new drawer.FireWord(400, drawer.h, 1, -6, drawer.option.a, drawer.option.g, '90, 206, 38'));

        },
        FireWord: function(x, y, vx, vy, ax, ay, color) {
            this.x = x;
            this.y = y;
            this.r = drawer.option.fireRadius;
            this.vx = vx;
            this.vy = vy;
            this.ax = ax;
            this.ay = ay;
            this.color = color;
            this.status = 1;
            this.path = [];
            this.update = function() {
                if (this.status == 1) {
                    if (this.path.length > drawer.option.fireTrailLen) {
                        this.path.shift();
                    }
                    this.path.push(new drawer.Point(this.x, this.y));
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vx += this.ax;
                    this.vy += this.ay;
                    if (this.vy > 0) {
                        this.status = 2;
                    }
                }
            };
            this.draw = function(ctx) {
                if (this.status == 1) {
                    ctx.save();
                    ctx.fillStyle = 'rgba(' + this.color + ', 0.5)';
                    ctx.beginPath();
                    ctx.moveTo(this.x - this.r, this.y);
                    ctx.lineTo(this.path[0].x, this.path[0].y);
                    ctx.lineTo(this.x + this.r, this.y);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();

                    ctx.save();
                    ctx.fillStyle = 'rgba(' + this.color + ', 1)';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.restore();
                }
            };
        },
        Point: function(x, y) {
            this.x = x;
            this.y = y;
        }
    };
    drawer.init();
})();

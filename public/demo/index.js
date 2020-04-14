(function() {
    let drawer = {
        option: {
            startNum: 400,
            maxStartRadius: 1,
            fireRadius: 3
        },
        init: function() {
            this.c = this.canvas = document.getElementById('canvas');
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.createStarts();
            this.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.starts.forEach(item => item.update());
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.starts.forEach(item => item.draw(ctx));
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
        FireWord: function(x, y, vx, vy, ax, ay, color) {
            this.x = x;
            this.y = y;
            this.r = drawer.option.fireRadius;
            this.vx = vx;
            this.vy = vy;
            this.ax = ax;
            this.ay = ay;
            this.color = color;
            this.status == 1;
            this.update = function() {
                if (this.status == 1) {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vx += this.ax;
                    this.vy += this.ay;
                    
                }
            };
        }
    };
    drawer.init();
})();

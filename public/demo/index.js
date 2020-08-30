{

    class FireBall {
        constructor(ox, oy, radius) {
            this.ox = ox;
            this.oy = oy;
            this.radius = radius;
            this.lineWidth = this.radius * 0.3;

            this.time = 0;

        }
        update() {
            this.time += 1;
            // this.color = 'hsl(' + Math.sin(this.time * Math.PI / 180) * 360 + ', 80%, 60%)';
            this.color = 'hsl(' + this.time + ', 80%, 60%)';
        }
        draw(ctx) {
            this.drawLine(ctx);
            this.drawBall(ctx);
        }
        drawLine(ctx) {
            ctx.save();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.lineWidth;
            ctx.beginPath();
            ctx.moveTo(this.ox, 0);
            ctx.lineTo(this.ox, this.oy);
            ctx.stroke();
            ctx.restore();
        }
        drawBall(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = Math.random();
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.arc(0, 0, random(0.5 * this.radius, this.radius), 0, 2 * Math.PI, false);
                ctx.fill();
            }
            ctx.restore();
        }

    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.ele = new FireBall(drawer.w / 2, drawer.h / 2, 10);
            drawer.animate();
            drawer.ele.update();
            drawer.ele.draw(drawer.ctx);
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.ele.update();
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.ele.draw(ctx);
        }
    };

    drawer.start();
}

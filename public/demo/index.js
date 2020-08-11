{
    const option = {
        grid: {
            width: 20,
            padding: 1,
            
        }
    }

    class Element {
        constructor(ox, oy, lineWidth, length, style, beginAngle, angleStep, counterclockwise) {
            this.ox = ox;
            this.oy = oy;
            this.lineWidth = lineWidth;
            this.length = length;
            this.style = style;
            this.beginAngle = beginAngle;
            this.angleStep = angleStep;
            this.counterclockwise = counterclockwise;

            this.angle = this.beginAngle;
        }
        update() {
            if (this.counterclockwise) {
                this.angle -= this.angleStep;
            } else {
                this.angle += this.angleStep;
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.style;
            ctx.beginPath();
            ctx.lineTo(
                this.length / 2 * Math.cos(this.angle + Math.PI),
                this.length / 2 * Math.sin(this.angle + Math.PI)
            );
            ctx.lineTo(
                this.length / 2 * Math.cos(this.angle),
                this.length / 2 * Math.sin(this.angle)
            );
            ctx.stroke();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.ele = new Element(
                drawer.w / 2,
                drawer.h / 2,
                2,
                300,
                'red',
                0,
                Math.PI / 180,
                false
            );
            drawer.animate();
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
            drawer.ele.draw(drawer.ctx);
        }
    };
    drawer.start();
}
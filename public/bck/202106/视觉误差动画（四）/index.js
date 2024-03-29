{
    const option = {
        backgroundColor: '#999',
        eleInnerColor: '#333',
        eleInnerRadius: 0.15,
        eleMinOuterRadius: 0.3,
        eleMaxOuterRadius: 0.45
    };

    class Element {
        constructor(ox, oy, innerRadius, innerColor, minOuterRadius, maxOuterRadius, angleSpeed, clockwise) {
            this.ox = ox;
            this.oy = oy;
            this.innerRadius = innerRadius;
            this.innerColor = innerColor;
            this.minOuterRadius = minOuterRadius;
            this.maxOuterRadius = maxOuterRadius;
            this.angleSpeed = angleSpeed;
            this.clockwise = clockwise;
            this.angle = 0;
            this.angleStep = Math.PI / 180;
        }
        update() {
            if (this.clockwise) {
                this.angle -= this.angleSpeed;
            } else {
                this.angle += this.angleSpeed;
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);

            ctx.beginPath();
            ctx.fillStyle = this.innerColor;
            ctx.arc(0, 0, this.innerRadius, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.rotate(this.angle);
            for (let i = 0; i < 360; i++) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = "hsl(" + i + ", 100%, 50%, 1)";
                ctx.rotate(i * this.angleStep);
                ctx.arc(0, 0, this.minOuterRadius, this.angleStep, 0, true);
                ctx.lineTo(this.maxOuterRadius, 0);
                ctx.arc(0, 0, this.maxOuterRadius, 0, this.angleStep, false);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            }
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#fff');
            drawer.init();
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            if (drawer.w > drawer.h) {
                drawer.width = Math.min(drawer.w / 2, drawer.h);
                drawer.p1 = { x: -drawer.w / 4, y: 0 };
                drawer.p2 = { x: drawer.w / 4, y: 0 };
            } else {
                drawer.width = Math.min(drawer.h / 2, drawer.w);
                drawer.p1 = { x: 0, y: -drawer.h / 4 };
                drawer.p2 = { x: 0, y: drawer.h / 4 };
            }
            drawer.innerRadius = option.eleInnerRadius * drawer.width;
            drawer.minOuterRadius = option.eleMinOuterRadius * drawer.width;
            drawer.maxOuterRadius = option.eleMaxOuterRadius * drawer.width;
            drawer.elements = [
                new Element(drawer.p1.x, drawer.p1.y, drawer.innerRadius, option.eleInnerColor, drawer.minOuterRadius, drawer.maxOuterRadius, Math.PI / 10, true),
                new Element(drawer.p2.x, drawer.p2.y, drawer.innerRadius, option.eleInnerColor, drawer.minOuterRadius, drawer.maxOuterRadius, Math.PI / 7, false)
            ];
            console.log(drawer.elements);
        },
        animate() {
            drawer.draw();
            drawer.update();
            requestAnimationFrame(drawer.animate);
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            drawer.elements.forEach(item => item.draw(ctx));
            ctx.restore();
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        update() {
            drawer.elements.forEach(item => item.update());
        }
    };

    drawer.start();
}

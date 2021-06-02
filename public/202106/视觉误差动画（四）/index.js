{
    const option = {
        backgroundColor: '#999',
        eleInnerColor: '#333',
        eleInnerRadius: 0.15,
        eleMinOuterRadius: 0.3,
        eleMaxOuterRadius: 0.4,
        angleSpeed: Math.PI / 180
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
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);

            ctx.beginPath();
            ctx.fillStyle = this.innerColor;
            ctx.arc(0, 0, this.innerRadius, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.arc(0, 0, this.minOuterRadius, 0, 2 * Math.PI, false);
            ctx.arc(0, 0, this.maxOuterRadius, 0, 2 * Math.PI, true);
            ctx.fill();

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
                new Element(drawer.p1.x, drawer.p1.y, option.eleInnerRadius, option.eleInnerColor, drawer.minOuterRadius, drawer.maxOuterRadius, option.angleSpeed, true),
                new Element(drawer.p2.x, drawer.p2.y, option.eleInnerRadius, option.eleInnerColor, drawer.minOuterRadius, drawer.maxOuterRadius, option.angleSpeed, false)
            ];
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

        }
    };

    drawer.start();
}

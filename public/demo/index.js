{
    const option = {
        num: 25,
    };
    class Element {
        constructor(x, y, radius, width, beginAngle, angleStep, style) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.width = width;
            this.beginAngle = beginAngle;
            this.angleStep = angleStep;
            this.style = style;

            this.angle = this.beginAngle;
        }
        update() {
            this.angle += this.angleStep;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.lineWidth = this.width;
            ctx.strokeStyle = this.style;
            ctx.arc(0, 0, this.radius, this.angle, Math.PI + this.angle, false);
            ctx.stroke();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.init();
            drawer.initElement();
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = drawer.width * 0.4;
            drawer.eleWidth = drawer.radius / option.num;
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elements.forEach((item) => item.update());
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements.forEach((item) => item.draw(ctx));
        },
        initElement() {
            drawer.elements = [];
            for (let i = 0; i < option.num; i++) {
                drawer.elements.push(new Element(
                    drawer.w / 2,
                    drawer.h / 2,
                    drawer.eleWidth * i,
                    drawer.eleWidth,
                    -Math.PI,
                    // (i + 1) * Math.PI / 360,
                    (option.num + 1 - i) * Math.PI / 360,
                    'hsla(' + (i * 180 / option.num) + ', 80%, 60%, 1)'
                ));
            }
        }
    };
    drawer.start();
}

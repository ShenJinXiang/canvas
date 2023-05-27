{
    const option = {
        radius: 3,
        step: 1,
    };
    class Element{
        constructor(ox, oy, r, radius, angleStep, style) {
            this.ox = ox;
            this.oy = oy;
            this.r = r;
            this.radius = radius;
            this.angleStep = angleStep;
            this.style = style;

            this.angle = 0;
        }
        update() {
            this.angle += this.angleStep;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.beginPath();
            ctx.fillStyle = this.style;
            ctx.arc(0, this.radius * Math.sin(this.angle), this.r, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.init();
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.radius = drawer.h * .35;
            drawer.initElements();
        },
        bindEvent() {
            window.addEventListener('resize', drawer.init, false);
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
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        initElements() {
            drawer.elements = [];
            let x = drawer.w / 2,
                len = 0,
                angle = 0,
                count = 0,
                cstep = 720 / (drawer.w / (option.radius * 2 + option.step));
            console.log(cstep);
            while(len < drawer.w / 2) {
                if (len === 0) {
                    drawer.elements.push(new Element(
                        drawer.w / 2,
                        drawer.h / 2,
                        option.radius,
                        drawer.radius,
                        angle,
                        'hsla(0, 100%, 60%, 1)'
                    ));
                } else {
                    drawer.elements.push(new Element(
                        drawer.w / 2 + len,
                        drawer.h / 2,
                        option.radius,
                        drawer.radius,
                        angle + count * 0.001,
                        // 0,
                        'hsla(' + (count * cstep) + ', 100%, 60%, 1)'
                    ));
                    drawer.elements.push(new Element(
                        drawer.w / 2 - len,
                        drawer.h / 2,
                        option.radius,
                        drawer.radius,
                        angle - count * 0.001,
                        // 0,
                        'hsla(' + (count * cstep) + ', 100%, 60%, 1)'
                    ));
                }
                len += 2 * option.radius + option.step;
                count++;
            }
        }
    };

    drawer.start();
}

{
    const option = {
        num: 6,
        backColor: '#fff',
        color: '#000',
        angleStep: -Math.PI / 40,
    }
    class Element {
        constructor(ox, oy, num, width, style, angleStep) {
            this.ox = ox;
            this.oy = oy;
            this.num = num;
            this.width = width;
            this.style = style;
            this.angleStep = angleStep;

            this.al = Math.PI / (this.width * num);
            this.itemLenStep = 0.1;
            this.itemAngleStep = this.itemLenStep * this.al;
            this.itemBeginLength = 0;

            this.angle = 0;
            this.itemAngle = 2 * Math.PI / this.num;
        }
        update() {
            this.angle += this.angleStep;
        }
        draw(ctx, maxLength) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.strokeStyle = this.style;
            ctx.lineWidth = this.width;
            ctx.rotate(this.angle);

            for (let i = 0; i < this.num; i++) {
                ctx.beginPath();
                let len = this.itemBeginLength,
                    angle = this.itemAngle * i;

                while (len <= maxLength) {
                    ctx.lineTo(len * Math.cos(angle), len * Math.sin(angle));
                    len += this.itemLenStep;
                    angle += this.itemAngleStep;
                }

                ctx.stroke();
            }
            ctx.restore();
        }
    }
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('hsla(180, 100%, 50%, 1)');
            drawer.init();
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;
            drawer.width = Math.min(drawer.w, drawer.h) * 0.03;
            drawer.max = Math.sqrt(Math.pow(drawer.ox, 2) + Math.pow(drawer.oy, 2));
            drawer.element = new Element(
                drawer.ox,
                drawer.oy,
                option.num,
                drawer.width,
                option.color,
                option.angleStep
            );
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
            drawer.element.update();
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.fillStyle = option.backColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            drawer.element.draw(ctx,  drawer.max);
            CanvasUtil.drawMark(ctx, drawer.mark);
        }
    };
    drawer.start();
}

{
    const option = {
        color: 'green'
    };
    class Parallelogram {
        constructor(x, y, width1, width2, angle, rotate, style) {
            this.x = x;
            this.y = y;
            this.width1 = width1;
            this.width2 = width2;
            this.angle = angle;
            this.rotate = rotate;
            this.style = style;
            this.initPath();
        }
        initPath() {
            this.points = [
                {x: 0, y: 0},
                {x: this.width2 * Math.cos(this.angle), y: this.width2 * Math.sin(this.angle)},
                {x: this.width2 * Math.cos(this.angle) + this.width1, y: this.width2 * Math.sin(this.angle)},
                {x: this.width1, y: 0},
            ];
            this.path = new Path2D();
            this.points.forEach((item) => {
                this.path.lineTo(item.x, item.y);
            });
            this.path.closePath();
        }
        stroke(ctx, style, lineWidth = 1) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotate);
            ctx.strokeStyle = style || this.style;
            ctx.lineWidth = lineWidth;
            ctx.stroke(this.path);
            ctx.restore();
        }
        fill(ctx, style) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotate);
            ctx.fillStyle = style || this.style;
            ctx.fill(this.path);
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas(option.color);
            drawer.init();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);

            drawer.sideWidth = drawer.width * 0.02;

            drawer.radius1 = drawer.width * 0.3;
            drawer.radius2 = drawer.width * 0.4;

            drawer.num1 = Math.floor(drawer.radius1 * Math.PI / drawer.sideWidth);
            drawer.num2 = Math.floor(drawer.radius2 * Math.PI / drawer.sideWidth);

            drawer.initElements();
            drawer.draw();
        },
        initElements() {
            drawer.elements  = [];
            for (let i = 0, angle = 2 * Math.PI / drawer.num1; i < drawer.num1; i++) {
                drawer.elements.push(new Parallelogram(
                    drawer.radius1 * Math.cos(i * angle),
                    drawer.radius1 * Math.sin(i * angle),
                    drawer.sideWidth,
                    drawer.sideWidth,
                    2 * Math.PI / 3,
                    i * angle - Math.PI / 2,
                    option.color
                ));
            }
            for (let i = 0, angle = 2 * Math.PI / drawer.num2; i < drawer.num2; i++) {
                drawer.elements.push(new Parallelogram(
                    drawer.radius2 * Math.cos(i * angle),
                    drawer.radius2 * Math.sin(i * angle),
                    drawer.sideWidth,
                    drawer.sideWidth,
                    Math.PI / 3,
                    i * angle - Math.PI / 2,
                    // i * angle,
                    option.color
                ));
            }
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);

            ctx.beginPath();
            ctx.strokeStyle = option.color;
            ctx.lineWidth = 4;
            ctx.moveTo(-drawer.sideWidth, 0);
            ctx.lineTo(drawer.sideWidth, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, -drawer.sideWidth);
            ctx.lineTo(0, drawer.sideWidth);
            ctx.stroke();

            drawer.elements.map((item) => item.fill(ctx));
            ctx.restore();

            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        bindEvent() {
            window.addEventListener('resize', drawer.init, false);
        }

    };
    drawer.start();
}

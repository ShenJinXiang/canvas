{
    class Parallelogram {
        constructor(x, y, width1, width2, angle, rotate, style) {
            this.x = x;
            this.y = y;
            this.width1 = width1;
            this.width2 = width2;
            this.angle = angle;
            this.rotate = rotate;
            this.style = style;

            this.points = [
                {x: 0, y: 0},
                {x: this.width2 * Math.cos(this.angle), y: this.width2 * Math.sin(this.angle)},
                {x: this.width2 * Math.cos(this.angle) + this.width1, y: this.width2 * Math.sin(this.angle)},
                {x: this.width1, y: 0},
            ]

        }
        stroke(ctx, style) {
            this.draw(ctx, 'stroke', style);
        }
        fill(ctx, style) {
            this.draw(ctx, 'fill', style);
        }
        draw(ctx, type, style) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotate);
            if (type === 'stroke') {
                ctx.strokeStyle = style || this.style;
            }
            if (type === 'fill') {
                ctx.fillStyle = style || this.style;
            }
            ctx.beginPath();
            this.points.forEach((item) => {
                ctx.lineTo(item.x, item.y);
            });
            ctx.closePath();
            if (type === 'stroke') {
                ctx.stroke();
            }
            if (type === 'fill') {
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

            let ele = new Parallelogram(100, 100, 200, 150, Math.PI / 4, 0, 'red');
            ele.stroke(drawer.ctx);
            ele.fill(drawer.ctx, 'green');
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
        }

    };
    drawer.start();
}

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
            drawer.init();
            
            let ele = new Parallelogram(100, 100, 300, 240, Math.PI / 4, 0, '#000');
            ele.fill(drawer.ctx, 'green');
            ele.stroke(drawer.ctx, 'red', 3);
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);

            // initElements();
        }

    };
    drawer.start();
}

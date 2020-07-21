{
    const option = {
        time: 100
    };

    class Polygon {
        constructor(ox, oy, num, radius, rotate, style) {
            this.ox = ox;
            this.oy = oy;
            this.num = num;
            this.radius = radius;
            this.rotate = rotate;
            this.style = style;

            this.angleStep = 2 * Math.PI / num;
        }
        generatePath(radius) {
            let path = new Path2D();
            for (let i = 0; i < this.num; i++) {
                path.lineTo(
                    radius * Math.cos(i * this.angleStep),
                    radius * Math.sin(i * this.angleStep)
                );
            }
            path.closePath();
            return path;
        }
        stroke(ctx, lineWidth, radius, rotate, style) {
            debugger
            let _radius = radius || this.radius,
                _rotate = rotate || this.rotate,
                _style = style || this.style,
                _lineWidth = lineWidth | 1,
                path = this.generatePath(_radius);
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.rotate(_rotate);
            ctx.strokeStyle = _style;
            ctx.lineWidth = _lineWidth;
            ctx.stroke(path);
            ctx.restore();
        }
        fill(ctx, radius, rotate, style) {
            let _radius = radius || this.radius,
                _rotate = rotate || this.rotate,
                _style = style || this.style,
                path = this.generatePath(_radius);
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.rotate(_rotate);
            ctx.fillStyle = _style;
            ctx.fill(path);
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            let ele = new Polygon(drawer.w / 2, drawer.h / 2, 5, 100, 0, 'red');
            ele.stroke(drawer.ctx);
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
        }
    };

    // drawer.start();

}

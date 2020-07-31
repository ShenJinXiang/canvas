{
    /**
     * 阿基米德螺旋线
     */
    class ArchimedesSpiral {
        constructor(ox, oy, rotate, a, b, radius, lineWidth, style) {
            this.ox = ox;
            this.oy = oy;
            this.rotate = rotate;
            this.a = a;
            this.b = b;
            this.radius = radius;
            this.lineWidth = lineWidth;
            this.style = style;
        }
        path(a, b, radius) {
            let path = new Path2D();
            path.moveTo(0, 0);
            let r = 0,
                angle = 0,
                angleStep = 0.01;
            while(r < radius) {
                r = a  * angle * angle + b;
                path.lineTo(r * Math.cos(angle), r * Math.sin(angle));
                angle += angleStep;
            }
            return path;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.rotate(this.rotate);
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.style;
            let path = this.path(this.a, this.b, this.radius);
            ctx.stroke(path);
            ctx.restore();
        }

    }
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.init();
            let ele = new ArchimedesSpiral(drawer.w / 2, drawer.h / 2, 0, 10, 0, drawer.radius, 1, '#048');
            ele.draw(drawer.ctx);
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.radius = Math.min(drawer.w, drawer.h);
        }
    };

    drawer.start();
}
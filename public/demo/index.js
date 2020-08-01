{

    const option = {
        num: 10,
    }
    /**
     * 螺旋线
     */
    class Spiral {
        constructor(ox, oy, rotate, a, k, radius, lineWidth, style, flag) {
            this.ox = ox;
            this.oy = oy;
            this.rotate = rotate;
            this.a = a;
            this.k = k;
            this.radius = radius;
            this.lineWidth = lineWidth;
            this.style = style;
            this.flag = flag;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.rotate(this.rotate);
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.style;
            let path = CanvasUtil.logarithmicSpiralPath(this.a, this.k, this.radius, this.flag)
            // let path = CanvasUtil.archimedesSpiralPath(this.a, this.k, this.radius, this.flag)
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
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.radius = Math.max(drawer.w, drawer.h);
            drawer.initLines();
        },
        animate() {
            drawer.update();
            drawer.draw();
        },
        update() {

        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.lines.forEach((item) => item.draw(ctx));
        },
        initLines() {
            drawer.lines = [];
            let angleStep = 2 * Math.PI / option.num;
            for (let index = 0; index < option.num; index++) {
                drawer.lines.push(new Spiral(
                    drawer.w / 2,
                    drawer.h / 2,
                    index * angleStep,
                    1, 5,
                    drawer.radius,
                    1,
                    '#084',
                    true
                ));
                drawer.lines.push(new Spiral(
                    drawer.w / 2,
                    drawer.h / 2,
                    index * angleStep,
                    .2, 1,
                    drawer.radius,
                    1,
                    '#084',
                    false
                ));
            }
        }
    };

    drawer.start();
}
(() => {
    /*
    b = -13;
    y = Math.pow(x, 2 / 3) + 0.9 * Math.sqrt(20.3 - Math.pow(x , 2)) - Math.sin(5 * b * Math.PI * x);

    x=[-2:.001:2];y=(sqrt(cos(x)).*cos(200*x)+sqrt(abs(x))-0.7).*(4-x.*x).^0.01;plot(x,y);

    range           x
    ----   =   --------------
    width           w

    w = width * x / range
     */
    const option = {
        background: '#061928',
        padding: 10,
        coordinateColor: 'rgba(255, 255, 255, 0.5)',
        coordinateLineWidth: 2,
        coordinateArrowWidth: 10,
        coordinateArrowLength: 25,
        strokeStyle: '#F00',
        strokeWidth: 2,
        range: [-5, 5],
    };
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    class Element {
        constructor(minX, maxX, xStep, func, strokeWidth, strokecolor) {
            this.minX = minX;
            this.maxX = maxX;
            this.xStep = xStep;
            this.func = func;
            this.strokeWidth = strokeWidth;
            this.strokecolor = strokecolor;
            this.points = [];
            this.createPoints();
        }
        createPoints() {
            for (let temp = this.minX; temp <= this.maxX; temp += this.xStep) {
                this.points.push(new Point(temp, this.func(temp)));
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.lineWidth = this.strokeWidth;
            ctx.strokeStyle = this.strokecolor;
            ctx.beginPath();
            this.points.forEach((item) => {
                ctx.lineTo(item.x, item.y);
            });
            ctx.stroke();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.reset();
        },
        reset() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.origin = new Point(drawer.w / 2, drawer.h / 2);
            drawer.range = 10;
            drawer.width = drawer.w - option.padding - option.padding;
            drawer.step = drawer.width / drawer.range;
        }

    };
})();
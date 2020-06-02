(() => {
    /*
    b = -13;
    y = Math.pow(x * x, 1 / 3) + 0.9 * Math.sqrt(20.3 - Math.pow(x , 2)) - Math.sin(5 * b * Math.PI * x);

    x=[-2:.001:2];y=(sqrt(cos(x)).*cos(200*x)+sqrt(abs(x))-0.7).*(4-x.*x).^0.01;plot(x,y);

    POWER(A3^2,1/3)+0.9*SQRT(3.3-A3^2)*SIN($G$2*PI()*A3)
    Math.power(x * x, 1 / 3) + 0.9 * Math.sqrt(3.3 - x * x) * Math.sin( * Math.PI * x)

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
        range: [-10, 5],
    };
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    class Element {
        constructor(minX, maxX, xStep, func, strokeWidth, strokecolor, scale) {
            this.minX = minX;
            this.maxX = maxX;
            this.xStep = xStep;
            this.func = func;
            this.strokeWidth = strokeWidth;
            this.strokecolor = strokecolor;
            this.scale = scale;
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
                ctx.lineTo(item.x * this.scale, -item.y * this.scale * 0.8);
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
            drawer.initElements();
            drawer.current = 0;
            drawer.animate();
            drawer.bindEvent();
        },
        reset() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.origin = new Point(drawer.w / 2, drawer.h * 0.6);
            drawer.range = 10;
            drawer.width = drawer.w - option.padding - option.padding;
            drawer.step = drawer.width / drawer.range;
        },
        bindEvent() {
            window.onresize = drawer.reset;
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.current++;
            if (drawer.current >= drawer.elements.length) {
                drawer.current = 0;
            }
            console.log(drawer.current);
        },
        initElements() {
            drawer.elements = [];
            for (let b = -30; b < 30; b+=0.05) {
                drawer.elements.push(new Element(-3, 3, 0.01, (x) => {
                    return Math.pow(x * x, 1 / 3) + 0.9 * Math.sqrt(3.3 - x * x) * Math.sin(b * Math.PI * x);
                }, option.strokeWidth, option.strokeStyle, drawer.step));
            }
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.drawCoordinate(ctx);
            ctx.save();
            ctx.translate(drawer.origin.x, drawer.origin.y);
            drawer.elements[drawer.current].draw(ctx);
            ctx.restore();
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        drawCoordinate(ctx) {
            ctx.save();
            ctx.strokeStyle = option.coordinateColor;
            ctx.lineWidth = option.coordinateLineWidth;

            ctx.beginPath();
            ctx.moveTo(option.padding, drawer.origin.y);
            ctx.lineTo(drawer.w - option.padding - option.coordinateArrowLength, drawer.origin.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(drawer.origin.x, option.padding + option.coordinateArrowLength);
            ctx.lineTo(drawer.origin.x, drawer.h - option.padding);
            ctx.stroke();

            ctx.fillStyle = option.coordinateColor;
            ctx.beginPath();
            ctx.moveTo(drawer.w - option.padding, drawer.origin.y);
            ctx.lineTo(drawer.w - option.padding - option.coordinateArrowLength, drawer.origin.y - option.coordinateArrowWidth / 2);
            ctx.lineTo(drawer.w - option.padding - option.coordinateArrowLength, drawer.origin.y + option.coordinateArrowWidth / 2);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(drawer.origin.x, option.padding);
            ctx.lineTo(drawer.origin.x - option.coordinateArrowWidth / 2, option.padding + option.coordinateArrowLength);
            ctx.lineTo(drawer.origin.x + option.coordinateArrowWidth / 2, option.padding + option.coordinateArrowLength);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

    };
    drawer.start();
})();
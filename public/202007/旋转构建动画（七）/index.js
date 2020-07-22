{
    const option = {
        time: 600,
        sideNum: 5,
        num: 40,
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
        getRadius() {
            return this.radius;
        }
        setRadius(value) {
            this.radius = value;
        }
        setRotate(rotate) {
            this.rotate = rotate;
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
        stroke(ctx, lineWidth) {
            let path = this.generatePath(this.radius);
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.rotate(this.rotate);
            ctx.strokeStyle = this.style;
            ctx.lineWidth = lineWidth || 1;
            ctx.stroke(path);
            ctx.restore();
        }
        fill(ctx) {
            let path = this.generatePath(this.radius);
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.rotate(this.rotate);
            ctx.fillStyle = this.style;
            ctx.fill(path);
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
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = drawer.width * 0.45;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;
            drawer.initElements();
            drawer.count = 0;
            drawer.angleStep = 2 * Math.PI / option.sideNum / option.time;
            drawer.sideAngle = (option.sideNum - 2) * Math.PI / option.sideNum / 2;
        },
        bindEvent() {
            window.addEventListener('resize', drawer.init, false);
        },
        initElements() {
            drawer.elements = [];
            for (let i = 0; i < option.num; i++) {
                drawer.elements.push(new Polygon(
                    drawer.ox,
                    drawer.oy,
                    option.sideNum,
                    drawer.radius,
                    -Math.PI / 2,
                    'hsla(' + (i * 15) + ', 100%, 60%, 1)'
                ));
            }
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            // console.log(drawer.count, drawer.elements[1].rotate, drawer.elements[1].radius);
            let angle = drawer.count * drawer.angleStep,
                bl = Math.sin(drawer.sideAngle) / Math.sin(Math.PI - drawer.sideAngle - angle);
            drawer.elements.forEach((item, index) => {
                item.setRotate(index * angle - Math.PI / 2);
                if (index > 0) {
                    item.setRadius(drawer.elements[index - 1].getRadius() * bl);
                }
            });
            drawer.count++;
            if (drawer.count > option.time) {
                drawer.count = 0;
            }

        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements.map((item) => item.stroke(ctx));
            CanvasUtil.drawMark(ctx, drawer.mark);
        }
    };

    drawer.start();

}

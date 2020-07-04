{
    const option = {
        time: 25,
    };

    class Element {
        constructor(x, y, time) {
            this.x = x;
            this.y = y;
            this.time = time;

            this.current = 0;

            this.elements = [
                new Circular(0, 50, this.time, 2),
            ]


        }
        update() {
            if (this.current <= this.time) {
                this.current++;
                this.elements.map((item) => item.update());
            }
        }
        draw(ctx) {
            if (this.current <= this.time) {
                ctx.save();
                ctx.translate(this.x, this.y);

                this.elements.map((item) => item.draw(ctx));

                ctx.restore();
            }
        }
    }

    class Circular {
        constructor(minRadius, maxRadius, time, lineWidth) {
            this.minRadius = minRadius;
            this.maxRadius = maxRadius;
            this.time = time;
            this.lineWidth = lineWidth;
            this.radiusStep = (this.maxRadius - this.minRadius) / this.time;

            this.current = 0;
            this.ratio = 0;
        }
        update() {
            if (this.current <= this.time) {
                this.current++;
                this.ratio = this.current / this.time;
            }
        }
        draw(ctx) {
            if (this.current <= this.time) {
                ctx.save();
                ctx.beginPath();
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = 'hsla(100, 100%, 50%, ' + (1 - this.ratio) + ')';
                ctx.arc(0, 0, this.radiusStep * this.current, 0, 2 * Math.PI, false);
                ctx.stroke();
                ctx.restore();
            }
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            if (drawer.currentElement) {
                drawer.currentElement.update();
            }
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            if (drawer.currentElement) {
                drawer.currentElement.draw(ctx);
            }

        },
        bindEvent() {
            drawer.c.addEventListener('click', drawer.mouseClick, false);
        },
        mouseClick(e) {
            let point = CanvasUtil.eventToCanvas(drawer.c, e);
            drawer.currentElement = new Element(point.x, point.y, option.time);
        }
    };
    drawer.start();
}
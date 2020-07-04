{
    const option = {
        time: 50,
    };

    class Element {
        constructor(x, y, time) {
            this.x = x;
            this.y = y;
            this.time = time;

            this.current = 0;
            this.ratio = 0;

            this.circular = {
                minRadius: 5,
                maxRadius: 100,
                radiusStep: 95 / this.time,
                lineWidth: 2,
            }

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
                ctx.translate(this.x, this.y);

                ctx.beginPath();
                ctx.lineWidth = this.circular.lineWidth;
                ctx.strokeStyle = 'hsla(100, 100%, 50%, ' + (1 - this.ratio) + ')';
                ctx.arc(0, 0, this.circular.radiusStep * this.current, 0, 2 * Math.PI, false);
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
            let point = CanvasUtil.windowToCanvas(drawer.c, e.clientX, e.clientY);
            drawer.currentElement = new Element(point.x, point.y, option.time);
        }
    };
    drawer.start();
}
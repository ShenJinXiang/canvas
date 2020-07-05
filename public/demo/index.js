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

            this.elements = [
                new SpreadCircular(this.x, this.y, 0, 50, this.time, 2),
                new SpreadPoint(this.x, this.y, 10, 80, this.time, 12, 2, '#048', 0, Math.PI / 60),
                new SpreadPoint(this.x, this.y, 20, 100, this.time, 12, 2, 'red', 0, -Math.PI / 60),
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
                this.elements.map((item) => item.draw(ctx));
            }
        }
    }

    class SpreadCircular {
        constructor(ox, oy, minRadius, maxRadius, time, lineWidth) {
            this.ox = ox;
            this.oy = oy;
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
                ctx.translate(this.ox, this.oy);
                ctx.beginPath();
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = 'hsla(100, 100%, 50%, ' + (1 - this.ratio) + ')';
                ctx.arc(0, 0, this.radiusStep * this.current, 0, 2 * Math.PI, false);
                ctx.stroke();
                ctx.restore();
            }
        }
    }

    class SpreadPoint {
        constructor(ox, oy, minRadius, maxRadius, time, pointNum, pointRadius, pointStyle, rotateBeginAngle, rotateAngleStep) {
            this.ox = ox;
            this.oy = oy;
            this.minRadius = minRadius;
            this.maxRadius = maxRadius;
            this.time = time;
            this.pointNum = pointNum;
            this.pointRadius = pointRadius;
            this.pointStyle = pointStyle;
            this.rotateBeginAngle = rotateBeginAngle;
            this.rotateAngleStep = rotateAngleStep;
            this.pointAngleStep = 2 * Math.PI / this.pointNum;
            this.radiusStep = (this.maxRadius - this.minRadius) / this.time;

            this.current = 0;
            this.ratio = 0;
            this.rotateAngle = this.rotateBeginAngle;
        }
        update() {
            if (this.current <= this.time) {
                this.current++;
                this.ratio = this.current / this.time;
                this.rotateAngle += this.rotateAngleStep;
            }
        }
        draw(ctx) {
            if (this.current <= this.time) {
                ctx.save();
                ctx.translate(this.ox, this.oy);
                ctx.rotate(this.rotateAngle);
                for (let i = 0; i < this.pointNum; i++) {
                    ctx.beginPath();
                    ctx.fillStyle = this.pointStyle;
                    ctx.arc(
                        this.current * this.radiusStep * Math.cos(i * this.pointAngleStep),
                        this.current * this.radiusStep * Math.sin(i * this.pointAngleStep),
                        this.pointRadius,
                        0,
                        2 * Math.PI,
                        false
                    );
                    ctx.fill();
                }
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
{
    const option = {
        toothWidth: 10,
        toothDeep: 20,
        markRadius: 3,
        controBtnWidth: 20
    };

    class Point{
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class Element {
        constructor(type, origin, radius, toothWidth, toothDeep, toothDw, style, oRadius) {
            this.type = type;
            this.origin = origin;
            this.radius = radius;
            this.toothDeep = toothDeep;
            this.toothWidth = toothWidth;
            this.toothDw = toothDw;
            this.style = style;
            if (this.type) {
                this.oRadius = oRadius;
            }
            this.angle = 0;

            this.outerRadius = this.radius;
            this.innerRadius = this.radius - this.toothDeep;
            this.outerAngle = this.toothWidth / this.outerRadius;
            this.innerAngle = this.toothWidth / this.innerRadius;
            let dAngle = this.toothDw / this.outerRadius;
            this.toothNum = Math.floor(2 * Math.PI / (this.outerAngle + this.innerAngle + 2 * dAngle));
            this.toothAngle = 2 * Math.PI / this.toothNum;
            this.midAngle = ((2 * Math.PI / this.toothNum) - (this.outerAngle + this.innerAngle)) / 2;

            this.marks = [];
        }
        update() {
            this.angle += this.angleStep;
            this.marks.forEach((mark) => {
                mark.addPoint(new Point(
                    this.origin.x + mark.len * Math.cos(this.angle + mark.angle),
                    this.origin.y + mark.len * Math.sin(this.angle + mark.angle),
                ));
            });
        }
        setAngleStep(angleStep) {
            this.angleStep = angleStep;
        }
        setOrigin(point) {
            this.origin = point;
        }
        addMark(mark) {
            this.marks.push(mark);
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.origin.x, this.origin.y);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.fillStyle = this.style;
            for (let i = 0; i < this.toothNum; i++) {
                let angle = i * this.toothAngle;
                ctx.arc(0, 0, this.outerRadius, angle, angle + this.outerAngle / 2);
                ctx.lineTo(
                    this.innerRadius * Math.cos(angle + this.outerAngle / 2 + this.midAngle),
                    this.innerRadius * Math.sin(angle + this.outerAngle / 2 + this.midAngle)
                );
                ctx.arc(0, 0, this.innerRadius, (angle + this.outerAngle / 2 + this.midAngle), (angle + this.outerAngle / 2 + this.midAngle + this.innerAngle));
                ctx.lineTo(
                        this.outerRadius * Math.cos(angle + this.outerAngle / 2 + 2 * this.midAngle + this.innerAngle),
                        this.outerRadius * Math.sin(angle + this.outerAngle / 2 + 2 * this.midAngle + this.innerAngle)
                );
                ctx.arc(0, 0, this.outerRadius,
                    angle + this.outerAngle / 2 + 2 * this.midAngle + this.innerAngle,
                    angle + this.outerAngle + 2 * this.midAngle + this.outerAngle
                );
            }
            if (this.type) {
                ctx.arc(0, 0, this.outerRadius, 2 * Math.PI - this.outerAngle / 2, 2 * Math.PI);
                ctx.arc(0, 0, this.oRadius, 0, 2 * Math.PI, true);
            }
            ctx.fill();
            this.drawMarks(ctx);
            ctx.restore();

            this.marks.forEach((mark) => {
                mark.drawPoints(ctx);
                mark.drawController(ctx);
            });
        }
        drawMarks(ctx) {
            this.marks.forEach((item) => {
				item.draw(ctx);
            });
        }
        eventHandler(x, y) {
            this.marks.forEach((item) => item.clickHandler(x, y));
        }

    }

    class Mark {
        constructor(angle, len, radius, style, length) {
            this.angle = angle;
            this.len = len;
            this.radius = radius;
            this.style = style;
            this.length = length;
            this.points = [];
        }
        draw(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = this.style;
            ctx.fillStyle = this.style;
            ctx.arc(this.len * Math.cos(this.angle), this.len * Math.sin(this.angle), this.radius, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        }
        addPoint(point) {
            if (this.markController.flag) {
                this.points.push(point);
                if (this.points.length >= this.length) {
                    this.points.shift();
                }
            }
        }
        drawPoints(ctx) {
            if (this.markController.flag) {
                ctx.save();
                ctx.strokeStyle = this.style;
                ctx.beginPath();
                this.points.forEach((item) => ctx.lineTo(item.x, item.y));
                ctx.stroke();
                ctx.restore();
            }
        }
        setControBtn(markController) {
            this.markController = markController;
        }
        drawController(ctx) {
            this.markController.draw(ctx);
        }
        clickHandler(x, y) {
            this.markController.eventHandler(x, y);
            if (!this.markController.flag) {
                this.points = [];
            }
        }

    }

    class MarkController {
        constructor(sx, sy, width, height, style, flag) {
            this.sx = sx;
            this.sy = sy;
            this.width = width;
            this.height = height;
            this.style = style;
            this.flag = flag;
        }
        draw(ctx) {
            ctx.save();
            ctx.beginPath();
            if (this.flag) {
                ctx.fillStyle = this.style;
                ctx.fillRect(this.sx, this.sy, this.width, this.height);
            } else {
                ctx.strokeStyle = this.style;
                ctx.strokeRect(this.sx, this.sy, this.width, this.height);
            }
            ctx.restore();
        }
        eventHandler(x, y) {
            if (x >= this.sx && x <= this.sx + this.width && y >= this.sy && y <= this.sy + this.height) {
                this.flag = !this.flag;
            }
            return this.flag;
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.init();
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.controllerMargin = drawer.width * 0.05;
            drawer.outerRadius = drawer.width * 0.45;
            drawer.innerRadius = drawer.width * 0.25;
            drawer.innerOriginRadius = drawer.outerRadius - drawer.innerRadius;
            drawer.angle = 0;
            drawer.initElements();
            drawer.angleStep = Math.PI / 90;
            drawer.inner.setAngleStep(drawer.inner.toothAngle * drawer.angleStep / drawer.outer.toothAngle - drawer.angleStep);
            for (let i = 1; i < 5; i++) {
                let style = 'hsla(' + (i * 20) + ', 80%, 60%, 1)',
                    mark = new Mark(0, i * 0.2 * drawer.inner.radius, option.markRadius, style, 10000);
                mark.setControBtn(new MarkController(
                    drawer.w - 2 * i * option.controBtnWidth,
                    option.controBtnWidth,
                    option.controBtnWidth,
                    option.controBtnWidth,
                    style,
                    false
                ));
                drawer.inner.addMark(mark);
            }
        },
        bindEvent() {
            window.onresize = drawer.init;
            drawer.c.onclick = (e) => {
                let p = CanvasUtil.windowToCanvas(drawer.c, e.clientX, e.clientY);
                drawer.inner.eventHandler(p.x, p.y);
            }
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
            // setTimeout(drawer.animate, 1000);
        },
        update() {
            drawer.angle += -drawer.angleStep;
            drawer.inner.setOrigin(
                new Point(
                    drawer.w / 2 + drawer.innerOriginRadius * Math.cos(drawer.angle),
                    drawer.h / 2 + drawer.innerOriginRadius * Math.sin(drawer.angle)
                )
            );
            drawer.inner.update();
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            // drawer.drawLine(ctx);
            drawer.inner.draw(ctx);
            drawer.outer.draw(ctx);
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        drawLine(ctx) {
            ctx.save();
            ctx.strokeStyle = 'green';
            ctx.beginPath();
            ctx.lineTo(0, drawer.h / 2);
            ctx.lineTo(drawer.w, drawer.h / 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineTo(drawer.w / 2, 0);
            ctx.lineTo(drawer.w / 2, drawer.h);
            ctx.stroke();
            ctx.restore();
        },
        initElements() {
            drawer.outer = new Element(
                1,
                new Point(drawer.w / 2, drawer.h / 2),
                drawer.outerRadius,
                option.toothWidth,
                option.toothDeep,
                10,
                'rgba(0, 200, 100, 0.5)',
                drawer.outerRadius * 1.08,
            );
            drawer.inner = new Element(
                0,
                new Point(drawer.w / 2, drawer.h / 2),
                drawer.innerRadius,
                option.toothWidth,
                option.toothDeep,
                10,
                'rgba(100, 100, 200, 0.5)',
            );
        }
    };
    drawer.start();
}

{
    const option = {
        toothWidth: 10,
        toothDeep: 20,
        markRadius: 3,
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
        }
        setAngleStep(angleStep) {
            this.angleStep = angleStep;
        }
        setOrigin(point) {
            this.origin = point;
        }
        addMark(angle, radius, style, mRadius) {
            this.marks.push({
                angle: angle,
                radius: radius,
                style: style,
                mRadius: mRadius,
            });
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
        }
        drawMarks(ctx) {
            this.marks.forEach((item) => {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = item.style;
                ctx.arc(item.radius * Math.cos(item.angle), item.radius * Math.sin(item.angle), item.mRadius, 0, 2 * Math.PI, false);
                ctx.stroke();
                ctx.restore();
            });
        }

    }

    class Mark {
        constructor(origin, angle, radius, len, style, length) {
            this.origin = origin;
            this.angle = angle;
            this.radius = radius;
            this.len = len;
            this.style = style;
            this.length = length;
            this.points = [];
        }
        draw(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = this.style;
            ctx.arc(this.len * Math.cos(this.angle), this.len * Math.sin(this.angle), this.radius, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.restore();
        }
        addPoint(point) {
            this.points.push(point);
            if (this.points.length >= this.length) {
                this.points.shift();
            }
        }
        drawPoints(ctx) {
            ctx.save();
            ctx.strokeStyle = this.style;
            ctx.beginPath();
            this.points.forEach((item) => ctx.lineTo(item.x, item.y));
            ctx.stroke();
            ctx.restore();
        }

    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.outerRadius = drawer.width * 0.45;
            drawer.innerRadius = drawer.width * 0.25;
            drawer.innerOriginRadius = drawer.outerRadius - drawer.innerRadius;
            drawer.angle = 0;
            drawer.initElements();
            drawer.angleStep = Math.PI / 180;
            drawer.inner.setAngleStep(drawer.inner.toothAngle * drawer.angleStep / drawer.outer.toothAngle - drawer.angleStep);
            drawer.inner.addMark(0, 0.2 * drawer.inner.radius, 'red', option.markRadius);
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
            drawer.drawLine(ctx);
            drawer.inner.draw(ctx);
            drawer.outer.draw(ctx);
            // ctx.save();
            // ctx.translate(drawer.w / 2, drawer.h / 2);
            // ctx.beginPath();
            // ctx.lineTo(0, 0);
            // ctx.lineTo(
            //     drawer.outerRadius * Math.cos(drawer.angle),
            //     drawer.outerRadius * Math.sin(drawer.angle),
            // );
            // ctx.stroke();
            // ctx.restore();
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
                null,
                // -drawer.angleStep * drawer.outerRadius / drawer.innerRadius
            );
        }
    };
    drawer.start();
}

/**

 oangle / iangle = angles / x

 x = iangle * angle / o
 */
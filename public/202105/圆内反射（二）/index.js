{
    const option = {
        outerRadius: 0.42,
        innerRadius: 0.4,
        speed: 10,
        backgroundColor: '#000',
        outerColor: '#ccc',
        innerColor: '#ddd',
        centerLineColor: '#444',
        centerLineWid: 2,
        centerLineRadius: 0.01,
        elementNumber: 25,
        elementSize: 4,
        elementDiff: 1,
        wakeLen: 10
    };

    class Point {
        constructor(x, y, angle, size) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.size = size;
            this.x1 = this.x + this.size * Math.cos(this.angle - Math.PI / 2);
            this.y1 = this.y + this.size * Math.sin(this.angle - Math.PI / 2);
            this.x2 = this.x + this.size * Math.cos(this.angle + Math.PI / 2);
            this.y2 = this.y + this.size * Math.sin(this.angle + Math.PI / 2);
        }
    }

    class Element {
        constructor(sx, sy, angle, speed, size, hue, outerRadius, wakeLen) {
            this.sx = sx;
            this.sy = sy;
            // this.x = this.sx;
            // this.y = this.sy;
            this.angle = angle;
            this.speed = speed;
            this.size = size;
            this.hue = hue;
            this.color = this.colorStr(this.hue, 1);
            this.outerRadius = outerRadius;
            this.speedX = this.speed * Math.cos(this.angle);
            this.speedY = this.speed * Math.sin(this.angle);
            this.rl = Math.round(this.outerRadius * this.outerRadius);
            this.wakeLen = wakeLen;
            this.points = [new Point(sx, sy, this.angle, this.size)];
        }
        update() {
            let currentPoint = this.points[this.points.length - 1],
                nx = currentPoint.x + this.speedX,
                ny = currentPoint.y + this.speedY,
                nr = Math.round(nx * nx + ny * ny);
            if (nr < this.rl) {
                this.addPoint(new Point(nx, ny, this.angle, this.size));
            } else if (nr != this.rl) {
                let max = {x: nx, y: ny},
                    min = {x: currentPoint.x, y: currentPoint.y},
                    mid;
                while (nr != this.rl) {
                    mid = {x: (max.x + min.x) / 2, y: (max.y + min.y) / 2};
                    nr = Math.round(mid.x * mid.x + mid.y * mid.y);
                    if (nr > this.rl) {
                        max = mid;
                    } else {
                        min = mid;
                    }
                }
                this.changeAngle(mid.x, mid.y);
                this.addPoint(new Point(mid.x, mid.y, this.angle, this.size));
                let ln = Math.sqrt(Math.pow(mid.x - currentPoint.x, 2) + Math.pow(mid.y - currentPoint.y, 2)),
                    sn = this.speed - ln;
                nx = mid.x + sn * Math.cos(this.angle);
                ny = mid.y + sn * Math.sin(this.angle);
                this.addPoint(new Point(nx, ny, this.angle, this.size));
            } else {
                this.changeAngle(nx, ny);
                this.addPoint(new Point(nx, ny, this.angle, this.size));
            }
        }
        addPoint(point) {
            this.points.push(point);
            if (this.points.length > this.wakeLen) {
                this.points.shift();
            }
        }
        draw(ctx) {
            this.alphaStep = 1 / this.points.length;
            ctx.save();
            this.points.forEach((item, index, arr) => {
                if (index < arr.length - 1) {
                    ctx.fillStyle = this.colorStr(this.hue, this.alphaStep * index);
                    ctx.beginPath();
                    ctx.moveTo(item.x1, item.y1);
                    ctx.lineTo(item.x2, item.y2);
                    ctx.lineTo(arr[index + 1].x2, arr[index + 1].y2);
                    ctx.lineTo(arr[index + 1].x1, arr[index + 1].y1);
                    ctx.closePath();
                    ctx.fill();
                }
            });
            let currentPoint = this.points[this.points.length - 1];
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(currentPoint.x, currentPoint.y, this.size, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        }
        changeAngle(x, y) {
            let rAng;
            if (Math.abs(x) <= 0.5) {
                rAng = y > 0 ? Math.PI / 2 : -Math.PI / 2;
            } else {
                rAng = Math.atan(y / x);
            }
            rAng = rAng % (2 * Math.PI);
            rAng = rAng < 0 ? rAng + 2 * Math.PI : rAng;
            this.angle = Math.PI + (2 * rAng  - this.angle);
            this.speedX = this.speed * Math.cos(this.angle);
            this.speedY = this.speed * Math.sin(this.angle);
        }
        colorStr (hue, alpha) {
            return "hsl(" + hue + ", 100%, 50%, " + alpha + ")";
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.init();
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.innerRadius = drawer.width * option.innerRadius;
            drawer.outerRadius = drawer.width * option.outerRadius;
            drawer.centerLineRadius = drawer.width * option.centerLineRadius;
            drawer.elements = [];

            let x = -drawer.innerRadius * 0.7,
                angle = random(2 * Math.PI),
                hueStep = 360 / option.elementNumber;
            for (let i = 0; i < option.elementNumber; i++) {
                drawer.elements.push(
                    new Element(
                        x + option.elementDiff * i,
                        0,
                        angle,
                        option.speed,
                        option.elementSize,
                        hueStep * i,
                        drawer.innerRadius,
                        option.wakeLen)
                )
            }
        },
        animate() {
            drawer.draw();
            drawer.update();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elements.forEach((item) => item.update());
        },
        draw() {
            let ctx = drawer.ctx;
            drawer.drawStatic(ctx);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            drawer.elements.forEach((item) => {
                item.draw(ctx);
            });
            ctx.restore();
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        drawStatic(ctx) {
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);

            ctx.save();

            ctx.translate(drawer.w / 2, drawer.h / 2);
            ctx.beginPath();
            ctx.fillStyle = option.outerColor;
            ctx.arc(0, 0, drawer.outerRadius, 0, 2 * Math.PI, false);
            ctx.arc(0, 0, drawer.innerRadius, 0, 2 * Math.PI, true);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = option.innerColor;
            ctx.arc(0, 0, drawer.innerRadius, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.strokeStyle = option.centerLineColor;
            ctx.lineWidth = option.centerLineWid;
            ctx.beginPath();
            ctx.moveTo(-drawer.centerLineRadius, 0);
            ctx.lineTo(drawer.centerLineRadius, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, -drawer.centerLineRadius);
            ctx.lineTo(0, drawer.centerLineRadius);
            ctx.stroke();

            ctx.restore();
        },

    }

    drawer.start();
}

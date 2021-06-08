{
    const option = {
        backgroundColor: '#000',
        ellipseMajor: 0.4,
        ellipseMinor: 0.30,
        ellipseStrokeColor: '#f1f1f1',
        ellipseFocusRadius: 2,
        ellipseFocusColor: '#fff',
        pointsLength: 50,
        linePointsLength: 1000,
        speed: 40,
    }

    const kit = {
        distanceSquared(point1, point2) {
            return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
        },
        distance(point1, point2) {
            return Math.sqrt(this.distanceSquared(point1, point2));
        },
        drawLines(ctx, points, color) {
            ctx.save();
            for (let i = 0; i < points.length - 1; i++) {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineTo(points[i].x, points[i].y);
                ctx.lineTo(points[i + 1].x, points[i + 1].y);
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        draw(ctx, radius, color) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        }
    }

    class PointPath {
        constructor(startPoint, angle, speed, color, fixLength, origin1, origin2) {
            this.startPoint = startPoint;
            this.angle = angle;
            this.speed = speed;
            this.color = color;
            this.fixLength = fixLength;
            this.origin1 = origin1;
            this.origin2 = origin2;
            this.points = [];
            this.linePoints = [];
        }
        addPoint(point) {
            this.points.push(point);
            if (this.points.length > option.pointsLength) {
                this.points.shift();
            }
        }
        clearPoints() {
            this.points = [];
        }
        addLinePoint(point) {
            this.linePoints.push(point);
            if (this.linePoints.length > option.linePointsLength) {
                this.linePoints.shift();
            }
        }
        draw(ctx) {
            if (this.points.length < 1 && this.linePoints.length < 1) {
                return
            }
            ctx.save();
            kit.drawLines(ctx, this.linePoints, this.color);
            kit.drawLines(ctx, this.points, this.color);
            ctx.restore();
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
            drawer.ellipse = {
                a: drawer.width * option.ellipseMajor,
                b: drawer.width * option.ellipseMinor
            };
            drawer.ellipse.c = Math.sqrt(Math.pow(drawer.ellipse.a, 2) - Math.pow(drawer.ellipse.b, 2));
            drawer.ellipse.p1 = new Point(drawer.ellipse.c, 0);
            drawer.ellipse.p2 = new Point(-drawer.ellipse.c, 0);
        },
        animate() {
            drawer.draw();
            drawer.update();
            requestAnimationFrame(drawer.animate);
        },
        update() {

        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            drawer.drawEllipse(ctx);
            ctx.restore();
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        drawEllipse(ctx) {
            let angleStep = Math.PI / 180;
            ctx.save();
            ctx.strokeStyle = option.ellipseStrokeColor;
            ctx.beginPath();
            for(let i = 0; i < 360; i++) {
                ctx.lineTo(
                    drawer.ellipse.a * Math.cos(i * angleStep),
                    drawer.ellipse.b * Math.sin(i * angleStep)
                );
            }
            ctx.closePath();
            ctx.stroke();


            drawer.ellipse.p1.draw(ctx, option.ellipseFocusRadius, option.ellipseStrokeColor);
            drawer.ellipse.p2.draw(ctx, option.ellipseFocusRadius, option.ellipseStrokeColor);

            ctx.restore();
        }
    };

    drawer.start();
}

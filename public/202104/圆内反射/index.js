{
    const option = {
        radius: 0.4,
        pointsLength: 400
    };

    class Point {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }
    }

    class PointPath {
        constructor(startPoint, angle) {
            this.points = [startPoint];
            this.angle = angle;
        }
        addPoint(point) {
            this.points.push(point);
            if (this.points.length > option.pointsLength) {
                this.points.shift();
            }
        }
        draw(ctx) {
            if (this.points.length <= 1) {
                return
            }
            ctx.save();
            for (let i = 0; i < this.points.length - 1; i++) {
                ctx.beginPath()
                ctx.strokeStyle = this.points[i].color;
                ctx.lineTo(this.points[i].x, this.points[i].y);
                ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.init();
            console.log(drawer);
            drawer.draw();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.radius = Math.min(drawer.w, drawer.h) * option.radius;
            drawer.path = new PointPath(drawer.randomStartPoint(), 0);
            drawer.path.addPoint(new Point(1, 1, drawer.color(1)));
            drawer.path.addPoint(new Point(10, 2, drawer.color(20)));
            drawer.path.addPoint(new Point(20, 3, drawer.color(30)));
            drawer.path.addPoint(new Point(30, 4, drawer.color(40)));
            drawer.path.addPoint(new Point(40, 5, drawer.color(50)));
            drawer.path.addPoint(new Point(50, 6, drawer.color(60)));
            drawer.path.addPoint(new Point(60, 7, drawer.color(70)));
            drawer.path.addPoint(new Point(70, 8, drawer.color(80)));
            drawer.path.addPoint(new Point(80, 9, drawer.color(90)));
            drawer.path.addPoint(new Point(90, 10, drawer.color(100)));
            drawer.path.addPoint(new Point(100, 11, drawer.color(110)));
            drawer.path.addPoint(new Point(110, 12, drawer.color(120)));
            drawer.path.addPoint(new Point(120, 13, drawer.color(130)));
            drawer.path.addPoint(new Point(130, 14, drawer.color(140)));
            drawer.path.addPoint(new Point(140, 15, drawer.color(150)));
            drawer.path.addPoint(new Point(150, 16, drawer.color(160)));
            drawer.path.addPoint(new Point(160, 17, drawer.color(170)));
            drawer.path.addPoint(new Point(170, 18, drawer.color(180)));
            drawer.path.addPoint(new Point(180, 19, drawer.color(190)));
            drawer.path.addPoint(new Point(190, 20, drawer.color(200)));
            drawer.path.addPoint(new Point(200, 21, drawer.color(210)));
        },
        randomStartPoint() {
            let r = random(drawer.radius * .4, drawer.radius * .7),
                angle = random(2 * Math.PI),
                x = r * Math.cos(angle),
                y = r * Math.sin(angle),
                color = drawer.color(1);
            return new Point(x, y, color);
        },
        color(hue) {
            return "hsl(" + hue + ", 100%, 50%)";
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            ctx.beginPath();
            ctx.strokeStyle = '#fff';
            ctx.arc(0, 0, drawer.radius, 0, 2 * Math.PI, false);
            ctx.stroke();
            drawer.path.draw(ctx);
            ctx.restore();
        }
    };

    drawer.start();
}
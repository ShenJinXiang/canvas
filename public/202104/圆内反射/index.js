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
        constructor() {
            this.points = [];
        }
        addPoint(point) {
            this.points.push(point);
            if (this.points.length > option.pointsLength) {
                this.points.shift();
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(-20, 0);
            ctx.lineTo(20, 0);
            ctx.moveTo(0, -20);
            ctx.lineTo(0, 20);
            ctx.stroke();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.init();
            drawer.draw();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.radius = Math.min(drawer.w, drawer.h) * option.radius;
            drawer.path = new PointPath();
            drawer.path.addPoint(drawer.randomStartPoint());
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
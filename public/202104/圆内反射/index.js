{
    const option = {
        radius: 0.4,
        pointsLength: 400,
        speed: 10
    };

    class Point {
        constructor(x, y, hue) {
            this.x = x;
            this.y = y;
            this.hue = hue;
            this.color = "hsl(" + this.hue + ", 100%, 50%)";
        }
    }

    class PointPath {
        constructor(startPoint, angle, speed, radius) {
            this.points = [startPoint];
            this.angle = angle;
            this.speed = speed;
            this.speedX = this.speed * Math.cos(angle);
            this.speedY = this.speed * Math.sin(angle);
            this.radius = this.radius;
            this.rl = this.radius * this.radius;
        }
        addPoint(point) {
            this.points.push(point);
            if (this.points.length > option.pointsLength) {
                this.points.shift();
            }
        }
        update() {
            let last = this.points[this.points.length - 1],
                next = new Point(last.x + this.speedX, last.y + this.speedY, last.hue + 1),
                nr = next.x * next.x + next.y * next.y;


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
            drawer.animate();
            drawer.draw();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.radius = Math.min(drawer.w, drawer.h) * option.radius;
            drawer.path = new PointPath(drawer.randomStartPoint(), random(2 * Math.PI));
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.path.update();
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
        }
    };

    drawer.start();
}
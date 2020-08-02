{

    const option = {
        num: 10,
        angleStep: Math.PI / 1080
    }
    /**
     * 螺旋线
     */
    class Spiral {
        constructor(ox, oy, rotate, a, k, radius, lineWidth, style, flag, angleStep) {
            this.ox = ox;
            this.oy = oy;
            this.rotate = rotate;
            this.a = a;
            this.k = k;
            this.radius = radius;
            this.lineWidth = lineWidth;
            this.style = style;
            this.flag = flag;
            this.angleStep = angleStep;

            this.maxAngle = Math.sqrt((this.radius - this.k) / this.a);
            this.ballAngleStep = 0.003;
            this.count = 0;
            this.maxCount = 150;
            this.initBalls();
        }
        initBalls() {
            this.balls = [];
            let num = this.maxAngle / (this.ballAngleStep * this.maxCount);
            for (let i = 1; i <= num; i++) {
                this.balls.push(new Ball(
                    this.a * Math.pow(i * this.ballAngleStep * this.maxCount, 2) + this.k,
                    this.style,
                    this.a,
                    this.k,
                    this.flag,
                    this.ballAngleStep
                ));
            }
        }
        addBall() {
            this.balls.push(new Ball(
                this.radius,
                this.style,
                this.a,
                this.k,
                this.flag,
                this.ballAngleStep
            ));
        }
        generatePath(a, k, radius, flag) {
            let path = new Path2D();
            path.moveTo(0, 0);
            let r = 0,
                angle = 0,
                angleStep = 0.01;
            while(Math.abs(r) < radius) {
                r = a * Math.pow(angle, 2) + k;
                // r = a * Math.pow(Math.E, angle * k);
                path.lineTo(r * Math.cos(angle), (flag ? 1 : -1) * r * Math.sin(angle));
                angle += angleStep;
            }
            return path;
        }
        update() {
            this.count++;
            if (this.count >= this.maxCount) {
                this.addBall();
                this.count = 0;
            }
            this.balls.forEach((item) => item.update());
            this.balls = this.balls.filter((item) => {
                return item.r > 1;
            });
            this.rotate += this.angleStep;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.rotate(this.rotate);
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.style;
            // let path = CanvasUtil.logarithmicSpiralPath(this.a, this.k, this.radius, this.flag)
            let path = this.generatePath(this.a, this.k, this.radius, this.flag)
            ctx.stroke(path);

            this.balls.forEach((item) => {
                item.draw(ctx);
            });
            ctx.restore();
        }
    }

    class Ball {
        constructor(radius, style, a, k, flag, ballAngleStep) {
            this.radius = radius;
            this.style = style;
            this.a = a;
            this.k = k;
            this.flag = flag;
            this.ballAngleStep = ballAngleStep;
            this.angle = Math.sqrt((this.radius - this.k) / this.a);
            this.r = this.radius * 0.03;
        }
        update() {
            // this.radius -= 0.1;
            // this.angle = Math.sqrt((this.radius - this.k) / this.a);
            // this.r = this.radius * 0.03;
            this.angle -= this.ballAngleStep
            this.radius = this.a * Math.pow(this.angle, 2) + this.k;
            this.r = this.angle * 3;
        }
        draw(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.style;
            ctx.arc(
                this.radius * Math.cos(this.angle),
                (this.flag ? 1 : -1) * this.radius * Math.sin(this.angle),
                this.r, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        }
    }
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.init();
            drawer.ele = new Spiral(
            drawer.w / 2,
            drawer.h / 2,
            0,
                40, 0,
                drawer.radius,
                1,
                '#084',
                true,
            -option.angleStep
            );
            console.log(drawer.ele);
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.radius = Math.sqrt(Math.pow(drawer.w / 2, 2) + Math.pow(drawer.h / 2, 2));
            drawer.initLines();
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            // console.log(drawer.lines[0].rotate);
            drawer.lines.forEach((item) => item.update());
            // drawer.ele.update();
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.lines.forEach((item) => item.draw(ctx));
            // drawer.ele.draw(drawer.ctx);
        },
        initLines() {
            drawer.lines = [];
            let angleStep = 2 * Math.PI / option.num;
            for (let index = 0; index < option.num; index++) {
                drawer.lines.push(new Spiral(
                    drawer.w / 2,
                    drawer.h / 2,
                    index * angleStep,
                        40, 0,
                    drawer.radius,
                    1,
                    '#595',
                    true,
                    -option.angleStep
                ));
                drawer.lines.push(new Spiral(
                    drawer.w / 2,
                    drawer.h / 2,
                    index * angleStep,
                    40, 0,
                    drawer.radius,
                    1,
                    '#595',
                    false,
                option.angleStep
            ));
            }
        }
    };

    drawer.start();
}
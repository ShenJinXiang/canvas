{
    const option = {
        ballColor: '#058',
        ballRadius: 5,
        vx: {min: -1, max: 1},
        vy: {min: 0.5, max: 1},
        ax: {min: -0.1, max: 0.1},
        ay: {min: 0.2, max: 0.5},
    };
    const digitArr = [
        [ [0,0,1,1,1,0,0], [0,1,1,0,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,0,1,1,0], [0,0,1,1,1,0,0] ],//0
        [ [0,0,0,1,1,0,0], [0,1,1,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [1,1,1,1,1,1,1] ],//1
        [ [0,1,1,1,1,1,0], [1,1,0,0,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,1,1,0], [0,0,0,1,1,0,0], [0,0,1,1,0,0,0], [0,1,1,0,0,0,0], [1,1,0,0,0,0,0], [1,1,0,0,0,1,1], [1,1,1,1,1,1,1] ],//2
        [ [1,1,1,1,1,1,1], [0,0,0,0,0,1,1], [0,0,0,0,1,1,0], [0,0,0,1,1,0,0], [0,0,1,1,1,0,0], [0,0,0,0,1,1,0], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0] ],//3
        [ [0,0,0,0,1,1,0], [0,0,0,1,1,1,0], [0,0,1,1,1,1,0], [0,1,1,0,1,1,0], [1,1,0,0,1,1,0], [1,1,1,1,1,1,1], [0,0,0,0,1,1,0], [0,0,0,0,1,1,0], [0,0,0,0,1,1,0], [0,0,0,1,1,1,1] ],//4
        [ [1,1,1,1,1,1,1], [1,1,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,1,1,1,0], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0] ],//5
        [ [0,0,0,0,1,1,0], [0,0,1,1,0,0,0], [0,1,1,0,0,0,0], [1,1,0,0,0,0,0], [1,1,0,1,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0] ],//6
        [ [1,1,1,1,1,1,1], [1,1,0,0,0,1,1], [0,0,0,0,1,1,0], [0,0,0,0,1,1,0], [0,0,0,1,1,0,0], [0,0,0,1,1,0,0], [0,0,1,1,0,0,0], [0,0,1,1,0,0,0], [0,0,1,1,0,0,0], [0,0,1,1,0,0,0] ],//7
        [ [0,1,1,1,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,1,1,0] ],//8
        [ [0,1,1,1,1,1,0], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [1,1,0,0,0,1,1], [0,1,1,1,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,0,1,1], [0,0,0,0,1,1,0], [0,0,0,1,1,0,0], [0,1,1,0,0,0,0] ],//9
        [ [0,0,0,0], [0,0,0,0], [0,1,1,0], [0,1,1,0], [0,0,0,0], [0,0,0,0], [0,1,1,0], [0,1,1,0], [0,0,0,0], [0,0,0,0] ]//:
    ];
    class Ball {
        constructor(x, y, radius, color, vx, vy, ax, ay) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.vx = vx;
            this.vy = vy;
            this.ax = ax;
            this.ay = ay;
        }
        update(maxY) {
            this.x += this.vx;
            this.y += this.vy;
            this.vx += this.ax;
            this.vy += this.ay;
            if (this.y >= maxY) {
                this.vy = -this.vy * 0.9;
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.init();
            drawer.show = drawer.getCurrentTimeArr();
            drawer.balls = [];
            drawer.color = 1;
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ballRadius = 0.5 * drawer.w / 114  - 1;
            drawer.sx = 0.25 * drawer.w;
            drawer.sy = 0.1 * drawer.h;
            drawer.numPosition = [
                {x: drawer.sx, y: drawer.sy},
                {x: drawer.sx + 16 * (drawer.ballRadius + 1), y: drawer.sy},
                {x: drawer.sx + 42 * (drawer.ballRadius + 1), y: drawer.sy},
                {x: drawer.sx + 58 * (drawer.ballRadius + 1), y: drawer.sy},
                {x: drawer.sx + 84 * (drawer.ballRadius + 1), y: drawer.sy},
                {x: drawer.sx + 100 * (drawer.ballRadius + 1), y: drawer.sy},
            ];
            drawer.fPosition = [
                {x: drawer.sx + 32 * (drawer.ballRadius + 1), y: drawer.sy},
                {x: drawer.sx + 74 * (drawer.ballRadius + 1), y: drawer.sy},
            ]
        },
        bindEvent() {
            window.onresize = drawer.init;
        },
        animate() {
            drawer.draw();
            drawer.update();
            requestAnimationFrame(drawer.animate);
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0 , drawer.w, drawer.h);
            drawer.numPosition.forEach((item, index) => {
                drawer.drawDigit(ctx, item.x, item.y, drawer.show[index]);
            });
            drawer.fPosition.forEach((item, index) => {
                drawer.drawDigit(ctx, item.x, item.y, 10);
            });
            drawer.balls.forEach((item) => item.draw(ctx));
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        update() {
            drawer.current = drawer.getCurrentTimeArr();
            drawer.numPosition.forEach((item, index) => {
               if (drawer.current[index] !== drawer.show[index]) {
                   drawer.addBalls(item.x, item.y, drawer.show[index]);
               }
            });
            drawer.show = drawer.current;
            drawer.updateBalls();
        },
        updateBalls() {
            drawer.balls.forEach((item) => item.update(drawer.h));
            drawer.balls = drawer.balls.filter((item) => {
                return item.x < drawer.w + drawer.ballRadius && item.x > -drawer.ballRadius;
            });
        },
        addBalls(sx, sy, index) {
            let digit = digitArr[index];
            for (let y = 0; y < digit.length; y++) {
                for (let x = 0; x < digit[y].length; x++) {
                    if (digit[y][x]) {
                        drawer.color += 10;
                        drawer.balls.push(new Ball(
                            sx + (2 * x + 1) * (drawer.ballRadius + 1),
                            sy + (2 * y + 1) * (drawer.ballRadius + 1),
                            drawer.ballRadius,
                            'hsla(' + drawer.color + ', 80%, 60%, 1)',
                            drawer.random(option.vx.min, option.vx.max),
                            drawer.random(option.vy.min, option.vy.max),
                            drawer.random(option.ax.min, option.ax.max),
                            drawer.random(option.ay.min, option.ay.max)
                        ));
                    }
                }
            }

        },
        drawDigit(ctx, sx, sy, index) {
            let digit = digitArr[index];
            for (let y = 0; y < digit.length; y++) {
                for (let x = 0; x < digit[y].length; x++) {
                    if (digit[y][x] === 1) {
                        drawer.arc(ctx,
                            sx + (2 * x + 1) * (drawer.ballRadius + 1),
                            sy + (2 * y + 1) * (drawer.ballRadius + 1),
                            drawer.ballRadius,
                            option.ballColor
                            );
                    }
                }
            }

        },
        arc(ctx, x, y, radius, color) {
            ctx.save();
            ctx.translate(x, y);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        },
        getCurrentTimeArr() {
            let d = new Date(),
                hour = d.getHours(),
                minute = d.getMinutes(),
                second = d.getSeconds();
            return [
                Math.floor(hour / 10),
                hour % 10,
                Math.floor(minute / 10),
                minute % 10,
                Math.floor(second / 10),
                second % 10
            ];
        },
        random(min, max) {
            return Math.random() * (max - min) + min;
        }
    };
    drawer.start();
}

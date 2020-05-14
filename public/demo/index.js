(() => {
    const option = {
        num: 32,
        radius: 100,
        sRadius: 200,
        sColor: 'rgba(255, 255, 255, 0.5)',
        ballRadius: 10,
        ballColor: '#084',
        angleStep: Math.PI / 90,
    };

    class Element {
        constructor(x, y, radius, ballRadius, beginAngle, angleStep, color, ballColor, counterclockwise) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.ballRadius = ballRadius;
            this.beginAngle = beginAngle;
            this.angleStep = angleStep;
            this.color = color;
            this.ballColor = ballColor;
            this.counterclockwise = counterclockwise;

            this.currentAngle = beginAngle;
        }
        update() {
            if(this.counterclockwise) {
                this.currentAngle += this.angleStep;
            } else {
                this.currentAngle -= this.angleStep;
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);

            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = this.ballColor;
            ctx.arc(
                this.radius * Math.cos(this.currentAngle),
                this.radius * Math.sin(this.currentAngle),
                this.ballRadius,
                0,
                2 * Math.PI,
                false);
            ctx.fill();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ctx = drawer.c.getContext('2d');
            drawer.initElements();
            console.log(this.elements);
            drawer.animate();
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elements.forEach(item => item.update());
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements.forEach(item => item.draw(ctx));
        },
        initElements() {
            drawer.elements = [];
            let step = 2 * Math.PI / option.num;
            for (let i = 0; i < option.num; i++) {
                drawer.elements.push(new Element(
                    drawer.w / 2 + option.radius * Math.cos(i * step),
                    drawer.h / 2 + option.radius * Math.sin(i * step),
                    option.sRadius,
                    option.ballRadius,
                     - i * step,
                    option.angleStep,
                    option.sColor,
                    option.ballColor,
                    false
                ));
            }
        }
    }
    drawer.start();
})();

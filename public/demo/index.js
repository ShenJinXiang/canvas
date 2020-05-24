(() => {
    const option = {
        radius: 25,
        gWidth: 30,
        rColor: 'rgba(255, 255, 255, .3',
        ballRadius: 5,
        ballAngleStep: Math.PI / 30,
    };
    class Element {
        constructor(ox, oy, radius, rColor, ballRaius, ballColor, ballAngle, ballAngleStep) {
            this.ox = ox;
            this.oy = oy;
            this.radius = radius;
            this.rColor = rColor;
            this.ballRaius = ballRaius;
            this.ballColor = ballColor;
            this.ballAngle = ballAngle;
            this.ballAngleStep = ballAngleStep;
        }
        update() {
            this.ballAngle += this.ballAngleStep;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);

            ctx.beginPath();
            ctx.strokeStyle = this.rColor;
            ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = this.ballColor;
            ctx.arc(this.radius * Math.cos(this.ballAngle), this.radius * Math.sin(this.ballAngle), this.ballRaius, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            console.log(drawer.elments);
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.initElements();
        },
        initElements() {
            drawer.elments = [];
            let step = Math.PI / 90;
            for (let y = 0; y < drawer.h + option.gWidth; y = y + option.gWidth) {
                for (let x = 0; x < drawer.w + option.gWidth; x =  x + option.gWidth) {
                    let color = (x + y) / option.gWidth * 5;
                    drawer.elments.push(
                        new Element(
                            x,
                            y,
                            option.radius,
                            option.rColor,
                            option.ballRadius,
                            'hsla(' + color + ', 80%, 60%, 1)',
                            ((x + y) / option.gWidth) * step * 10,
                            option.ballAngleStep)
                    );
                }
            }
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elments.forEach(item => item.update());
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elments.forEach(item => item.draw(ctx));
        }

    };
    drawer.start();
})();

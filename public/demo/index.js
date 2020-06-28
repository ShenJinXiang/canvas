{
    const option = {
        num: 18,
        time: 5,
        ballStyle: 'hsla(270, 100%, 50%, 1)',
        // ballStyle: 'violet',
        originLength: 40,
        originWidth: 2,
        originStyle: '#000',
    };

    class Ball {
        constructor(ox, oy, radius, style) {
            this.ox = ox;
            this.oy = oy;
            this.radius = radius;
            this.style = style;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.fillStyle = this.style;
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
            drawer.init();
            drawer.current = 0;
            drawer.count = 0;
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = drawer.width * 0.4;
            drawer.ballRadius = drawer.radius * 0.06;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;
            drawer.initElements();
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            if (++drawer.count >= option.time) {
                drawer.count = 0;
                drawer.current += 1;
                if (drawer.current >= option.num) {
                    drawer.current = 0;
                }
            }
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.origin(ctx);
            // drawer.elements.forEach((item, index) => item.draw(ctx));
            drawer.elements.map((item, index) => {
                if (index !== drawer.current) {
                    item.draw(ctx);
                }
            });
        },
        initElements() {
            drawer.elements = [];
            let angleStep = 2 * Math.PI / option.num;
            for (let i = 0; i < option.num; i++) {
                drawer.elements.push(new Ball(
                    drawer.ox + drawer.radius * Math.cos(angleStep * i),
                    drawer.oy + drawer.radius * Math.sin(i * angleStep),
                    drawer.ballRadius,
                    option.ballStyle,
                ));
            }
        },
        origin(ctx) {
            ctx.save();
            ctx.translate(drawer.ox, drawer.oy);
            ctx.rotate(Math.PI / 4);
            ctx.strokeStyle = option.originStyle;
            ctx.lineWidth = option.originWidth;

            ctx.beginPath();
            ctx.moveTo(-option.originLength / 2, 0);
            ctx.lineTo(option.originLength / 2, 0);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, -option.originLength / 2);
            ctx.lineTo(0, option.originLength / 2);
            ctx.stroke();

            ctx.restore();
        }
    };
    drawer.start();
}

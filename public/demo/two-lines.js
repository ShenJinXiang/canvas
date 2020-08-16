{
    const option = {
        angleStep: [Math.PI / 180, Math.PI / 180]
    }

    class Element {
        constructor(ox, oy, lineWidth, length, style, beginAngle, angleStep, counterclockwise) {
            this.ox = ox;
            this.oy = oy;
            this.lineWidth = lineWidth;
            this.length = length;
            this.style = style;
            this.beginAngle = beginAngle;
            this.angleStep = angleStep;
            this.counterclockwise = counterclockwise;

            this.angle = this.beginAngle;
        }
        update() {
            if (this.counterclockwise) {
                this.angle -= this.angleStep;
            } else {
                this.angle += this.angleStep;
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.style;
            ctx.fillStyle = this.style;
            ctx.beginPath();
            ctx.arc(0, 0, 3, 0, Math.PI * 2, false);
            ctx.fill();

            ctx.beginPath();
            ctx.lineTo(
                this.length / 2 * Math.cos(this.angle + Math.PI),
                this.length / 2 * Math.sin(this.angle + Math.PI)
            );
            ctx.lineTo(
                this.length / 2 * Math.cos(this.angle),
                this.length / 2 * Math.sin(this.angle)
            );
            ctx.stroke();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.initElements();
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.distance = drawer.h / 4;
            drawer.length = Math.sqrt(Math.pow(drawer.w, 2) + Math.pow(drawer.h, 2));
            drawer.mark = [];
        },
        initElements() {
            drawer.elements = [
                new Element(
                    drawer.w / 2,
                    drawer.h / 2 - drawer.distance / 2,
                    2,
                    drawer.length,
                    'red',
                    -Math.PI / 6,
                    option.angleStep[0],
                    false
                ),
                new Element(
                    drawer.w / 2,
                    drawer.h / 2 + drawer.distance / 2,
                    2,
                    drawer.length,
                    'green',
                    Math.PI / 6,
                    option.angleStep[1],
                    false
                )
            ];
            drawer.first = drawer.elements[0];
            drawer.second = drawer.elements[1];
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elements.forEach((item) => item.update());
            if (drawer.first.angle)
            let x = (Math.tan(drawer.first.angle) * drawer.first.ox - Math.tan(drawer.second.angle) * drawer.second.ox + drawer.second.oy - drawer.first.oy) / (Math.tan(drawer.first.angle) - Math.tan(drawer.second.angle));
            let y = Math.tan(drawer.first.angle) * (x - drawer.first.ox) + drawer.first.oy;
            drawer.mark.push({
                x: x,
                y: y
            });
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements.forEach((item) => item.draw(ctx));
            drawer.drawerMarkLine(ctx);
        },
        drawerMarkLine(ctx) {
            ctx.save();
            ctx.strokeStyle = '#084';
            ctx.beginPath();
            drawer.mark.forEach((item) => {
                ctx.lineTo(item.x, item.y);
            });
            ctx.stroke();
            ctx.restore();
        }
    };
    drawer.start();
}
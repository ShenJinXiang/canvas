(() => {
    const option = {
        background: '#061928',
        elementStrokeColor: 'rgba(255, 255, 255, 0.5)',
        color: '#f00',
        angleStep: Math.PI / 180,
        margin: 10,
    };
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    class Element {
        constructor(strokeColor, color) {
            this.strokeColoe = strokeColor;
            this.color = color;
            this.angle = 0;
        }
        attrs(x, y, radius, angleStep) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.angleStep = angleStep;
        }
        update() {
            this.angle += this.angleStep;
            this.currentPoint = new Point(this.radius * Math.cos(this.angle), this.radius * Math.sin(this.angle));
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.strokeColoe;
            ctx.moveTo(0, 0);
            ctx.lineTo(this.currentPoint.x, this.currentPoint.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.color;
            ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
            ctx.stroke();

            ctx.restore();
        }

    }
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.element = new Element(option.elementStrokeColor, option.color);
            drawer.init();
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.ox = drawer.width / 2;
            drawer.oy = drawer.width / 2;
            drawer.radiusStep = 0.04 * drawer.width;
            drawer.radius = 5;
            drawer.angleStep = Math.PI / 360;
            drawer.angle = 2;
            drawer.element.attrs(
                drawer.ox,
                drawer.oy,
                drawer.radius * drawer.radiusStep,
                drawer.angleStep * drawer.angle
            );
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.element.update();
            drawer.currentPoint = drawer.element.currentPoint;
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.element.draw(ctx);
            drawer.drawLinkLine(ctx);
        },
        drawLinkLine(ctx) {
            ctx.save();
            ctx.translate(drawer.ox, drawer.oy);

            ctx.beginPath();
            ctx.strokeStyle = option.color;
            ctx.lineWidth = 1;
            ctx.moveTo(drawer.currentPoint.x, drawer.currentPoint.y);
            ctx.lineTo(drawer.width / 2, drawer.currentPoint.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = option.color;
            ctx.moveTo(drawer.width / 2 - 20, drawer.currentPoint.y - 5);
            ctx.lineTo(drawer.width / 2 - 20, drawer.currentPoint.y + 5);
            ctx.lineTo(drawer.width / 2, drawer.currentPoint.y);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }
    };
    drawer.start();
})();
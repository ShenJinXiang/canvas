(() => {
    const option = {
        background: '#061928',
        elementStrokeColor: 'rgba(255, 255, 255, 0.5)',
        marksLength: 5000,
        cs: [
            {radius: 200, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false},
            {radius: 100, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false}
        ]
    };
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        lineTo(ctx, that, width, strokeStyle) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = width ? width : 1;
            ctx.strokeStyle = !!strokeStyle ? strokeStyle : 'rgba(0, 0, 0, 0.5)';
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(that.x, that.y);
            ctx.stroke();
            ctx.restore();
        }
    }
    class Element {
        constructor(radius, beginAngle, angleStep, counterclockwise) {
            this.radius = radius;
            this.beginAngle = beginAngle;
            this.angle = this.beginAngle;
            this.angleStep = angleStep;
            this.counterclockwise = !!counterclockwise;
        }
        setOrigin(origin) {
            this.origin = origin;
        }
        setNext(next) {
            this.next = next;
        }
        update() {
            this.currentPoint = new Point(
                this.origin.x + this.radius * Math.cos(this.angle),
                this.origin.y + this.radius * Math.sin(this.angle)
            );
            if(this.next) {
                this.next.setOrigin(this.currentPoint);
            }
            if (this.counterclockwise) {
                this.angle -= this.angleStep;
            } else {
                this.angle += this.angleStep;
            }
        }
        draw(ctx, strokeStyles) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = strokeStyles;
            ctx.arc(this.origin.x, this.origin.y, this.radius, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.restore();
            this.origin.lineTo(ctx, this.currentPoint, 1, strokeStyles);
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;

        }
    };
    drawer.start();
})();

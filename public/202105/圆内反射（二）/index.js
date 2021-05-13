{
    const option = {
        outerRadius: 0.42,
        innerRadius: 0.4,
        speed: 10,
        backgroundColor: '#000',
        outerColor: '#ccc',
        innerColor: '#ddd',
        centerLineColor: '#444',
        centerLineWid: 2,
        centerLineRadius: 0.03,
        elementNumber: 10,
        elementSize: 4,
        elementDiff: 2
    };

    class Element {
        constructor(sx, sy, angle, speed, size, color, outerRadius) {
            this.sx = sx;
            this.sy = sy;
            this.x = this.sx;
            this.y = this.sy;
            this.angle = angle;
            this.speed = speed;
            this.size = size;
            this.color = color;
            this.outerRadius = outerRadius;
            this.speedX = this.speed * Math.cos(this.angle);
            this.speedY = this.speed * Math.sin(this.angle);
            this.rl = Math.round(this.outerRadius * this.outerRadius);
        }
        update() {

        }
        draw(ctx) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
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
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.innerRadius = drawer.width * option.innerRadius;
            drawer.outerRadius = drawer.width * option.outerRadius;
            drawer.centerLineRadius = drawer.width * option.centerLineRadius;
            drawer.elements = [];

            let x = -drawer.width * 0.7,
                angle = random(2 * Math.PI);
            for (let i = 0; i < option.elementNumber; i++) {
                drawer.elements.push(
                    new Element(
                        x + option.elementDiff * i,
                        0,
                        angle,
                        option.speed,
                        option.elementSize,
                        '#000',
                        drawer.innerRadius)
                )
            }
        },
        animate() {
            drawer.update();
            drawer.draw();
        },
        update() {

        },
        draw() {
            let ctx = drawer.ctx;
            drawer.drawStatic(ctx);

            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        drawStatic(ctx) {
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);

            ctx.save();

            ctx.translate(drawer.w / 2, drawer.h / 2);
            ctx.beginPath();
            ctx.fillStyle = option.outerColor;
            ctx.arc(0, 0, drawer.outerRadius, 0, 2 * Math.PI, false);
            ctx.arc(0, 0, drawer.innerRadius, 0, 2 * Math.PI, true);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = option.innerColor;
            ctx.arc(0, 0, drawer.innerRadius, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.strokeStyle = option.centerLineColor;
            ctx.lineWidth = option.centerLineWid;
            ctx.beginPath();
            ctx.moveTo(-drawer.centerLineRadius, 0);
            ctx.lineTo(drawer.centerLineRadius, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, -drawer.centerLineRadius);
            ctx.lineTo(0, drawer.centerLineRadius);
            ctx.stroke();

            ctx.restore();
        },
        randomStartPoint() {
        }
    }

    drawer.start();
}

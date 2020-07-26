{
    const option = {
        colors: [
            'hsla(0, 70%, 50%, 1)',
            'hsla(90, 70%, 50%, 1)',
            'hsla(180, 70%, 50%, 1)',
            'hsla(270, 70%, 50%, 1)',
        ],
    };

    class Element {
        constructor(ox, oy, num, startRadius, radiusRange, startSize, sizeRange, startAngle, angleRange, style) {
            this.ox = ox;
            this.oy = oy;
            this.num = num;
            this.startRadius = startRadius;
            this.radiusRange = radiusRange;
            this.startSize = startSize;
            this.sizeRange = sizeRange;
            this.startAngle = startAngle;
            this.angleRange = angleRange;
            this.style = style;

            this.radiusStep = this.radiusRange / this.num;
            this.sizeStep = this.sizeRange / this.num;
            this.angleStep = this.angleRange / this.num;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.fillStyle = this.style;
            let angle = this.startAngle,
                size = this.startSize,
                radius = this.startRadius;
            for (let i = 0; i < this.num; i++) {
                angle += this.angleStep;
                size += this.sizeStep;
                radius += this.radiusStep;
                ctx.beginPath();
                ctx.arc(
                    radius * Math.cos(angle),
                    radius * Math.sin(angle),
                    size,
                    0,
                    2 * Math.PI,
                    false
                );
                ctx.fill();
            }
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();

            let ele = new Element(
                drawer.ox,
                drawer.oy,
                80,
                drawer.maxRadius,
                8,
                0.1,
                6,
                0,
                2 * Math.PI / 3,
                'red'
            );
            ele.draw(drawer.ctx);
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.maxRadius = drawer.width * 0.4;
            drawer.minRadius = -drawer.width * 0.3;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;
        }
    };

    drawer.start();

}

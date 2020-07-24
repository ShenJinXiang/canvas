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
                angle += i * this.angleStep;
                size += this.sizeStep;
                radius += i * this.radiusStep;
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

        },
    };

    drawer.start();


}

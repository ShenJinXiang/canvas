{
    /**
     * dAngle = Math.PI * 2;
     * dLength = width * 8;
     * al = Math.PI / (width * 4)
     */

    class Element {
        constructor(ox, oy, beginLength, beginAngle, lengthStep, angleStep, width, style) {
            this.ox = ox;
            this.oy = oy;
            this.beginLength = beginLength;
            this.beginAngle = beginAngle;
            this.lengthStep = lengthStep;
            this.angleStep = angleStep;
            this.width = width;
            this.style = style;
        }
        draw(ctx, maxLength) {
            let len = this.beginLength,
                angle = this.beginAngle;
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.strokeStyle = this.style;
            ctx.lineWidth = this.width;
            ctx.beginPath();
            while (angle <= maxLength) {
                ctx.lineTo(len * Math.cos(angle), len * Math.sin(angle));
                len += this.lengthStep;
                angle += this.angleStep;
            }
            ctx.stroke();
            ctx.restore();
        }
    }
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            // drawer.draw();
            // let ele = new Element( drawer.ox, drawer.oy, 20, 0, 0.1, Math.PI / 400, 10, 'red' );
            // ele.draw(drawer.ctx, Math.max(drawer.ox, drawer.oy));

            drawer.elements = [
                new Element(drawer.ox, drawer.oy, 0, 0, 0.1, Math.PI / 800, 20, 'red'),
                new Element(drawer.ox, drawer.oy, 0, Math.PI / 2, 0.1, Math.PI / 800, 20, 'red'),
                new Element(drawer.ox, drawer.oy, 0, Math.PI, 0.1, Math.PI / 800, 20, 'red'),
                new Element(drawer.ox, drawer.oy, 0, 3 * Math.PI / 2, 0.1, Math.PI / 800, 20, 'red'),
            ]
            drawer.elements.map((item) => item.draw(drawer.ctx, drawer.oy));
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.save();
            ctx.translate(drawer.ox, drawer.oy);
            ctx.restore();
        }
    };
    drawer.start();
}

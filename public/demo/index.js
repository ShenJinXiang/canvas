{
    const option = {
        lineWidth: 1,
        lineLength: 10,

    };
    class Element {
        constructor(point, angle, length, width, style) {
            this.point = point;
            this.angle = angle;
            this.length = length;
            this.width = width;
            this.style = style;

            this.start = this.point;
            this.end = {
                x: this.start.x + this.length * Math.cos(this.angle),
                y: this.start.y + this.length * Math.sin(this.angle)
            };
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.point.x, this.point.y);
            ctx.strokeStyle = this.style;
            ctx.lineWidth = this.width;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(this.length * Math.cos(this.angle), this.length * Math.sin(this.angle));
            ctx.stroke();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            let ele = new Element({x: drawer.w / 2, y: drawer.h / 2}, 0, option.lineLength, option.lineWidth, 'red');
            ele.draw(drawer.ctx);
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;

        }
    };
    drawer.start();
}
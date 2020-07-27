{
    const option = {
        radius: 3,
        step: 1,
    };
    class Element{
        constructor(ox, oy, r, radius, angleStep, style) {
            this.ox = ox;
            this.oy = oy;
            this.r = r;
            this.radius = radius;
            this.angleStep = angleStep;
            this.style = style;

            this.angle = 0;
        }
        update() {
            this.angle += this.angleStep;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.beginPath();
            ctx.fillStyle = this.style;
            ctx.arc(0, this.radius * Math.sin(this.angle), this.r, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
        }
    };

    drawer.start();
}

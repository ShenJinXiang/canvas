{
    const option = {

    };

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.draw();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.radius = Math.min(drawer.w, drawer.h) * 0.45;
            drawer.angleStep = Math.PI / 180;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;

        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.drawColors(ctx);
        },
        drawColors(ctx) {
            ctx.save();
            ctx.translate(drawer.ox, drawer.oy);
            for (let angle = 0; angle < 360; angle++) {
                ctx.beginPath();
                ctx.fillStyle = 'hsla(' + angle + ', 100%, 50%, 1)';
                ctx.moveTo(0, 0);
                ctx.lineTo(
                    drawer.radius * Math.cos(angle * drawer.angleStep),
                    drawer.radius * Math.sin(angle * drawer.angleStep)
                );
                ctx.arc(0, 0, drawer.radius, angle * drawer.angleStep, (angle + 1) * drawer.angleStep, false);
                ctx.closePath();
                ctx.fill();
            }
            ctx.restore();
        }
    };
    drawer.start();
}

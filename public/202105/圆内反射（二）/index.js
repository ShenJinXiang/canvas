{
    const option = {
        outerRadius: 0.42,
        innerRadius: 0.4,
        speed: 10,
        backgroundColor: '#000',
        outerColor: '#ccc',
        innerColor: '#999'
    };

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

            ctx.restore();
        }
    }

    drawer.start();
}
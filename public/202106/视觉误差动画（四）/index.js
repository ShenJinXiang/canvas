{
    const option = {
        backgroundColor: '#000',
        eleWidth: 0.05,

    };
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#fff');
            drawer.init();
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.elementWidth = option.eleWidth * drawer.width;

        },
        animate() {
            drawer.draw();
            drawer.update();
            requestAnimationFrame(drawer.animate);
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            ctx.restore();
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        update() {

        }
    };

    drawer.start();
}

{
    const option = {
        lineColor: 'hsla(0, 100%, 60%, 1)'
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.drawGridLine(drawer.ctx);
        },
        init() {
            drawer.width = Math.min(window.innerWidth, window.innerHeight);
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.gridWidth = drawer.width * 0.9;
            drawer.half = drawer.gridWidth / 2;
        },
        drawGridLine(ctx) {
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            ctx.strokeStyle = option.lineColor;
            ctx.lineWidth = 3;
            ctx.strokeRect(-drawer.half, -drawer.half, drawer.gridWidth, drawer.gridWidth);

            ctx.setLineDash([2, 5, 2]);
            CanvasUtil.line(ctx, 0, -drawer.half, 0, drawer.half, option.lineColor, 1);
            CanvasUtil.line(ctx, -drawer.half, 0, drawer.half, 0, option.lineColor, 1);
            CanvasUtil.line(ctx, -drawer.half, -drawer.half, drawer.half, drawer.half, option.lineColor, 1);
            CanvasUtil.line(ctx, drawer.half, -drawer.half, -drawer.half, drawer.half, option.lineColor, 1);
            ctx.restore();
        },
        bindEvent() {
            drawer.c.addEventListener('mousemove', drawer.move, false);
        },
        move(e) {

        }
    };
    drawer.start();
}
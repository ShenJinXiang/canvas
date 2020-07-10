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
            drawer.c.width = drawer.c.height = drawer.width;
            drawer.gridWidth = drawer.width * 0.8;
        },
        drawGridLine(ctx) {
            ctx.save();
            ctx.translate(drawer.width / 2, drawer.width / 2);
            ctx.strokeStyle = option.lineColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(-drawer.gridWidth / 2, -drawer.gridWidth / 2, drawer.gridWidth, drawer.gridWidth);
            ctx.restore();
        }
    };
    drawer.start();
}
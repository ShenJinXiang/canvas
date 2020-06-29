{
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.init();
            drawer.draw();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;
        },
        bindEvent() {
            window.addEventListener('resize', () => {
                drawer.init();
                drawer.draw();
            }, false);
        },
        draw() {
            let ctx = drawer.ctx,
                imageData = ctx.createImageData(drawer.w, drawer.h),
                pixelData = imageData.data;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            for (let y = 0; y < drawer.h; y++) {
                for (let x = 0; x < drawer.w; x++) {
                    let p = y * drawer.w + x;
                    pixelData[4 * p] = parseInt(Math.pow(Math.cos(Math.atan2(x - drawer.ox, y - drawer.oy) / 2), 2) * 255);
                    pixelData[4 * p + 1] = parseInt(Math.pow(Math.cos(Math.atan2(x - drawer.ox, y - drawer.oy) / 2 - 2 * Math.acos(-1) / 3), 2) * 255);
                    pixelData[4 * p + 2] = parseInt(Math.pow(Math.cos(Math.atan2(x - drawer.ox, y - drawer.oy) / 2 + 2 * Math.acos(-1) / 3), 2) * 255);
                    pixelData[4 * p + 3] = 255;
                }
            }
            ctx.putImageData(imageData, 0, 0, 0, 0, drawer.w, drawer.h);
            CanvasUtil.drawMark(ctx, drawer.mark);
        }
    };
    drawer.start();
}

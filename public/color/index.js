{
    const option = {
        gridWidth: 3,
    };

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.draw();
        },
        init() {
            drawer.w = drawer.c.width = 800;
            drawer.h = drawer.c.height = 800;
        },
        draw() {
            let ctx = drawer.ctx,
                imageData = ctx.createImageData(drawer.w, drawer.h),
                pixelData = imageData.data;
            for (let y = 0; y < drawer.h; y++) {
                for (let x = 0; x < drawer.w; x++) {
                    let p = y * drawer.w + x;
                    pixelData[4 * p + 0] = parseInt(Math.pow(Math.cos(Math.atan2(x - 400, y - 400) / 2), 2) * 255);
                    pixelData[4 * p + 1] = parseInt(Math.pow(Math.cos(Math.atan2(x - 400, y - 400) / 2 - 2 * Math.acos(-1) / 3), 2) * 255);
                    pixelData[4 * p + 2] = parseInt(Math.pow(Math.cos(Math.atan2(x - 400, y - 400) / 2 + 2 * Math.acos(-1) / 3), 2) * 255);
                    pixelData[4 * p + 3] = 255;
                }
            }

            ctx.putImageData(imageData, 0, 0, 0, 0, drawer.w, drawer.h);

        }
    };
    drawer.start();
}

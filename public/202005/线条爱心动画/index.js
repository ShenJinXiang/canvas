(() => {
    const option = {
        step: 25,
        downStep: 10,
        lineWidth: 1,
        color: '#fff',
        backgroundColor: '#000'
    };

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#f00');
            drawer.init();
            drawer.offsetY = 0;
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = drawer.width * 0.025;
            drawer.heartBuff = drawer.initHeartBuffer();
        },
        bindEvent() {
            window.onresize = drawer.init;
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.offsetY += .5;
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            drawer.drawLines(ctx);
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        initHeartBuffer() {
            let tempCanvas = document.createElement('canvas'),
                tempCtx = tempCanvas.getContext('2d');
            tempCanvas.width = drawer.w;
            tempCanvas.height = drawer.h;
            CanvasUtil.fillHeart(tempCtx, drawer.w / 2, drawer.h / 2, drawer.radius, '#fff');
            let image = tempCtx.getImageData(0, 0, drawer.w, drawer.h);
            return new Uint32Array(image.data.buffer);
        },
        drawLines(ctx) {
            for (let y = 0; y < drawer.h; y += option.step) {
                drawer.line(ctx, y + drawer.offsetY % option.step );
            }
        },
        line(ctx, y) {
            ctx.save();
            ctx.strokeStyle = option.color;
            ctx.lineWidth = option.lineWidth;
            ctx.translate(0, y);
            ctx.beginPath();
            for (let x = 0; x < drawer.w; x += 2) {
                if (drawer.heartBuff[drawer.w * Math.floor(y) + x]) {
                    ctx.lineTo(x, option.downStep);
                } else {
                    ctx.lineTo(x, 0);
                }
            }
            ctx.stroke();
            ctx.restore();
        }

    };
    drawer.start();
})();

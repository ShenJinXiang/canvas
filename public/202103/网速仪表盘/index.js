{
    const option = {
        angleRange: 1.4 * Math.PI, // 角度范围
        maxVal: 160,                // 最大值
        stepNum: 8,                 // 段数
        width: 400,                 // 最大尺寸

    };

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.init();
            drawer.drawStatic();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.r = option.width;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;
            drawer.rs = [
                drawer.r * 1.0,
                drawer.r * 0.95,
                drawer.r * 0.92,
                drawer.r * 0.85,
                drawer.r * 0.6
            ];
            drawer.angleStep = option.angleRange / (option.stepNum * 5);
            drawer.startAngle = - (Math.PI / 2) - option.angleRange / 2;
        },
        drawStatic() {
            let ctx = drawer.ctx;
            ctx.save();
            ctx.translate(drawer.ox, drawer.oy);
            ctx.rotate(drawer.startAngle);
            ctx.strokeStyle = '#e1e1e1';

            // 刻度
            for (let i = 0; i <= option.stepNum * 5; i++) {
                ctx.save();
                ctx.rotate(i * drawer.angleStep);
                ctx.beginPath();
                if (i % 5 == 0) {
                    ctx.lineWidth = 2;
                    ctx.lineTo(drawer.rs[0], 0);
                } else {
                    ctx.lineWidth = 1;
                    ctx.lineTo(drawer.rs[1], 0);
                }
                ctx.lineTo(drawer.rs[2], 0);
                ctx.stroke();
                ctx.restore();
            }

            // 圆弧
            ctx.beginPath();
            ctx.arc(0, 0, drawer.rs[4], 0, option.angleRange, false);
            ctx.stroke();

            ctx.restore();
        }
    }


    drawer.start();
}
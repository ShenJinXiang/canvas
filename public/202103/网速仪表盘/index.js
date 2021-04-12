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
            drawer.r = option.width / 2;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;
            drawer.rs = [
                drawer.r * 1.0,
                drawer.r * 0.95,
                drawer.r * 0.92,
                drawer.r * 0.85,
                drawer.r * 0.6
            ];
            drawer.vals = [];
            drawer.valStep = option.maxVal / option.stepNum;
            for (let i = 0; i <= option.stepNum; i++) {
                drawer.vals.push({val: drawer.valStep * i, angle: i * option.angleRange / option.stepNum});
            }
            drawer.angleStep = option.angleRange / (option.stepNum * 5);
            drawer.startAngle = - (Math.PI / 2) - option.angleRange / 2;
        },
        drawStatic() {
            let ctx = drawer.ctx;
            ctx.save();
            ctx.translate(drawer.ox, drawer.oy);
            ctx.rotate(drawer.startAngle);
            ctx.strokeStyle = '#e1e1e1';
            ctx.fillStyle = '#e1e1e1';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

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

            ctx.rotate(-drawer.startAngle);
            // 刻度值
            drawer.vals.forEach(function (item) {
                ctx.font = '12px cursive';
                ctx.fillText(item.val, drawer.rs[3] * Math.cos(item.angle + drawer.startAngle), drawer.rs[3] * Math.sin(item.angle + drawer.startAngle));
            });
            ctx.rotate(drawer.startAngle);

            // 圆弧
            ctx.beginPath();
            ctx.arc(0, 0, drawer.rs[4], 0, option.angleRange, false);
            ctx.stroke();

            // 圆弧上的圆点刻度
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.arc(
                drawer.rs[4] * Math.cos(0),
                drawer.rs[4] * Math.sin(0),
                4,
                0,
                2 * Math.PI,
                false
            );
            ctx.fill();


            ctx.restore();
        }
    }


    drawer.start();
}
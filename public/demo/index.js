{
    const option = {
        lineColor: 'hsla(0, 100%, 60%, 1)',
        handWritingColor: 'rgba(0, 0, 0, 1)',
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.bindEvent();
        },
        init() {
            drawer.width = Math.min(window.innerWidth, window.innerHeight);
            // drawer.w = drawer.c.width = window.innerWidth;
            // drawer.h = drawer.c.height = window.innerHeight;
            drawer.w = drawer.h = drawer.c.width = drawer.c.height = drawer.width;
            drawer.gridWidth = drawer.width * 0.9;
            drawer.half = drawer.gridWidth / 2;
            drawer.maxStrokeWidth = drawer.width * .02;
            drawer.minStrokeWidth = 1;
            drawer.minDis = 1;
            drawer.maxDis = 10;
            console.log(drawer);

            drawer.flag = false;
            drawer.drawGridLine(drawer.ctx);
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
            window.addEventListener('resize', drawer.init, false);
            drawer.c.addEventListener('mousemove', drawer.move, false);
            drawer.c.addEventListener('mousedown', drawer.down, false);
            drawer.c.addEventListener('mouseup', drawer.up, false);
            drawer.c.addEventListener('mouseleave', drawer.up, false);
        },
        move(e) {
            if (drawer.flag) {
                drawer.drawHandWriting(drawer.ctx, CanvasUtil.eventToCanvas(drawer.c, e));
            }
        },
        down(e) {
            let p = CanvasUtil.eventToCanvas(drawer.c, e);
            if (p.x >= 0 && p.x <= drawer.w && p.y >= 0 && p.y <= drawer.h) {
                drawer.flag = true;
                drawer.drawHandWriting(drawer.ctx, p);
            }
        },
        up(e) {
            drawer.flag = false;
            delete drawer.lastPoint;
        },
        drawHandWriting(ctx, point) {
            if (drawer.lastPoint) {
                let dis = CanvasUtil.distance(drawer.lastPoint.x, drawer.lastPoint.y, point.x, point.y);
                ctx.save();
                ctx.beginPath();
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.strokeStyle = option.handWritingColor;
                ctx.lineWidth = drawer.widthByDistance(dis);
                ctx.moveTo(drawer.lastPoint.x, drawer.lastPoint.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
                ctx.restore();
            }
            drawer.lastPoint = point;
        },
        widthByDistance(distance) {
            if (distance < drawer.minDis) {
                distance = drawer.minDis;
            }
            if (distance > drawer.maxDis) {
                distance = drawer.maxDis;
            }
            return drawer.minStrokeWidth + (drawer.maxStrokeWidth - drawer.minStrokeWidth) * (1 - (distance - drawer.minDis) / (drawer.maxDis - drawer.minDis));

        }
    };
    drawer.start();
}
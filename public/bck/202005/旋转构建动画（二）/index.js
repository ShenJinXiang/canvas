(() => {
    const option = {
        outerColor: 'rgb(255, 255, 255)',
        outerWidth: 2,
        lineCoor: 'rgba(255, 255, 255, .2)',
        angleStep: Math.PI / 90,
    };

    class Element {
        constructor(x, y, radius, angle, lineColor, beginAngle, step, ballRadius, ballColor) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.angle = angle;
            this.lineColor = lineColor;
            this.beginAngle = beginAngle;
            this.step = step;
            this.ballRadius = ballRadius;
            this.ballColor = ballColor;
            this.currentAngle = this.beginAngle;
        }
        update() {
            this.currentAngle += this.step;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            ctx.beginPath();
            ctx.strokeStyle = this.lineColor;
            ctx.moveTo(-this.radius, 0);
            ctx.lineTo(this.radius, 0);
            ctx.stroke();

            ctx.fillStyle = this.ballColor;
            ctx.beginPath();
            ctx.arc(this.radius * Math.cos(this.currentAngle), 0, this.ballRadius, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.restore();
        }
        refreshXY(x, y, radius, ballRadius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.ballRadius = ballRadius;
        }
    }
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.num = 6;
            drawer.init();
            drawer.initElements();
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = 0.45 * drawer.width;
            drawer.ballRadius = 0.01 * drawer.width;
        },
        bindEvent() {
            window.onresize = drawer.reset;
            $("#numRange").mousemove(function() {
                let val = ~~$(this).val();
                $("#num_span").text(val);
                if (drawer.num !== val) {
                    drawer.num = val;
                    drawer.initElements();
                }
            });
        },
        reset() {
            drawer.init();
            drawer.refreshElements();
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elements.forEach(item => item.update());
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.drawOuter(ctx);
            drawer.elements.forEach(item => item.draw(ctx));
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        drawOuter(ctx) {
           ctx.save();
           ctx.lineWidth = option.outerWidth;
           ctx.strokeStyle = option.outerColor;
           ctx.beginPath();
           ctx.arc(drawer.w / 2, drawer.h / 2, drawer.radius, 0, 2 * Math.PI, false);
           ctx.stroke();
           ctx.restore();
        },
        initElements() {
            drawer.elements = [];
            let step =  Math.PI / drawer.num;
            for (let i = 0; i < drawer.num; i++) {
                let c = i * 10;
                drawer.elements.push(new Element(
                    drawer.w / 2,
                    drawer.h / 2,
                    drawer.radius,
                    i * step,
                    option.lineCoor,
                    -i * step,
                    option.angleStep,
                    drawer.ballRadius,
                    'hsla(' + c + ', 80%, 60%, 1)'
                ));
            }
        },
        refreshElements() {
            drawer.elements.forEach((item, index) => {
                item.refreshXY(
                    drawer.w / 2,
                    drawer.h / 2,
                    drawer.radius,
                    drawer.ballRadius
                )
            });
        }
    };

    drawer.start();
    // drawer.bindEvent();
})();

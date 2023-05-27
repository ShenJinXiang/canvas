{
    const option = {
        lineLength: 100,
        lineWidth: 3,
        lineSpace: 21,
        lineColors: ['coral', 'Cyan'],
        arrowStyle: '#ddd',
        arrowHeight: 25,
        arrowAngleStep: Math.PI / 40,
    };

    class Element {
        constructor(point, lineLength, lineWidth, lineStyle, isArrow) {
            this.point = point;
            this.lineLength = lineLength;
            this.lineWidth = lineWidth;
            this.lineStyle = lineStyle;
            this.isArrow = isArrow;
        }
        arrow(arrowWidth, arrowHeight, arrowStyle, angle, angleStep) {
            this.arrowWidth = arrowWidth;
            this.arrowHeight = arrowHeight;
            this.arrowStyle = arrowStyle;
            this.angle = angle;
            this.angleStep = angleStep;
            this.arrowH = this.arrowHeight * Math.sin(this.angle);
        }
        update() {
            if (this.isArrow) {
                this.angle += this.angleStep;
                this.arrowH = this.arrowHeight * Math.sin(this.angle);
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.point.x, this.point.y);
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.lineStyle;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, this.lineLength);
            ctx.stroke();

            if (this.isArrow) {
                ctx.strokeStyle = this.arrowStyle;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(-this.arrowWidth, this.arrowH);
                ctx.lineTo(0, 0);
                ctx.lineTo(this.arrowWidth, this.arrowH);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(-this.arrowWidth, this.lineLength - this.arrowH);
                ctx.lineTo(0, this.lineLength);
                ctx.lineTo(this.arrowWidth, this.lineLength - this.arrowH);
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.init();
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.initElements();
        },
        bindEvent() {
            window.addEventListener("resize", drawer.init, false);
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elements.forEach((item) => item.update());
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements.forEach((item) => item.draw(ctx));
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        initElements() {
            drawer.elements = [];
            for (let y = -option.lineLength / 2, ny = 0, angle = 0;
                y < drawer.h + option.lineLength / 2;
                y += option.lineLength, ny++, angle += Math.PI / 3) {
                for (let x = 2 * option.lineSpace / 3, a = angle; x < drawer.w; x += option.lineSpace) {
                    if (ny % 2 === 0) {
                        let ele = new Element({ x, y }, option.lineLength, option.lineWidth, option.lineColors[0], true);
                        ele.arrow(option.lineSpace / 3, option.arrowHeight, option.arrowStyle, a += 0.2, option.arrowAngleStep)
                        drawer.elements.push(ele);

                    } else {
                        drawer.elements.push(new Element({ x, y }, option.lineLength, option.lineWidth, option.lineColors[1], false));
                    }
                }
            }
        }
    };
    drawer.start();
}
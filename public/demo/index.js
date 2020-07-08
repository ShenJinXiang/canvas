{
    const option = {
        title: '-- Click Anywhere --',
        titleBoxWidth: 300,
        titleBoxHeight: 60,
    };


    class BurstElement {
        constructor(ox, oy, startRadius, endRadius, time, style, startAlpha, endAlpha) {
            this.ox = ox;
            this.oy = oy;
            this.startRadius = startRadius;
            this.endRadius = endRadius;
            this.time = time;

            this.style = style;
            this.startAlpha = startAlpha;
            this.endAlpha = endAlpha;

            this.radiusStep = (this.endRadius- this.startRadius ) / this.time;
            this.radius = this.startRadius;

            this.alphaStep = (this.endAlpha - this.startAlpha) / this.time;
            this.alpha = this.startAlpha;
            this.eleStyle = 'hsla(' + this.style + ', ' + this.alpha + ')';

            this.current = 0;
            // this.ratio = 0;
        }
        update() {
            if (this.current <= this.time) {
                this.current++;
                // this.ratio = this.current / this.time;
                this.radius += this.radiusStep;
                this.alpha += this.alphaStep;
                this.eleStyle = 'hsla(' + this.style + ', ' + this.alpha + ')';
            }
        }
    }

    class CircularElement extends BurstElement{
        constructor(ox, oy, startRadius, endRadius, time, style, startAlpha, endAlpha, startLineWidth, endLineWidth) {
            super(ox, oy, startRadius, endRadius, time, style, startAlpha, endAlpha);
            this.startLineWidth = startLineWidth;
            this.endLineWidth = endLineWidth;
            this.lineWidthStep = (this.endLineWidth - this.startLineWidth) / this.time;
            this.lineWidth = this.startLineWidth;
        }
        update() {
            super.update();
            if (this.current <= this.time) {
                this.lineWidth += this.lineWidthStep;
            }
        }

        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.strokeStyle = this.eleStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.restore();
        }
    }

    class PointElement extends  BurstElement {
        constructor(ox, oy, startRadius, endRadius, time, style, startAlpha, endAlpha, pointStartRadius, pointEndRadius, pointNum, startAngle, endAngle) {
            super(ox, oy, startRadius, endRadius, time, style, startAlpha, endAlpha);
            this.pointStartRadius = pointStartRadius;
            this.pointEndRadius = pointEndRadius;
            this.pointNum = pointNum;
            this.startAngle = startAngle;
            this.endAngle = endAngle;

            this.pointAngleStep = 2 * Math.PI / this.pointNum;

            this.pointRadiusStep = (this.pointEndRadius - this.pointStartRadius) / this.time;
            this.pointRadius = this.pointStartRadius;

            this.angleStep = (this.endAngle - this.startAngle) / this.time;
            this.angle = this.startAngle;
        }
        update() {
            super.update();
            if (this.current <= this.time) {
                this.angle += this.angleStep;
                this.pointRadius += this.pointRadiusStep;
            }
        }
        draw(ctx) {
            if (this.current <= this.time) {
                ctx.save();
                ctx.translate(this.ox, this.oy);
                ctx.rotate(this.angle);
                ctx.fillStyle = this.eleStyle;
                for (let i = 0; i < this.pointNum; i++) {
                    ctx.beginPath();
                    ctx.arc(
                        this.radius * Math.cos(i * this.pointAngleStep),
                        this.radius * Math.sin(i * this.pointAngleStep),
                        this.pointRadius, 0, 2 * Math.PI, false );
                    ctx.fill();
                }
                ctx.restore();

            }
        }
    }

    class LineElement extends BurstElement {
        constructor(ox, oy, startRadius, endRadius, time, style, startAlpha, endAlpha, lineNum, lineStartWidth, lineEndWidth, startAngle, endAngle) {
            super(ox, oy, startRadius, endRadius, time, style, startAlpha, endAlpha);
            this.lineNum = lineNum;
            this.lineStartWidth = lineStartWidth;
            this.lineEndWidth = lineEndWidth;
            this.startAngle = startAngle;
            this.endAngle = endAngle;

            this.lineAngleStep = 2 * Math.PI / this.lineNum;

            this.lineWidthStep = (this.lineEndWidth - this.lineStartWidth) / this.time;
            this.lineWidth = this.lineStartWidth;

            this.angleStep = (this.endAngle - this.startAngle) / this.time;
            this.angle = this.startAngle;
        }
        update() {
            super.update();
            if(this.current <= this.time) {
                this.lineWidth += this.lineWidthStep;
                this.angle += this.angleStep;
            }
        }
        draw(ctx) {
            if (this.current <= this.time) {
                ctx.save();
                ctx.translate(this.ox, this.oy);
                ctx.rotate(this.angle);
                ctx.strokeStyle = this.eleStyle;
                ctx.lineWidth = this.lineWidth;
                for (let i = 0; i < this.lineNum; i++) {
                    ctx.beginPath();
                    ctx.lineTo(this.radius * Math.cos(i * this.lineAngleStep),this.radius * Math.sin(i * this.lineAngleStep));
                    ctx.lineTo((this.radius + 10) * Math.cos(i * this.lineAngleStep), (this.radius + 10) * Math.sin(i * this.lineAngleStep));
                    ctx.stroke();
                }
                ctx.restore();
            }
        }
    }
    class PolygonElement extends BurstElement {
        constructor(ox, oy, startRadius, endRadius, time, style, startAlpha, endAlpha, polygonNum, polygonSide, polygonRadius, startAngle, endAngle) {
            super(ox, oy, startRadius, endRadius, time, style, startAlpha, endAlpha);
            this.polygonNum = polygonNum;
            this.polygonSide = polygonSide;
            this.polygonRadius = polygonRadius;
            this.startAngle = startAngle;
            this.endAngle = endAngle;

            this.polygonAngleStep = 2 * Math.PI / this.polygonNum;
            this.polygonSideAngleStep = 2 * Math.PI / this.polygonSide;

            this.angleStep = (this.endAngle - this.startAngle) / this.time;
            this.angle = this.startAngle;
        }
        update() {
            super.update();
            console.log("polygon " + this.current);
            if(this.current <= this.time) {
                this.angle += this.angleStep;
            }
        }
        draw(ctx) {
            if (this.current <= this.time) {
                ctx.save();
                ctx.translate(this.ox, this.oy);
                ctx.rotate(this.angle);
                for (let i = 0; i < this.polygonNum; i++) {
                    ctx.save();
                    ctx.translate(this.radius * Math.cos(i * this.polygonAngleStep),this.radius * Math.sin(i * this.polygonAngleStep));
                    ctx.beginPath();
                    ctx.fillStyle = this.eleStyle;
                    for (let side = 0 ; side < this.polygonSide; side++) {
                        ctx.lineTo(
                            this.polygonRadius * Math.cos(side * this.polygonSideAngleStep),
                            this.polygonRadius * Math.sin(side * this.polygonSideAngleStep),
                        );
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                ctx.restore();
            }
        }
    }

    class Element {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.current = 0;
            this.elements = [
                new CircularElement(this.x, this.y, 0, 80, 40, '6, 63%, 46%', 1, 0, 4, 0, ),
                new PointElement(this.x, this.y, 0, 100, 32, '90, 44%, 47%', 1, 0, 0, 5, 25, 0,  Math.PI / 2),
                new LineElement(this.x, this.y, 0, 150, 32, '24, 99%, 42%', 1, 0.2, 10, 5, 2, 0,  -Math.PI / 3),
                new LineElement(this.x, this.y, 50, 150, 40, '0, 0%, 13%', 1, 0, 10, 4, 4, 0,  0),
                new PolygonElement(this.x, this.y, 50, 150, 60, '168, 76%, 36%', 1, 0, 15, 3, 6, 0,  2 * Math.PI / 3),
            ]
        }
        update() {
            this.current++;
            this.elements.map((item) => item.update());
        }
        draw(ctx) {
            this.elements.map((item) => item.draw(ctx));
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.titleCanvas = drawer.createTitleCanvas();
            drawer.init();
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            if (drawer.currentElement) {
                drawer.currentElement.update();
            }
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            if (drawer.currentElement) {
                drawer.currentElement.draw(ctx);
            }
            ctx.drawImage(drawer.titleCanvas, (drawer.w - drawer.titleCanvas.width) / 2, 20);
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        bindEvent() {
            drawer.c.addEventListener('click', drawer.mouseClick, false);
            window.addEventListener('resize', drawer.init, false);
        },
        mouseClick(e) {
            let point = CanvasUtil.eventToCanvas(drawer.c, e);
            drawer.currentElement = new Element(point.x, point.y);
        },
        createTitleCanvas() {
            let canvas = document.createElement('canvas'),
                width = canvas.width = option.titleBoxWidth + 20,
                height = canvas.height = option.titleBoxHeight + 20,
                context = canvas.getContext('2d');
            context.save();
            context.translate(width / 2, height / 2);
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            context.font = '20px console';
            context.fillText(option.title, 0, 0);
            context.restore();

            context.save();
            context.translate(width / 2, height / 2);
            context.shadowColor = 'rgba(50, 50, 50, 1)';
            context.shadowBlur = 10;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.strokeStyle = 'rgba(50, 50, 50, 1)';
            context.lineWidth = 1;
            // context.strokeRect(-option.titleBoxWidth / 2, -option.titleBoxHeight / 2, option.titleBoxWidth, option.titleBoxHeight);
            context.beginPath();
            context.moveTo(-option.titleBoxWidth / 2, option.titleBoxHeight / 2);
            context.lineTo(-option.titleBoxWidth / 2, -option.titleBoxHeight / 2);
            context.lineTo(option.titleBoxWidth / 2, -option.titleBoxHeight / 2);
            context.lineTo(option.titleBoxWidth / 2, option.titleBoxHeight / 2);
            context.stroke();

            context.beginPath();
            context.strokeStyle = 'rgba(0, 60, 60, 0.8)';
            context.lineWidth = 4;
            context.moveTo(-option.titleBoxWidth / 2, option.titleBoxHeight / 2);
            context.lineTo(option.titleBoxWidth / 2, option.titleBoxHeight / 2);
            context.stroke();
            context.restore();
            return canvas;
        }
    };
    drawer.start();
}
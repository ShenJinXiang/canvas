(() => {
    const option = {
        deepNum: 6,
        timeStep: 100,
        color: '#0075c9',
    };
    class Element {
        constructor(sx, sy, len, angle, sType, color, time, move, counterclockwise) {
            this.sx = sx;
            this.sy = sy;
            this.len = len;
            this.angle = angle;
            this.sType = sType;
            if (this.sType === 'start') {
                this.ex = this.sx + this.len * Math.cos(this.angle);
                this.ey = this.sy + this.len * Math.sin(this.angle);
            } else {
                this.ex = this.sx - this.len * Math.cos(this.angle);
                this.ey = this.sy - this.len * Math.sin(this.angle);
            }
            this.tx1 = this.sx + (this.ex - this.sx) / 3;
            this.ty1 = this.sy + (this.ey - this.sy) / 3;
            this.tx2 = this.sx + 2 * (this.ex - this.sx) / 3;
            this.ty2 = this.sy + 2 * (this.ey - this.sy) / 3;

            this.color = color;
            this.time = time;
            this.move = move;

            if (this.move) {
                this.counterclockwise = counterclockwise;
                if (this.counterclockwise) {
                    this.startAngle = this.angle - Math.PI / 3;
                    this.angleStep = Math.PI / (3 * this.time);
                } else {
                    this.startAngle = this.angle + Math.PI / 3;
                    this.angleStep = -Math.PI / (3 * this.time);
                }
                this.dAngle = this.startAngle;
                this.dxy();
            } else {
                this.dx = this.ex;
                this.dy = this.ey;
            }
            this.current = 0;
        }
        start() {
            this.current = 0;
            if (this.move) {
                this.dAngle = this.startAngle;
                this.dxy();
            }
        }
        complete() {
            this.current = this.time;
            if (this.move) {
                this.dAngle = this.angle;
                this.dx = this.ex;
                this.dy = this.ey;
            }
        }
        update() {
            if (this.current < this.time) {
                this.current++;
                if (this.move) {
                    this.dAngle = this.startAngle + this.angleStep * this.current;
                    this.dxy();
                }
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.sx, this.sy);
            ctx.lineTo(this.dx, this.dy);
            // ctx.lineTo(this.ex, this.ey);
            ctx.stroke();
            ctx.restore();
        }
        children() {
            let len = this.len / 3;
            if (this.sType === 'start') {
                return [
                    new Element(this.sx, this.sy, len, this.angle, 'start', this.color, this.time, false),
                    new Element(this.tx1, this.ty1, len, this.angle - Math.PI / 3, 'start', this.color, this.time, true, false),
                    new Element(this.tx2, this.ty2, len, this.angle + Math.PI / 3, 'end', this.color, this.time, true, true),
                    new Element(this.ex, this.ey, len, this.angle, 'end', this.color, this.time, false),
                ];
            } else {
                return [
                    new Element(this.sx, this.sy, len, this.angle, 'end', this.color, this.time, false),
                    new Element(this.tx1, this.ty1, len, this.angle + Math.PI / 3, 'end', this.color, this.time, true, true),
                    new Element(this.tx2, this.ty2, len, this.angle - Math.PI / 3, 'start', this.color, this.time, true, false),
                    new Element(this.ex, this.ey, len, this.angle, 'start', this.color, this.time, false),
                ];
            }
        }
        dxy() {
            if (this.sType === 'start') {
                this.dx = this.sx + this.len * Math.cos(this.dAngle);
                this.dy = this.sy + this.len * Math.sin(this.dAngle);
            } else {
                this.dx = this.sx - this.len * Math.cos(this.dAngle);
                this.dy = this.sy - this.len * Math.sin(this.dAngle);
            }
        }
    }

    const drawer = {
        c: document.getElementById('canvas'),
        w: window.innerWidth,
        h: window.innerHeight,
        start() {
            drawer.ctx = drawer.c.getContext('2d'),
            drawer.c.width = drawer.w;
            drawer.c.height = drawer.h;
            drawer.mark = drawer.getMarkCanvas('#999');
            drawer.radius = Math.min(drawer.c.width, drawer.c.height) * 0.4;
            drawer.initElementGroup();
            drawer.currentDeep = 0;
            drawer.currentTime = 0;
            drawer.animate();
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elements[drawer.currentDeep].forEach(item => {
                item.update();
            });
            drawer.currentTime++;
            if (drawer.currentTime >= option.timeStep) {
                drawer.currentTime = 0;
                drawer.currentDeep++;
                if (drawer.currentDeep >= option.deepNum) {
                    drawer.currentDeep = 0;
                    drawer.elements.forEach(item => {
                        item.forEach(ele => ele.start())
                    });
                }
            }

        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements[drawer.currentDeep].forEach((item, index) => {
                item.draw(ctx);
            });
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        initElementGroup() {
            drawer.elements = [];
            for (let i = 0 ; i < option.deepNum; i++) {
                let eles = [];
                if (i === 0) {
                    for (let i = 0; i < 3; i++) {
                        eles.push(new Element(
                            drawer.w / 2 + drawer.radius * Math.cos(-Math.PI / 2 + 2 * i * Math.PI / 3),
                            drawer.h / 2 + drawer.radius * Math.sin(-Math.PI / 2 + 2 * i * Math.PI / 3),
                            2 * drawer.radius * Math.sin(Math.PI / 3),
                            (2 * i + 1) * Math.PI / 3,
                            'start',
                            option.color,
                            option.timeStep,
                            false
                        ));
                    }

                } else {
                    drawer.elements[i - 1].forEach(item => eles.push(eles = eles.concat(item.children())));
                }
                drawer.elements.push(eles);
            }
        },
        getMarkCanvas(fillStyle) {
            let markCanvas = document.createElement('canvas');
            markCanvas.width = 240;
            markCanvas.height = 60;
            let ctx = markCanvas.getContext('2d');

            ctx.fillStyle = fillStyle ? fillStyle : 'rgba(250, 250, 250, 0.5)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '30px cursive';
            ctx.fillText('shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2 );
            return markCanvas;
        },
        drawMark(ctx, mark) {
            ctx.drawImage(mark, ctx.canvas.width - mark.width, ctx.canvas.height - mark.height);
        }

    };
    drawer.start();
})();

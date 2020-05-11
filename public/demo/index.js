(() => {
    const option = {
        deepNum: 14,
        timeStep: 20,
        sleepTime: 20,
        color: '#0075c9',
    };

    class Element {
        constructor(sx, sy, ex, ey, len, angle, color, time, move, tx, ty) {
            this.sx = sx;
            this.sy = sy;
            this.ex = ex;
            this.ey = ey;
            this.len = len;
            this.angle = angle;
            this.color = color;
            this.time = time;
            this.move = move;
            if (this.move) {
                this.tx = tx;
                this.ty = ty;
                this.xStep = (this.ex - this.tx) / this.time;
                this.yStep = (this.ey - this.ty) / this.time;
            }
            this.start();

            this.mx = this.sx + (this.ex - this.sx) / 2;
            this.my = this.sy + (this.ey - this.sy) / 2;
            this.clen = this.len * Math.sin(Math.PI / 4);
            this.sAngle = this.angle + Math.PI / 4;
            this.eAngle = this.angle - Math.PI - Math.PI / 4;
            this.mex = this.sx + this.clen * Math.cos(this.sAngle);
            this.mey = this.sy + this.clen * Math.sin(this.sAngle);
        }
        start() {
            this.current = 0;
            if(this.move) {
                this.dx = this.tx;
                this.dy = this.ty;
            } else {
                this.dx = this.ex;
                this.dy = this.ey;
            }
        }
        complete() {
            this.current = this.time;
            this.dx = this.ex;
            this.dy = this.ey;
        }
        update() {
            if (this.current < this.time) {
                this.current++;
                if (this.move) {
                    this.dx = this.tx + this.current * this.xStep;
                    this.dy = this.ty + this.current * this.yStep;
                }
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.sx, this.sy);
            ctx.lineTo(this.dx, this.dy);
            ctx.stroke();
            ctx.restore();

            // ctx.save();
            // ctx.strokeStyle = 'red';
            // ctx.beginPath();
            // ctx.moveTo(this.tx, this.ty);
            // ctx.lineTo(this.ex, this.ey);
            // ctx.stroke();
            // ctx.restore();
        }
        children() {
            return [
                new Element(this.sx, this.sy, this.mex, this.mey, this.clen, this.sAngle, this.color, this.time, true, this.mx, this.my),
                new Element(this.ex, this.ey, this.mex, this.mey, this.clen, this.eAngle, this.color, this.time, true, this.mx, this.my),
            ];
        }
    }
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ctx = drawer.c.getContext('2d');
            drawer.len = Math.min(drawer.w, drawer.h) * 0.6;
            drawer.initElementGroup();
            console.log(drawer.elements);
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
            drawer.elements[drawer.currentDeep].forEach(item => item.update() );
            drawer.currentTime++;
            if (drawer.currentTime >= (option.timeStep + option.sleepTime)) {
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
            drawer.elements[drawer.currentDeep].forEach(item => item.draw(ctx) );
        },
        initElementGroup() {
            drawer.elements = [];
            for (let i = 0; i < option.deepNum; i++) {
                let eles = [];
                if (i === 0) {
                    eles.push(new Element(
                        (drawer.w - drawer.len) / 2,
                        drawer.h / 3,
                        (drawer.w + drawer.len) / 2,
                        drawer.h / 3,
                        drawer.len,
                        0,
                        option.color,
                        option.timeStep,
                        false
                    ));
                } else {
                    drawer.elements[i - 1].forEach(item => eles.push(eles = eles.concat(item.children())));
                }
                drawer.elements.push(eles);
            }
        }
    };
    drawer.start();
})();

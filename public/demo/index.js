(() => {
    const option = {
        deepNum: 3,
        timeStep: 100,
        color: '#0075c9',
    };
    class Element {
        constructor(sx, sy, ex, ey, color, time, move, tx, ty, tflag) {
            this.sx = sx;
            this.sy = sy;
            this.ex = ex;
            this.ey = ey;
            this.move = move;
            this.color = color;
            this.time = time;

            if (this.move) {
                this.tsx = tx;
                this.tsy = ty;
                this.tflag = tflag;

                if (this.tflag === 'start') {
                    this.tex = this.sx;
                    this.tey = this.sy;
                } else {
                    this.tex = this.ex;
                    this.tey = this.ey;
                }

                this.xStep = (this.tex - this.tsx) / this.time;
                this.yStep = (this.tey - this.tsy) / this.time;
                this.dx = this.tsx;
                this.dy = this.tsy;
            }
            this.current = 0;
        }
        start() {
            this.current = 0;
            if (this.move) {
                this.dx = this.tsx;
                this.dy = this.tsy;
            }
        }
        complete() {
            this.current = this.time;
            this.dx = this.tex;
            this.dy = this.tey;
        }
        update() {
            if (this.current < this.time) {
                this.current++;
                this.dx = this.tsx + this.current * this.xStep;
                this.dy = this.tsy + this.current * this.yStep;
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.dx, this.dy);
            if (this.tflag === 'start') {
                ctx.lineTo(this.ex, this.ey);
            } else {
                ctx.lineTo(this.sx, this.sy);
            }
            ctx.stroke();
            ctx.restore();
        }
        children() {
            let arr = [];
            return arr;
        }
    }

    const drawer = {
        c: document.getElementById('canvas'),
        w: window.innerWidth,
        h: window.innerHeight,
        ctx: this.c.getContext('2d'),
        start() {
            drawer.c.width = w;
            drawer.c.height = h;
            drawer.initElementGroup();
        },
        initElementGroup() {
            drawer.elements = [];
            for (let i = 0 ; i < option.deepNum; i++) {
                if (i === 0) {

                } else {

                }
            }
        }

    };
    drawer.start();
})();

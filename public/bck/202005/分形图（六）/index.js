(() => {
    const option = {
        deepNum: 10,
        timeStep: [20, 30, 20],
        color: '#0075c9',
    };
    class Element {
        constructor(ox, oy, width, angle, color, times) {
            this.ox = ox;
            this.oy = oy;
            this.width = width;
            this.angle = angle;
            this.color = color;
            this.times = times;

            this.angleStep = Math.PI / 4 / this.times[1];
            this.cw = this.width * Math.sqrt(1 / 2);
            this.start();
        }
        start() {
            this.current = 0;
            this.count = 0;
            this.completed = false;
        }
        complete() {
            this.completed = true;
            this.current = this.times.length;
        }
        update() {
            if (!this.completed) {
                this.count++;
                if (this.count >= this.times[this.current]) {
                    this.count = 0;
                    this.current++;
                    if (this.current >= this.times.length) {
                        this.count = 0;
                        this.completed = true;
                    }
                }
            }
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.ox, this.oy);
            ctx.rotate(this.angle);

            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.width / 2, -this.width / 2, this.width, this.width);
            // ctx.strokeRect(-this.width / 2, -this.width / 2, this.width, this.width);

            if (this.current === 1) {
                ctx.save();
                ctx.translate(-this.width / 2, -this.width / 2);
                ctx.rotate(-this.angleStep * this.count);
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.fillRect(0, -this.cw, this.cw, this.cw);
                ctx.restore();

                ctx.save();
                ctx.translate(this.width / 2, -this.width / 2);
                ctx.rotate(this.angleStep * this.count);
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.cw, -this.cw, this.cw, this.cw);
                ctx.restore();
            }
            if (this.current == 2) {
                ctx.save();
                ctx.translate(-this.width / 2, -this.width / 2);
                ctx.rotate(-Math.PI / 4);
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.fillRect(0, -this.cw, this.cw, this.cw);
                ctx.restore();

                ctx.save();
                ctx.translate(this.width / 2, -this.width / 2);
                ctx.rotate(Math.PI / 4);
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.cw, -this.cw, this.cw, this.cw);
                ctx.restore();

            }

            ctx.restore();
        }
        children() {
            let len = Math.sqrt(5 / 4) * this.width,
                lcos = -Math.sqrt(5) / 5,
                langle = Math.acos(lcos),
                lx = len * Math.cos(langle - this.angle),
                ly = -len * Math.sin(langle - this.angle),
                la = this.angle - Math.PI / 4,
                rcos = Math.sqrt(5) / 5,
                rangle = Math.acos(rcos),
                rx = len * Math.cos(rangle - this.angle),
                ry = -len * Math.sin(rangle - this.angle),
                ra = this.angle + Math.PI / 4;
            return [
                new Element(this.ox + lx, this.oy + ly, this.cw, la, this.color, this.times),
                new Element(this.ox + rx, this.oy + ry, this.cw, ra, this.color, this.times),
            ];
        }
    }
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.init();
            drawer.initElementGroup();
            console.log(drawer.elements);
            drawer.currentDeep = 0;
            drawer.currentTime = 0;
            drawer.time = option.timeStep[0] + option.timeStep[1] + option.timeStep[2];
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h * 0.8;
            drawer.firstWidth = Math.min(drawer.w, drawer.h) * 0.2;
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
            if (drawer.currentTime >= drawer.time) {
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
            drawer.elements.forEach((eles, index) => {
                if (index <= this.currentDeep) {
                    eles.forEach(item => item.draw(ctx));
                }
            });
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        initElementGroup() {
            drawer.elements = [];
            for (let i = 0 ; i < option.deepNum; i++) {
                let eles = [];
                if (i === 0) {
                    eles.push(
                        new Element(drawer.ox, drawer.oy, drawer.firstWidth, 0, option.color, option.timeStep)
                        // new Element(560.65, 184.49999999999997, 78.27672067735082, -0.7853981633974483, option.color, option.timeStep)
                    )
                } else {
                    drawer.elements[i - 1].forEach(item => eles.push(eles = eles.concat(item.children())));
                }
                drawer.elements.push(eles);
            }
        }

    };
    drawer.start();
})();

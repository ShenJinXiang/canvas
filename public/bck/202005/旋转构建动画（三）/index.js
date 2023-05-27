(() => {
    const option = {
        num: 90,
        outerColor: '#666',
        sColor: 'rgb(255, 0, 0)',
        lineColor: 'rgba(255, 255, 255, 0.3)',
        timeStep: 10,
    };
    class Element {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
        }
        draw(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.restore();
        }
        refreshXY(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
    }
    
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.init();
            drawer.initElements();
            drawer.current = 0;
            drawer.currentTime = 0;
            drawer.animate();
            drawer.bindEvent();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = drawer.width * 0.2;
            drawer.ox = drawer.w / 2;
            drawer.oy = .35 * drawer.h;
        },
        initElements() {
            drawer.elements = [];
            let step = 2 * Math.PI / option.num;
            for (let i = 0; i < option.num; i++) {
                drawer.elements.push(new Element(
                    drawer.radius * Math.cos( i * step),
                    drawer.radius * Math.sin( i * step),
                    2*drawer.radius * Math.sin(i * step / 2),
                    option.sColor
                ));
            }
        },
        refreshElements() {
            let step = 2 * Math.PI / option.num;
            drawer.elements.forEach((item, index) => {
                item.refreshXY(
                    drawer.radius * Math.cos( index * step),
                    drawer.radius * Math.sin( index * step),
                    2*drawer.radius * Math.sin(index * step / 2)
                )
            });
        },
        bindEvent() {
            window.onresize = () => {
                drawer.init();
                drawer.refreshElements();
            }
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.draw();
            drawer.currentTime++;
            if (drawer.currentTime >= option.timeStep) {
                drawer.currentTime = 0;
                drawer.current++;
                if (drawer.current > drawer.elements.length + 10) {
                    drawer.current = 0;
                    drawer.currentTime = 0;
                }
            }
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.ox, drawer.oy);
            ctx.rotate(-Math.PI / 2);
            if (drawer.current < drawer.elements.length) {
                drawer.drawerOuter(ctx);
                drawer.drawerCurrent(ctx, drawer.elements[drawer.current]);
            }
            drawer.elements.forEach((item, index) => {
                if (index <= drawer.current) {
                    item.draw(ctx);
                }
            });
            ctx.restore();
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        drawerCurrent(ctx, current) {
            CanvasUtil.line(ctx, 0, 0, current.x, current.y, option.outerColor);
            CanvasUtil.line(ctx, drawer.radius, 0, current.x, current.y, option.outerColor);
        },
        drawerOuter(ctx) {
            ctx.save();
            ctx.strokeStyle = option.outerColor;
            ctx.beginPath();
            ctx.arc(0, 0, drawer.radius, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.restore();
        },

    };
    drawer.start();
})();

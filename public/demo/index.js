(() => {
    const option = {

    };
    class Element {
        constructor(x, y, length, width, beginAngle, angleStep, color) {
            this.x = x;
            this.y = y;
            this.length = length;
            this.width = width;
            this.beginAngle = beginAngle;
            this.angleStep = angleStep;
            this.angle = this.beginAngle;
            this.color = color;
        }
        update() {
            this.angle += this.angleStep;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.beginPath();
            ctx.moveTo(-this.length / 2, 0);
            ctx.lineTo(this.length / 2, 0);
            ctx.stroke();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.reset();
            drawer.elementsNum = 2;
            drawer.initElements();
            console.log(drawer.elements);
            drawer.animate();
        },
        reset() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.radius = Math.min(drawer.w, drawer.h) * 0.3;
            drawer.length = drawer.radius * 0.8;
            drawer.width = drawer.radius * 0.1;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.h / 2;
            drawer.angleStep = Math.PI / 90;
        },
        initElements() {
            drawer.elements = [];
            for (let i = 0, step = 2 * Math.PI / drawer.elementsNum; i < drawer.elementsNum; i++) {
                drawer.elements.push(new Element(
                    drawer.ox + drawer.radius * Math.cos(i * step),
                    drawer.oy + drawer.radius * Math.sin(i * step),
                    drawer.length,
                    drawer.width,
                    0,
                    drawer.angleStep,
                    'hsla(' + (i * 10)  + ', 80%, 60%, 1)'
                ));
            }
        },
        animate() {
            
        }

    };
    drawer.start();
})();
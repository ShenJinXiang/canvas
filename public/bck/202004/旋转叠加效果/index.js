(() => {
    const option = {
        background: '#061928',
        elementStrokeColor: 'rgba(255, 255, 255, 0.5)',
        markColor: '#084',
        marksLength: 5000,
        cs: [
            // {radius: 200, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false},
            // {radius: 80, beginAngle: Math.PI / 6, angleStep: Math.PI / 60, counterclockwise: false},
            // {radius: 80, beginAngle: Math.PI / 6, angleStep: Math.PI / 20, counterclockwise: true}
            {radius: 8, beginAngle: 0, angleStep: 1, counterclockwise: false},
            {radius: 5, beginAngle: 0, angleStep: 6, counterclockwise: false},
        ]
    };
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        lineTo(ctx, that, width, strokeStyle) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = width ? width : 1;
            ctx.strokeStyle = !!strokeStyle ? strokeStyle : 'rgba(0, 0, 0, 0.5)';
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(that.x, that.y);
            ctx.stroke();
            ctx.restore();
        }
    }
    class Element {
        constructor(radius, beginAngle, angleStep, counterclockwise) {
            this.radius = radius;
            this.beginAngle = beginAngle;
            this.angle = this.beginAngle;
            this.angleStep = angleStep;
            this.counterclockwise = !!counterclockwise;
        }
        setOrigin(origin) {
            this.origin = origin;
        }
        setNext(next) {
            this.next = next;
        }
        update() {
            this.currentPoint = new Point(
                this.origin.x + this.radius * Math.cos(this.angle),
                this.origin.y + this.radius * Math.sin(this.angle)
            );
            if(this.next) {
                this.next.setOrigin(this.currentPoint);
            }
            if (this.counterclockwise) {
                this.angle -= this.angleStep;
            } else {
                this.angle += this.angleStep;
            }
        }
        draw(ctx, strokeStyles) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = strokeStyles;
            ctx.arc(this.origin.x, this.origin.y, this.radius, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.restore();
            this.origin.lineTo(ctx, this.currentPoint, 1, strokeStyles);
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
            drawer.maxRadius = Math.min(drawer.w, drawer.h) * 0.3;
            drawer.radiusItem = drawer.maxRadius / 10;
            drawer.angleItem = Math.PI / 360;
            drawer.origin = new Point(drawer.w / 2, drawer.h / 2);
            drawer.cs = option.cs;
            drawer.marks = [];
            drawer.initElements();
        },
        bindEvent() {
            window.onresize = drawer.init;
        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elements.forEach(item => item.update(drawer.marks));
            let last = drawer.elements[drawer.elements.length - 1];
            drawer.marks.push(last.currentPoint);
            if (drawer.marks.length > option.marksLength) {
                drawer.marks.shift();
            }
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements.forEach(item => item.draw(ctx, option.elementStrokeColor));
            drawer.drawMarks(ctx, drawer.marks);
            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        drawMarks(ctx, arr) {
            for (let i = 0; i < arr.length - 1; i++) {
                arr[i].lineTo(ctx, arr[i + 1], 2, 'hsla(' + i + ', 80%, 60%, 1)');
            }
            // ctx.save();
            // ctx.beginPath();
            // ctx.strokeStyle = option.markColor;
            // ctx.lineWidth = 2;
            // ctx.beginPath();
            // for(let i = 0; i < arr.length; i++ ) {
            //     ctx.lineTo(arr[i].x, arr[i].y);
            // }
            // ctx.stroke();
            // ctx.restore();
        },
        initElements() {
            drawer.elements = [];
            drawer.cs.forEach(function (item, index) {
                let elment = new Element(item.radius * drawer.radiusItem, item.beginAngle * drawer.angleItem, item.angleStep * drawer.angleItem, item.counterclockwise);
                if (index === 0) {
                    elment.setOrigin(drawer.origin);
                } else {
                    let prev = drawer.elements[index - 1];
                    prev.setNext(elment);
                    elment.setOrigin(new Point(
                        prev.origin.x + prev.radius * Math.cos(prev.angle),
                        prev.origin.y + prev.radius * Math.sin(prev.angle)
                    ));
                }
                drawer.elements.push(elment);
            });
        }
    };
    drawer.start();
})();

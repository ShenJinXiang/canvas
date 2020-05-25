(function() {
    const option = {
        background: '#061928',
        elementStrokeColor: 'rgba(255, 255, 255, 0.5)',
        marksLength: 5000,
        minWidth: 1200,
        minHeight: 800,
        rightXStep: .5,
        rightWidth: 0.3,
        /**
         * 三角波形
         */
        // cs: [
        //     {radius: 1600 / Math.pow(Math.PI, 2), beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false}
        //     , {radius: 1600 / Math.pow(3 * Math.PI, 2), beginAngle: 0, angleStep: 3 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 1600 / Math.pow(5 * Math.PI, 2), beginAngle: 0, angleStep: 5 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 1600 / Math.pow(7 * Math.PI, 2), beginAngle: 0, angleStep: 7 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 1600 / Math.pow(9 * Math.PI, 2), beginAngle: 0, angleStep: 9 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 1600 / Math.pow(11 * Math.PI, 2), beginAngle: 0, angleStep: 11 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 1600 / Math.pow(13 * Math.PI, 2), beginAngle: 0, angleStep: 13 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 1600 / Math.pow(15 * Math.PI, 2), beginAngle: 0, angleStep: 15 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 1600 / Math.pow(17 * Math.PI, 2), beginAngle: 0, angleStep: 17 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 1600 / Math.pow(19 * Math.PI, 2), beginAngle: 0, angleStep: 19 * Math.PI / 360, counterclockwise: true}
        // ]

        // cs: [
        //     {radius: 100 / 1, beginAngle: 0, angleStep:  Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 2, beginAngle: 0, angleStep: 2 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 3, beginAngle: 0, angleStep: 3 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 4, beginAngle: 0, angleStep: 4 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 5, beginAngle: 0, angleStep: 5 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 6, beginAngle: 0, angleStep: 6 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 7, beginAngle: 0, angleStep: 7 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 8, beginAngle: 0, angleStep: 8 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 9, beginAngle: 0, angleStep: 9 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 10, beginAngle: 0, angleStep: 10 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 11, beginAngle: 0, angleStep: 11 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 12, beginAngle: 0, angleStep: 12 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 13, beginAngle: 0, angleStep: 13 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 14, beginAngle: 0, angleStep: 14 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 15, beginAngle: 0, angleStep: 15 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 16, beginAngle: 0, angleStep: 16 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 17, beginAngle: 0, angleStep: 17 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 18, beginAngle: 0, angleStep: 18 * Math.PI / 360, counterclockwise: true}
        //     , {radius: 100 / 19, beginAngle: 0, angleStep: 19 * Math.PI / 360, counterclockwise: true}
        // ]
    };
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    function linePoint(ctx, point1, point2, lineWidth, color) {
        line(ctx, point1.x, point1.y, point2.x, point2.y, lineWidth, color);
    }
    function line(ctx, sx, sy, ex, ey, lineWidth, color) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = lineWidth || 1;
        ctx.strokeStyle = !!color ? color : 'rgba(0, 0, 0, 0.5)';
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.restore();
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
        update(arr) {
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
        draw(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = option.elementStrokeColor;
            ctx.arc(this.origin.x, this.origin.y, this.radius, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.restore();
            linePoint(ctx, this.origin, this.currentPoint, 1, option.elementStrokeColor);
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.w = drawer.c.width = drawer.getWidth();
            drawer.h = drawer.c.height = drawer.getHeight();
            drawer.ctx = drawer.c.getContext('2d');
            // 右侧的canvas
            drawer.rc = document.createElement('canvas');
            drawer.rw = drawer.rc.width = drawer.w * option.rightWidth;
            drawer.rh = drawer.rc.height = drawer.h;
            drawer.rctx = drawer.rc.getContext('2d');

            this.mark = CanvasUtil.getMarkCanvas();
            drawer.num = 5;
            drawer.refreshCs(drawer.num);
            console.log(drawer.cs);
            drawer.initElements();
            drawer.marks = [];
            drawer.rmarks = [];
            drawer.animate();
            drawer.bindEvent();
        },
        bindEvent() {
            $("#numRange").mousemove(function() {
                let val = ~~$(this).val();
                $("#num_span").text(val);
                if (drawer.num != val) {
                    drawer.num = ~~$(this).val();
                    drawer.refreshCs(drawer.num);
                    drawer.initElements();
                    drawer.marks = [];
                    drawer.rmarks = [];
                }
            });
        },
        refreshCs(num) {
            drawer.cs = [];
            for (let i = 0; i <= num; i++) {
                let n = 2 * i + 1;
                drawer.cs.push({
                    radius: 400 / (n * Math.PI),
                    beginAngle: 0,
                    angleStep: (n * Math.PI) / 360,
                    counterclockwise: false
                })
            }

        },
        animate() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            drawer.elements.forEach(item => item.update(drawer.marks));
            drawer.rmarks.forEach(item => item.x += option.rightXStep);
            drawer.rmarks = drawer.rmarks.filter(item => item.x <= drawer.rw);
            let last = drawer.elements[drawer.elements.length - 1];
            drawer.marks.push(last.currentPoint);
            drawer.rmarks.push(new Point(0, last.currentPoint.y));
            if (drawer.elements.length > option.marksLength) {
                drawer.elements.shift();
            }

        },
        draw() {
            let ctx = drawer.ctx,
                rctx = drawer.rctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            this.elements.forEach(item => item.draw(ctx));
            drawer.drawMarks(ctx, drawer.marks);
            drawer.drawMarkLink(ctx, drawer.marks[drawer.marks.length - 1], drawer.rmarks[drawer.rmarks.length - 1]);

            rctx.fillStyle = option.background;
            rctx.clearRect(0, 0, drawer.rw, drawer.rh);
            rctx.fillRect(0, 0, drawer.rw, drawer.rh);
            drawer.drawMarks(rctx, drawer.rmarks);
            ctx.drawImage(drawer.rc, drawer.w - drawer.rw, 0);

            CanvasUtil.drawMark(ctx, drawer.mark);
        },
        drawMarkLink(ctx, markPoint) {
            let rx = drawer.w - drawer.rw;
            line(ctx, markPoint.x, markPoint.y, rx, markPoint.y, 1, 'rgba(255, 0, 0, 1)');
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.moveTo(rx, markPoint.y);
            ctx.lineTo(rx - 20, markPoint.y - 5);
            ctx.lineTo(rx - 20, markPoint.y + 5);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawMarks(ctx, arr) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.beginPath();
            for(let i = 0; i < arr.length; i++ ) {
                ctx.lineTo(arr[i].x, arr[i].y);
            }
            ctx.stroke();
            ctx.restore();
        },
        initElements() {
            debugger
            drawer.elements = [];
            drawer.cs.forEach(function (item, index) {
                let elment = new Element(item.radius, item.beginAngle, item.angleStep, item.counterclockwise);
                if (index == 0) {
                    elment.setOrigin(new Point((drawer.w - drawer.rw) / 2, drawer.h / 2));
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
        },
        getWidth() {
            return window.innerWidth <= option.minWidth ? option.minWidth : window.innerWidth;
        },
        getHeight() {
            return window.innerHeight <= option.minHeight ? option.minHeight : window.innerHeight;
        },
    };
    drawer.start();
})();

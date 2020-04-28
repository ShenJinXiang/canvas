(function() {
    let option = {
        background: '#061928',
        elementStrokeColor: 'rgba(255, 255, 255, 0.5)',
        marksLength: 5000,
        minWidth: 1200,
        minHeight: 800,
        rightXStep: .5,
        rightWidth: 0.3,
        // cs: [
        //     {radius: 400 / Math.PI, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false}
        // ]
        // cs: [
        //     {radius: 400 / Math.PI, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (3 * Math.PI), beginAngle: 0, angleStep: 3 * Math.PI / 360, counterclockwise: false}
        // ]
        // cs: [
        //     {radius: 400 / Math.PI, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (3 * Math.PI), beginAngle: 0, angleStep: 3 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (5 * Math.PI), beginAngle: 0, angleStep: 5 * Math.PI / 360, counterclockwise: false}
        // ]
        // cs: [
        //     {radius: 400 / Math.PI, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (3 * Math.PI), beginAngle: 0, angleStep: 3 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (5 * Math.PI), beginAngle: 0, angleStep: 5 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (7 * Math.PI), beginAngle: 0, angleStep: 7 * Math.PI / 360, counterclockwise: false}
        // ]
        // cs: [
        //     {radius: 400 / Math.PI, beginAngle: 0, angleStep: Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (3 * Math.PI), beginAngle: 0, angleStep: 3 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (5 * Math.PI), beginAngle: 0, angleStep: 5 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (7 * Math.PI), beginAngle: 0, angleStep: 7 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (9 * Math.PI), beginAngle: 0, angleStep: 9 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (11 * Math.PI), beginAngle: 0, angleStep: 11 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (13 * Math.PI), beginAngle: 0, angleStep: 13 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (15 * Math.PI), beginAngle: 0, angleStep: 15 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (17 * Math.PI), beginAngle: 0, angleStep: 17 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (19 * Math.PI), beginAngle: 0, angleStep: 19 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (21 * Math.PI), beginAngle: 0, angleStep: 21 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (23 * Math.PI), beginAngle: 0, angleStep: 23 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (25 * Math.PI), beginAngle: 0, angleStep: 25 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (27 * Math.PI), beginAngle: 0, angleStep: 27 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (29 * Math.PI), beginAngle: 0, angleStep: 29 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (31 * Math.PI), beginAngle: 0, angleStep: 31 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (33 * Math.PI), beginAngle: 0, angleStep: 33 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (35 * Math.PI), beginAngle: 0, angleStep: 35 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (37 * Math.PI), beginAngle: 0, angleStep: 37 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (39 * Math.PI), beginAngle: 0, angleStep: 39 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (41 * Math.PI), beginAngle: 0, angleStep: 41 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (43 * Math.PI), beginAngle: 0, angleStep: 43 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (45 * Math.PI), beginAngle: 0, angleStep: 45 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (47 * Math.PI), beginAngle: 0, angleStep: 47 * Math.PI / 360, counterclockwise: false}
        //     , {radius: 400 / (49 * Math.PI), beginAngle: 0, angleStep: 49 * Math.PI / 360, counterclockwise: false}
        // ]

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
    function Point(x, y) {
        this.x = x;
        this.y = y;
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
    function Element(radius, beginAngle, angleStep, counterclockwise) {
        this.radius = radius;
        this.beginAngle = beginAngle;
        this.angle = this.beginAngle;
        this.angleStep = angleStep;
        this.counterclockwise = !!counterclockwise;
    }
    Element.prototype.setOrigin = function (origin) {
        this.origin = origin;
    };
    Element.prototype.setNext = function(next) {
        this.next = next;
    };
    Element.prototype.update = function (arr) {
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
    };
    Element.prototype.draw = function (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = option.elementStrokeColor;
        ctx.arc(this.origin.x, this.origin.y, this.radius, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.restore();
        linePoint(ctx, this.origin, this.currentPoint, 1, option.elementStrokeColor);
    };

    let drawer = {
        start: function() {
            drawer.c = document.getElementById('canvas');
            drawer.w = drawer.c.width = drawer.getWidth();
            drawer.h = drawer.c.height = drawer.getHeight();
            drawer.ctx = drawer.c.getContext('2d');
            // 右侧的canvas
            drawer.rc = document.createElement('canvas');
            drawer.rw = drawer.rc.width = drawer.w * option.rightWidth;
            drawer.rh = drawer.rc.height = drawer.h;
            drawer.rctx = drawer.rc.getContext('2d');

            this.mark = drawer.getMarkCanvas();
            drawer.num = 5;
            drawer.refreshCs(drawer.num);
            console.log(drawer.cs);
            drawer.initElements();
            drawer.marks = [];
            drawer.rmarks = [];
            drawer.animate();
            drawer.bindEvent();
        },
        bindEvent: function() {
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
        refreshCs: function(num) {
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
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
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
        draw: function() {
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

            drawer.drawMark(drawer.ctx, drawer.mark);
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
        drawMarks: function(ctx, arr) {
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
        initElements: function() {
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
        getWidth: function () {
            return window.innerWidth <= option.minWidth ? option.minWidth : window.innerWidth;
        },
        getHeight: function () {
            return window.innerHeight <= option.minHeight ? option.minHeight : window.innerHeight;
        },
        getMarkCanvas: function(fillStyle) {
            var markCanvas = document.createElement('canvas');
            markCanvas.width = 240;
            markCanvas.height = 60;
            var ctx = markCanvas.getContext('2d');

            ctx.fillStyle = fillStyle || 'rgba(250, 250, 250, 0.5)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '30px cursive';
            ctx.fillText('shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2 );
            return markCanvas;
        },
        drawMark: function(ctx, mark) {
            ctx.drawImage(mark, ctx.canvas.width - mark.width, ctx.canvas.height - mark.height);
        }
    };
    drawer.start();
})();

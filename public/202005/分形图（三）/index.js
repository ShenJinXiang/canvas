(function() {
    let option = {
        deepNum: 8,
        ratio: 0.7,
        color: '#0075c9',
        lineWidth: 1,
        timeStep: 50
    };
    class Element {
        constructor(x, y, radius, color, time) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.time = time;
            this.r = 0;
            this.current = 0;
            this.angleStep =  Math.PI / this.time;
            this.rStep = this.radius / this.time;
            this.angle =  0;
            this.startAngle = Math.PI;
        }
        setStart() {
            this.current = 0;
            this.r = 0;
            this.angle = 0;
        }
        setComplete() {
            this.angle =  2 * Math.PI;
            this.r = this.radius;
        }
        update() {
            if (this.current < this.time) {
                this.current++;
                this.r = this.current * this.rStep;
                this.angle = this.startAngle + this.current * this.angleStep;
            }
        }
        draw(ctx) {
            fillTriangle(ctx, this.x, this.y, this.r, .5 * Math.PI + this.angle, this.color);
        }
        children() {
            let arr = [];
            for (let i = 0; i < 3; i++) {
                arr.push(new Element(
                    this.x + this.radius * Math.cos(-0.5 * Math.PI + 2 * i * Math.PI / 3 ),
                    this.y + this.radius * Math.sin(-0.5 * Math.PI + 2 * i * Math.PI / 3 ),
                    this.radius / 2,
                    this.color,
                    this.time
                ));
            }
            return arr;
        }
    }

    function fillTriangle(ctx, x, y, radius, angle, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.scale(radius, radius);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(Math.cos(0), Math.sin(0));
        ctx.lineTo(Math.cos(2 * Math.PI / 3), Math.sin(2 * Math.PI / 3));
        ctx.lineTo(Math.cos(4 * Math.PI / 3), Math.sin(4 * Math.PI / 3));
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    let drawer = {
        start: function() {
            drawer.c = document.getElementById('canvas');
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = drawer.getMarkCanvas('#999');
            drawer.currentDeep = 0;
            drawer.currentTime = 0;
            drawer.initElementGroup();
            drawer.animate();
            drawer.bindEvent();
        },
        bindEvent: function() {
            $(window).resize(function() {
                drawer.w = drawer.c.width = window.innerWidth;
                drawer.h = drawer.c.height = window.innerHeight;
                drawer.initElementGroup();
            });
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.elements.forEach(function(item, index) {
                if (drawer.currentDeep === index) {
                    item.forEach(ele => ele.update());
                }
                if (drawer.currentDeep > index) {
                    item.forEach(ele => ele.setComplete());
                }
            });
            console.log('currentTime:' + drawer.currentTime + " currentDeep:" + drawer.currentDeep);
            drawer.currentTime++;
            if (drawer.currentTime >= option.timeStep) {
                drawer.currentTime = 0;
                drawer.currentDeep++;
                if (drawer.currentDeep >= option.deepNum) {
                    drawer.currentDeep = 0;
                    drawer.elements.forEach(function (item) {
                        item.forEach(ele => ele.setStart())
                    })
                }
            }
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            fillTriangle(ctx, .5 * drawer.w, .65 * drawer.h , drawer.h * .6, -Math.PI / 2, option.color);
            drawer.elements.forEach(function(item, index) {
                if (drawer.currentDeep >= index) {
                    item.forEach(ele => ele.draw(ctx));
                }
            });
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        initElementGroup: function() {
            drawer.elements = [];
            for (let i = 0; i < option.deepNum; i++) {
                let eles = [];
                if (i === 0) {
                    eles.push(new Element(
                        .5 * drawer.w,
                        .65 * drawer.h,
                        .3 * drawer.h,
                        '#fff',
                        option.timeStep
                    ));
                } else {
                    drawer.elements[i - 1].forEach(item => eles.push(eles = eles.concat(item.children())));
                }
                drawer.elements.push(eles);
            }

        },
        getMarkCanvas: function(fillStyle) {
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
        drawMark: function(ctx, mark) {
            ctx.drawImage(mark, ctx.canvas.width - mark.width, ctx.canvas.height - mark.height);
        }
    };
    drawer.start();
})();

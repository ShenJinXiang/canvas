(function() {
    let option = {
        deepNum: 13,
        ratio: 0.7,
        color: '#0075c9',
        lineWidth: 1,
        timeStep: 100
    };
    class Element {
        constructor(x, y, len, angle, width, color, ratio) {
            this.x = x;
            this.y = y;
            this.len = len;
            this.angle = angle;
            this.width = width;
            this.color = color;
            this.ratio = ratio;
        }
        draw(ctx) {
            ctx.save();
            ctx.lineWidth = this.width;
            ctx.strokeStyle = this.color;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.moveTo(- this.len / 2, 0);
            ctx.lineTo(this.len / 2, 0);
            ctx.stroke();
            ctx.restore();
        }
        children() {
            let arr = [],
                len = this.len * this.ratio,
                angle = this.angle + Math.PI / 2;
            arr.push(new Element(
                this.x + 0.5 * this.len * Math.cos(this.angle),
                this.y + 0.5 * this.len * Math.sin(this.angle),
                len,
                angle,
                this.width,
                this.color,
                this.ratio
                ));
            arr.push(new Element(
                this.x - 0.5 * this.len * Math.cos(this.angle),
                this.y - 0.5 * this.len * Math.sin(this.angle),
                len,
                angle,
                this.width,
                this.color,
                this.ratio
            ));
            return arr;
        }
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
            console.log(drawer.elements);
            drawer.animate();
            drawer.bindEvent();
        },
        bindEvent: function() {
            $(window).resize(function() {
            });
        },
        animate: function() {
            if (drawer.currentTime === 0) {
                drawer.draw();
            }
            drawer.update();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.currentTime++;
            if (drawer.currentTime >= option.timeStep) {
                drawer.currentTime = 0;
                drawer.currentDeep++;
                if (drawer.currentDeep >= option.deepNum) {
                    drawer.currentDeep = 0;
                }
            }
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
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
                if (i == 0) {
                    eles.push(new Element(drawer.w / 2, drawer.h / 2, drawer.w / 2, 0, option.lineWidth, option.color, option.ratio));
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

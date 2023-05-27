(function() {
    let option = {
        deepNum: 6,
        color: '#0075c9',
        timeStep: 100
    };
    function Element(x, y, radius, color, sideNum) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.sideNum = ~~sideNum;
        this.rotate = -Math.PI / 2;
    }
    Element.prototype.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.radius, this.radius);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        let step = 2 * Math.PI / this.sideNum;
        for (let i = 0; i < this.sideNum; i++) {
            ctx.lineTo(Math.cos(this.rotate + i * step), Math.sin(this.rotate + i * step));
        }
        ctx.fill();
        ctx.restore();
    };
    Element.prototype.children = function() {
        let arr = [],
            r = this.radius / 3,
            step = 2 * Math.PI / this.sideNum;
        arr.push(new Element(this.x, this.y, r, this.color, this.sideNum));
        for (let i = 0; i < this.sideNum; i++) {
            arr.push(new Element(
                this.x + r * 2 * Math.cos(this.rotate + i * step),
                this.y + r * 2 * Math.sin(this.rotate + i * step),
                r,
                this.color,
                this.sideNum
            ));
        }
        return arr;
    };
    let drawer = {
        start: function() {
            drawer.c = document.getElementById('canvas');
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = drawer.getMarkCanvas('#999');
            drawer.sideNum = 6;
            drawer.initElementGroups();
            console.log(drawer.elements);
            drawer.current = 0;
            drawer.currentTime = 0;
            drawer.animate();
            drawer.bindEvent();
        },
        bindEvent: function() {
            $(window).resize(function() {
                drawer.w = drawer.c.width = window.innerWidth;
                drawer.h = drawer.c.height = window.innerHeight;
                drawer.initElementGroups();
                drawer.draw();
            });
            $("#numRange").mousemove(function() {
                let val = ~~$(this).val();
                $("#num_span").text(val);
                if (drawer.sideNum !== val) {
                    drawer.sideNum = ~~$(this).val();
                    drawer.initElementGroups();
                    drawer.draw();
                }
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
                drawer.current++;
                if (drawer.current >= option.deepNum) {
                    drawer.current = 0;
                }
            }
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements[drawer.current].forEach(item => item.draw(ctx));
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        initElementGroups: function() {
            drawer.elements = [];
            for (let i = 0; i < option.deepNum; i++) {
                let eles = [];
                if (i == 0) {
                    eles.push(new Element(drawer.w / 2, drawer.h / 2, Math.min(drawer.w, drawer.h) * 0.45, option.color, drawer.sideNum));
                } else {
                    drawer.elements[i - 1].forEach(item => eles.push(eles = eles.concat(item.children())));
                }
                drawer.elements.push(eles);
            }
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

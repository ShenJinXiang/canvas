(function() {
    /**
     * * x = 16 （sinθ）^3
     * y = 13 cosθ- 5 cos 2θ - 2 cos 3θ - cos 4θ
     */
    let drawer = {
        option: {
            outer: 600,
            r: 2
        },
        init: function() {
            this.c = document.getElementById("canvas");
            this.w = this.c.width = window.innerWidth < drawer.option.outer ? drawer.option.outer : window.innerWidth;
            this.h = this.c.height = window.innerHeight < drawer.option.outer ? drawer.option.outer : window.innerHeight;
            this.outer = drawer.option.outer;
            this.radius = this.outer * 0.4;
            this.ctx = this.c.getContext('2d');
            this.mark = drawer.getMarkCanvas();
            this.initElements();
            this.currentIndex = 0;
            this.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.w = drawer.c.width = window.innerWidth < drawer.option.outer ? drawer.option.outer : window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight < drawer.option.outer ? drawer.option.outer : window.innerHeight;
            drawer.elements.forEach(function(item, index) {
                item.status = index <= drawer.currentIndex;
            });
            drawer.currentIndex++;
            if (drawer.currentIndex >= drawer.elements.length) {
                drawer.currentIndex = 0;
            }
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            drawer.elements.forEach(item => item.draw(ctx));
            ctx.restore();
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        initElements: function() {
            drawer.elements = [];
            let r = drawer.radius / 16,
                rStep = 0.5,
                angle = 0;
                deltai = 0.03,
                green = 0;
            while(r > rStep) {
                while( deltai > 0 && angle <= Math.PI || deltai < 0 && angle >= 0 ) {
                    let p = drawer.heartXY( angle, r);
                    drawer.elements.push(new drawer.Element(p.x, p.y, 'rgb(255, ' + green + ', 0)', drawer.option.r));
                    angle += deltai;
                }
                deltai *= -1.08;
                green += 5;
                r -= rStep;
            }

        },
        Element: function(x, y, color, r) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.r = r;
            this.status = true;
            this.draw = function(ctx) {
                if (!this.status) {
                    return;
                }
                ctx.save();
                this.drawElement(ctx);
                ctx.restore();

                ctx.save();
                ctx.scale(-1, 1);
                this.drawElement(ctx);
                ctx.restore();
            };
            this.drawElement = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
            }
        },
        heartXY: function (θ, r) {
            return {
                x: r * 16 * Math.pow(Math.sin(θ), 3),
                y: -r * (13 * Math.cos(θ)- 5 * Math.cos(2 * θ) - 2 * Math.cos(3 * θ) - Math.cos(4 * θ) )
            };
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
    drawer.init();
})();

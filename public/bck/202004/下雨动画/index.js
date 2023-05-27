(function() {
    let drawer = {
        option: {
            background: '#061928',
            color: 'rgba(174,194,224,0.5)'
        },
        init: function() {
            this.c = document.getElementById('canvas');
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.initElements();
            this.mark = drawer.getMarkCanvas();
            this.bindEvent();
            return this;
        },
        bindEvent: function() {
            window.onresize = function() {
                drawer.w = drawer.c.width = window.innerWidth;
                drawer.h = drawer.c.height = window.innerHeight;
                drawer.initElements();
            };
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.elements.forEach(item => item.update());
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements.forEach(item => item.draw(ctx));
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        initElements: function() {
            drawer.elements = [];
            for (let x = 0; x < drawer.w; x++) {
                for (let y = 0; y < drawer.h; y++) {
                    if(Math.round(Math.random() * 1000) == 1) {
                        drawer.elements.push( new drawer.Element( x, y, drawer.random(-2, 2), drawer.random(10, 15), drawer.random(0, 1)) );
                    }
                }
            }
        },
        Element: function(x, y, vx, vy, l) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.l = l;
            this.color = drawer.option.color;
            this.update = function() {
                this.x += vx;
                this.y += vy;
                if (this.x < 0 || this.x > drawer.w || this.y - this.l > drawer.h) {
                    this.x = drawer.random(0, drawer.w);
                    this.y = -20;
                }
            };
            this.draw = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineCap = "round";
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.l * this.vx, this.y + this.l * this.vy);
                ctx.stroke();
                ctx.restore();
            }
        },
        random: function(min, max) {
            return min + Math.random() * (max - min);
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
    drawer.init().animate();
})();

(function() {
    /*
     * 桃心型线的参数方程：
     * x = 16 （sinθ）^3
     * y = 13 cosθ- 5 cos 2θ - 2 cos 3θ - cos 4θ
     * 玫瑰线的参数方程：
     * x=sin4θ×cosθ
     * y=sin4θ×sinθ
     */

    let drawer = {
        option: {
            radius: 0.4,
            num: 100,
            colors: [ '#0f628b', '#ccdff0', '#66ebff', '#ffffff', '#f0ff00' ],
            rectElementWidth: 8,
            maxElementRadius: 6,
            minElementRadius: 0.5,
            minRoundRadius: 4,
            maxRoundRadius: 8,
            minRoundTime: 50,
            maxRoundTime: 100,
        },
        init: function() {
            this.c = document.getElementById("canvas");
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.outer = Math.min(this.w, this.h);
            this.ctx = this.c.getContext('2d');
            this.mark = drawer.getMarkCanvas();
            this.initElements();
            this.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.outer = Math.min(drawer.w, drawer.h);
            drawer.refreshElements();
            drawer.elements.forEach(item => item.update());
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
            let step = 2 * Math.PI / drawer.option.num,
                r = drawer.outer * drawer.option.radius,
                color = drawer.option.colors;
            for (let i = 0; i < drawer.option.num; i++) {
                let p = drawer.heartXY(i * step, r / 16),
                    c = color[Math.floor(Math.random() * color.length)],
                    roundRadius = drawer.random(drawer.option.minRoundRadius, drawer.option.maxRoundRadius),
                    roundTime = drawer.random(drawer.option.minRoundTime, drawer.option.maxRoundTime);
                if (Math.random() > 0.6) {
                    drawer.elements.push(new drawer.RectElement(p.x, p.y, c, roundRadius, roundTime));
                } else {
                    drawer.elements.push(new drawer.CircleElement(p.x, p.y, c, roundRadius, roundTime));
                }
            }
        },
        refreshElements: function() {
            let step = 2 * Math.PI / drawer.option.num,
                r = drawer.outer * drawer.option.radius;
            drawer.elements.forEach(function(item, i) {
                let p = drawer.heartXY(i * step, r / 16);
                item.x = p.x;
                item.y = p.y;
            });

        },
        CircleElement: function(x, y, color, roundRadius, roundTime) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.roundRadius = roundRadius;
            this.roundStep = 2 * Math.PI / roundTime;
            this.rotate = 0;
            this.r = drawer.random(drawer.option.minElementRadius, drawer.option.maxElementRadius);
            this.update = function() {
                this.rotate += this.roundStep;
            },
            this.draw = function(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.roundRadius * Math.cos(this.rotate), this.roundRadius * Math.sin(this.rotate), this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
            }
        },
        RectElement: function(x, y, color, roundRadius, roundTime) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.roundRadius = roundRadius;
            this.roundStep = 2 * Math.PI / roundTime;
            this.rotate = 0;
            this.w = drawer.option.rectElementWidth;
            this.update = function() {
                this.rotate += this.roundStep;
            },
            this.draw = function(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(Math.PI / 4);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.fillRect(this.roundRadius * Math.cos(this.rotate) - this.w / 2, this.roundRadius * Math.sin(this.rotate) - this.w / 2, this.w, this.w);
                ctx.restore();
            }
        },
        heartXY: function (θ, r) {
            return {
                x: r * 16 * Math.pow(Math.sin(θ), 3),
                y: -r * (13 * Math.cos(θ)- 5 * Math.cos(2 * θ) - 2 * Math.cos(3 * θ) - Math.cos(4 * θ) )
            };
        },
        mgXY: function (t, r) {
            return {
                x : r * (Math.sin(4 * t) * Math.cos(t)),
                y : r * (Math.sin(4 * t) * Math.sin(t))
            };
        },
        random: function(min, max) {
            return Math.random() * (max - min) + min;
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

(function() {
    var drawer = {
        option: {
            maxVx: 3,
            minVx: -3,
            maxVy: 5,
            minVy: 2,
            maxRadius: 4,
            minRadius: 1,
            maxAlpha: 0.9,
            minAlpha: 0.1,
            fontColor: '#d99c3b',
            url: 'http://v.bootstrapmb.com/2018/12/msr7e3328/'
        },
        init: function() {
            this.c = this.canvas = document.getElementById('canvas');
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.mark = drawer.getMarkCanvas();            
            this.initElements();
            this.bindEvent();
            this.animate();
            this.runTime();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.elements.forEach(function(item) {
                item.update();
            });
        },
        draw: function() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.elements.forEach(function(item) {
                item.draw(drawer.ctx);
            });
            drawer.drawText(drawer.ctx, drawer.des, drawer.w, drawer.h);
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        initElements: function() {
            drawer.elements = [];
            for (var x = 0; x < drawer.w; x++) {
                for (var y = 0; y < drawer.h; y++) {
                    if (Math.round(Math.random() * 4000) == 1) {
                        drawer.elements.push(new drawer.Element(x, y));
                    }
                }
            }
        },
        Element: function(x, y) {
            var option = drawer.option;
            this.init = function() {
                this.x = x;
                this.y = y;
                this.vx = drawer.random(option.minVx, option.maxVx);
                this.vy = drawer.random(option.minVy, option.maxVy);
                this.r = drawer.random(option.maxRadius, option.minRadius);
                this.alpha = drawer.random(option.maxAlpha, option.minAlpha);
            };
            this.init();
            this.update = function() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.y + this.r > drawer.h) {
                    this.init();
                    this.y = 0;
                }
            };
            this.draw = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
            }
        },
        bindEvent: function() {
            window.onresize = function() {
                drawer.w = drawer.c.width = window.innerWidth;
                drawer.h = drawer.c.height = window.innerHeight;
            }
        },
        random: function(min, max) {
            return Math.random() * (max - min) + min;
        },
        drawText: function(ctx, des, w, h) {
            if (des) {
                ctx.save();
                ctx.translate(w / 2, h / 2);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'rgba(250, 250, 250, 0.2)';
                ctx.font = '50px Aleo';
                ctx.fillText(des.year, 0, 0);

                ctx.fillStyle = '#d99c3b';
                ctx.font = '45px Aleo';
                ctx.fillText(des.days, -210, 70);
                ctx.fillText(des.hours, -70, 70);
                ctx.fillText(des.mins, 70, 70);
                ctx.fillText(des.secs, 210, 70);
                ctx.font = '15px Aleo';
                ctx.fillText('DAYS', -210, 120);
                ctx.fillText('HOURS', -70, 120);
                ctx.fillText('MINUTES', 70, 120);
                ctx.fillText('SECONDS', 210, 120);
                ctx.restore();
            }
        },
        runTime: function() {
            drawer.timer = setInterval(function() {
                console.log(drawer.des);
                var now = new Date();
                var year = now.getFullYear();
                var target = new Date();
                target.setFullYear(year + 1);
                target.setMonth(0);
                target.setDate(1);
                target.setHours(0);
                target.setMinutes(0);
                target.setSeconds(0);
                var nowTime = now.getTime();
                var targetTime = target.getTime();
                var des = targetTime - nowTime;
                drawer.des = {
                    year: year + 1,
                    days: Math.floor(des / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((des % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    mins: Math.floor((des % (1000 * 60 * 60)) / (1000 * 60)),
                    secs: Math.floor((des % (1000 * 60)) / 1000)
                };
            }, 1000);
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

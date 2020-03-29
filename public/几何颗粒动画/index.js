(function() {
    var drawer = {
        init: function() {
            this.c = this.canvas = document.getElementById('canvas');
            this.w = this.canvas.width = window.innerWidth;
            this.h = this.canvas.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.initElements();
            this.mark = drawer.getMarkCanvas();            
            this.animate();
            this.bindEvent();
        },
        bindEvent: function() {
            window.onresize = function() {
                console.log('11');
                drawer.w = drawer.canvas.width = window.innerWidth;
                drawer.h = drawer.canvas.height = window.innerHeight;
                drawer.initElements();
            };
        },
        initElements: function() {
            drawer.elements = [];
            for(var x = 0; x < this.c.width; x++) {
                for(var y = 0; y < this.c.height; y++) {
                    if(Math.round(Math.random() * 10000) == 1) {
                        var s = Math.random() * .6 + .1;
                        var index = Math.floor(Math.random() * 2);
                        if (index == 0) {
                            this.elements.push(new this.Circular(x, y, s));
                        } else {
                            this.elements.push(new this.Rect(x, y, s));
                        }
                    }
                }
            }
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            /*
            drawer.w = drawer.canvas.width = window.innerWidth;
            drawer.h = drawer.canvas.height = window.innerHeight;
            */
            drawer.elements.forEach(function(item) {
                item.update(new Date().getTime());
            });
        },
        draw: function() {
            drawer.ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.elements.forEach(function(item) {
                item.draw(drawer.ctx);
            });
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        Circular: function(x, y, s) {
            this.x = x;
            this.y = y;
            this.tx = x;
            this.ty = y;
            this.r = 12 * s;
            this.w = 5 * s
            this.update = function(t) {
                this.x = this.tx + Math.sin((50 + x + (t / 10)) / 100) * 5;
                this.y = this.ty + Math.sin((45 + x + (t / 10)) / 100) * 6;
            };
            this.draw = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = '#fff';
                ctx.translate(this.x, this.y);
                ctx.arc(0, 0, this.r, 0, 2 * Math.PI, false);
                ctx.stroke();
                ctx.restore();
            };
        },
        Rect: function(x, y, s) {
            this.x = x;
            this.y = y;
            this.tx = x;
            this.ty = y;
            this.l = 12 * s;
            this.w = 5 * s;
            this.ro = 0;
            this.update = function(t) {
                this.x = this.tx + Math.sin((50 + x + (t / 10)) / 100) * 5;
                this.y = this.ty + Math.sin((45 + x + (t / 10)) / 100) * 6;
                this.ro += 2 / this.tx 
            },
            this.draw = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = '#fff';
                ctx.translate(this.x, this.y);
                ctx.rotate(this.ro);
                ctx.strokeRect(-0.5 * this.l, -0.5 * this.l, this.l, this.l);
                ctx.restore();
            };
        },
        getMarkCanvas: function(fillStyle) {
            var markCanvas = document.createElement('canvas');
            markCanvas.width = 340;
            markCanvas.height = 100;
            var ctx = markCanvas.getContext('2d');
            
            ctx.fillStyle = fillStyle || 'rgba(250, 250, 250, 0.5)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '40px cursive';
            ctx.fillText('shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2 );
            return markCanvas;
        },
        drawMark: function(ctx, mark) {
            ctx.drawImage(mark, ctx.canvas.width - mark.width, ctx.canvas.height - mark.height);
        }
    };
    drawer.init();
})();

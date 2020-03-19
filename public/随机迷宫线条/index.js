(function() {
    var drawer = {
        option: {
            background: '#fff',
            lineColor: '#333',
            lineWidth: 2,
            step: 20
        },
        init: function() {
            drawer.c = drawer.canvas = document.getElementById('canvas');
            drawer.ctx = drawer.context = drawer.c.getContext('2d');
            drawer.markCanvas = getMarkCanvas('#048');
            drawer.draw();
            drawer.bindEvent();
        }, 
        bindEvent: function() {
            $(window).resize(function() {
                drawer.draw();
            });
            $(window).click(function() {
                drawer.draw();
            });
        },
        draw: function() {
            var w = this.c.width = window.innerWidth,
                h = this.c.height = window.innerHeight,
                ctx = this.ctx,
                step = this.option.step;
            ctx.fillStyle = this.option.background;
            ctx.fillRect(0, 0, w, h);
            ctx.lineWidth = this.option.lineWidth;
            ctx.strokeStyle = this.option.lineColor;
            for (var x = 0; x < w; x += step) {
                for (var y = 0; y < h; y += step) {
                    var choice = Math.round(Math.random());
                    ctx.moveTo(x, y + step * choice);
                    ctx.lineTo(x + step, y + step * (1 - choice));
                }
            }
            ctx.stroke();
            this.drawMark(ctx, this.markCanvas);
        },
        drawMark: function(ctx, markCanvas) {
            ctx.drawImage(markCanvas, ctx.canvas.width - markCanvas.width, ctx.canvas.height - markCanvas.height);
        }
    }

    window.onload = drawer.init();
})();

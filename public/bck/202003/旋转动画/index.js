(function() {
    var drawer = {
        init: function() {
            drawer.canvas = document.querySelector("#canvas");
            drawer.ctx = canvas.getContext("2d");
            drawer.a = 0.2;
            drawer.t = 0;
            drawer.aStep = Math.PI * 0.01;
            drawer.globalHue = 0;
            drawer.mark = drawer.getMarkCanvas();            
            drawer.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.w = drawer.canvas.width = window.innerWidth;
            drawer.h = drawer.canvas.height = window.innerHeight;
            var time = performance.now() / 60;
            drawer.a = Math.sin(2 - time * 0.0001);
            drawer.t = Math.sin(2 + time * 0.03);
            drawer.aStep = Math.PI * (0.375 + Math.sin(time * 0.001) * 0.125);
            drawer.globalHue += 10;
        },
        draw: function() {
            var ctx = drawer.ctx;
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // line
            var cx = window.innerWidth / 2;
            var cy = window.innerHeight / 2;
            var x, y, px, py;
            var radius = 0,pradius = 0;
            var totalAngle = Math.PI * 200;
            for (var theta = 0; theta < totalAngle; theta += drawer.aStep) {
                pradius = radius;
                radius = (drawer.t + Math.pow(2, Math.cos(theta * drawer.a))) * 200;
                px = x;
                py = y;
                x = cx + Math.cos(theta) * radius;
                y = cy + Math.sin(theta) * radius;

                if (theta > 0) {
                  ctx.beginPath();
                  ctx.moveTo(x, y);
                  ctx.lineTo(px, py);

                  var hue = drawer.globalHue + theta / Math.PI * 180;
                  ctx.strokeStyle = "hsl(" + hue + ", 100%, 50%)";
                  ctx.lineWidth = .5;
                  ctx.stroke();
                }

            }
            drawer.drawMark(drawer.ctx, drawer.mark);
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

(function() {
    var drawer = {
        option: {
            r: 80,
            l: 200,
            step: 10
        },
        init: function() {
            drawer.c = document.getElementById("canvas");
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ctx = drawer.c.getContext('2d');
            drawer.drawerBackground(drawer.ctx, drawer.w, drawer.h);
            drawer.particles = drawer.initParticle();
            drawer.initNodes();
            drawer.currentIndex = 0;
            drawer.mark = drawer.getMarkCanvas();            
            drawer.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        initNodes: function() {
            drawer.nodes = [];
            for (var i = 0 ; i < drawer.particles.length / 2; i++) {
                drawer.nodes.push(drawer.particles[i % drawer.particles.length]);
            }
        },
        update: function() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            for (var i = 0; i < drawer.option.step; i++) {
                drawer.currentIndex--;
                if (drawer.currentIndex < 0) {
                    drawer.currentIndex = drawer.particles.length - 1;
                }
                drawer.nodes.unshift(drawer.particles[drawer.currentIndex]);
                drawer.nodes.pop();
                
            }
        },
        draw: function() {
            var ctx = drawer.ctx;
            drawer.drawerBackground(ctx, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            ctx.fillStyle = '#fff';
            ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
            drawer.nodes.forEach(function(item) {
                ctx.beginPath();
                ctx.arc(item.x, item.y, 5, 0, 2 * Math.PI, false);
                ctx.fill();
            });
            ctx.restore();
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        drawerBackground: function(ctx, w, h) {
            var grad = ctx.createLinearGradient(0, h, w, 0);
            grad.addColorStop(0, '#d16ba5');
            grad.addColorStop(1 / 11, '#c777b9');
            grad.addColorStop(2 / 11, '#ba83ca');
            grad.addColorStop(3 / 11, '#aa8fd8');
            grad.addColorStop(4 / 11, '#9a9ae1');
            grad.addColorStop(5 / 11, '#8aa7ec');
            grad.addColorStop(6 / 11, '#79b3f4');
            grad.addColorStop(7 / 11, '#69bff8');
            grad.addColorStop(8 / 11, '#52cffe');
            grad.addColorStop(9 / 11, '#41dfff');
            grad.addColorStop(10 / 11, '#46eefa');
            grad.addColorStop(1, '#5ffbf1');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
        },
        initParticle: function() {
            var r = drawer.option.r;
            var l = drawer.option.l;
            var a = 2 * r * r / l;
            var b = Math.sqrt(a * (0.5 * l - a));
            var j = Math.acos(2 * r / l);

            var dl = 1;
            var nodes = [];
            var dlen = r * (Math.PI - j);
            for (var i = 0; i <= dlen; i += dl) {
                var de = i / r;
                nodes.push({
                    x: 0.5 * l + r * Math.cos(de),
                    y: Math.sin(de) * r
                });
            }

            var xl = 0.5 * l * Math.sin(j);
            for (var i = 0; i <= xl; i+= dl) {
                nodes.push({
                    x: Math.cos(0.5 * Math.PI - j) * (xl - i),
                    y: Math.sin(0.5 * Math.PI - j) * (xl - i)
                });
            }

            var arr = []
            for (var i = 0 ; i < nodes.length; i++) {
                arr.push({
                    x: nodes[i].x,
                    y: nodes[i].y
                });
            }
            for (var i = 0 ; i < nodes.length; i++) {
                arr.push({
                    x: -nodes[nodes.length - i - 1].x,
                    y: -nodes[nodes.length - i - 1].y
                });
            }
            for (var i = 0 ; i < nodes.length; i++) {
                arr.push({
                    x: -nodes[i].x,
                    y: nodes[i].y
                });
            }
            for (var i = 0 ; i < nodes.length; i++) {
                arr.push({
                    x: nodes[nodes.length - i - 1].x,
                    y: -nodes[nodes.length - i - 1].y
                });
            }
            return arr;
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

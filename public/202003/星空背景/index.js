(function() {
    var drawer = {
        option: {
            vx: -1,
			vy: -0.5,
			time: 15
        },
        init: function() {
            drawer.c = drawer.canvas = document.getElementById('canvas');
            drawer.w = drawer.canvas.width = window.innerWidth;
            drawer.h = drawer.canvas.height = window.innerHeight;
            drawer.ctx = drawer.context = canvas.getContext('2d');
            drawer.markCanvas = getMarkCanvas();
            drawer.count = 0;
            drawer.initBalls();

            drawer.animate();
            drawer.bindEvent();
        },
        bindEvent: function() {
            $(window).resize(function() {
                drawer.w = drawer.canvas.width = window.innerWidth;
                drawer.h = drawer.canvas.height = window.innerHeight;
            });
        },
        initBalls: function () {
            drawer.balls = [];
			for (var i = 0; i < 500; i++) {
				drawer.balls.push({
                    x: Math.random() * drawer.w * 2,
                    y: Math.random() * drawer.h,
                    r: Math.random() * 2
				});
			}
		},
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        draw: function() {
            drawer.drawBackground();
            drawer.drawMarkCanvas(drawer.markCanvas, drawer.ctx);
        },
        drawBackground: function() {
            drawer.ctx.clearRect(0, 0, drawer.w, drawer.h);

            var clg = drawer.ctx.createLinearGradient(drawer.w / 2, drawer.h, drawer.w / 2, 0);
            clg.addColorStop(0, '#001339');
            clg.addColorStop(1, '#06080E');
            drawer.ctx.fillStyle = clg;
            drawer.ctx.fillRect(0, 0, drawer.w, drawer.h);

            for (var i = 0; i < drawer.balls.length; i++) {
                drawer.ctx.beginPath();
                drawer.ctx.fillStyle = '#fff';
                drawer.ctx.arc(drawer.balls[i].x, drawer.balls[i].y, drawer.balls[i].r, 0, Math.PI * 2, false);
                drawer.ctx.fill();
            }
        },
        drawMarkCanvas: function(mark, ctx) {
            ctx.drawImage(mark, ctx.canvas.width - mark.width, ctx.canvas.height - mark.height);
        },
        update: function() {
            drawer.count++;
			if (drawer.count >= Math.abs(50 / drawer.option.vy)) {
				for (var i = 0; i < 25; i++) {
					drawer.balls.push({
							x: Math.random() * drawer.w * 2,
							y: Math.random() * 50 + drawer.h,
							r: Math.random() * 2
					});
				}
				drawer.count = 0;
			}

			for (var i = 0; i < drawer.balls.length; i++) {
				drawer.balls[i].x += drawer.option.vx;
				drawer.balls[i].y += drawer.option.vy;
			}

			var cnt = 0;
			for (var i = 0; i < drawer.balls.length; i++) {
				if (drawer.balls[i].y >= 0) {
					drawer.balls[cnt++] = drawer.balls[i];
				}
			}

			while(drawer.balls.length > cnt) {
				drawer.balls.pop();
			}
        }

    };

    drawer.init();
})();

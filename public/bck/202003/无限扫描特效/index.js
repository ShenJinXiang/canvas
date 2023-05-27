(function() {
    var drawer = {
        option: {
            background: '#111',
            rs: [90, 180, 190, 230, 237, 240, 310],
            goldColor: '185,147,98',
            outerStep: 0.1 * Math.PI / 180,
            sectorStep:  0.6 * Math.PI / 180,
            enemiesNum: 8

        },
        init: function() {
            drawer.c = drawer.canvas = document.getElementById('canvas');
            drawer.ctx = drawer.canvas.getContext('2d');
            drawer.currentOuterDeg = 0;
            drawer.currentSectorDeg = 0;
            drawer.enemies = [];
            drawer.mark = drawer.getMarkCanvas();
            drawer.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.currentOuterDeg += drawer.option.outerStep;
            drawer.currentSectorDeg += drawer.option.sectorStep;
            if (drawer.currentSectorDeg >= 2 * Math.PI) {
                drawer.currentSectorDeg = 0;
            }
            drawer.updateEnemies();
        },
        draw: function() {
            var ctx = drawer.ctx;
            drawer.w = drawer.canvas.width = window.innerWidth;
            drawer.h = drawer.canvas.height = window.innerHeight;
            ctx.fillStyle = drawer.option.background;
            ctx.fillRect(0, 0, drawer.w, drawer.h);

            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            drawer.drawCoordinatesLines(ctx, drawer.w, drawer.h);
            drawer.drawStaticLines(ctx, drawer.option.rs);
            drawer.drawOuterLines(ctx, drawer.option.rs[6], drawer.currentOuterDeg);
            drawer.drawSector(ctx, 0, 0, drawer.option.rs[2], -drawer.currentSectorDeg, 2 * Math.PI / 3);
            drawer.drawEnemies();
            ctx.restore();
            drawer.drawMessage(drawer.ctx, drawer.message);
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        drawSector: function(ctx, x, y, r, deg, ldeg) {
            var d = ldeg * 180 / Math.PI;
            for (var i = 0; i < d; i++) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(deg + i * Math.PI / 180);
                ctx.fillStyle = drawer.goldColor(0.7 - i / d);
                // ctx.fillStyle = drawer.goldColor(1);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(r, 0);
                ctx.arc(0, 0, r, 0, Math.PI / 180)
                ctx.closePath();
                ctx.fill();
                //ctx.stroke();
                ctx.restore();
            }
        },
        drawCoordinatesLines: function(ctx, w, h) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = drawer.goldColor(.1);
            ctx.moveTo(0, -h / 2);
            ctx.lineTo(0, h / 2);
            ctx.moveTo(-w / 2, 0);
            ctx.lineTo(w / 2, 0);
            ctx.stroke();

        },
        drawStaticLines: function(ctx, rs) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = drawer.goldColor(1);
            ctx.beginPath();
            drawer.drawDashArc(ctx, 0, 0, rs[0], 0, 2 *Math.PI, 2, 2);
            ctx.stroke();

            ctx.strokeStyle = drawer.goldColor(1);
            ctx.beginPath();
            ctx.arc(0, 0, rs[1], 0, 2 * Math.PI, false);
            ctx.stroke();

            drawer.drawScaleLines(ctx, 0, 0, rs[3], rs[4], rs[5], 8, 120);
        },
        drawScaleLines: function(ctx, x, y, r1, r2, r3, n1, n2) {
            ctx.save();
            ctx.translate(x, y);
            var degStep1 = 2 * Math.PI / n1;
            var degStep2 = 2 * Math.PI / n2;
            for (var i = 0; i < n1; i++) {
                var deg = i * degStep1;
                ctx.save();
                ctx.rotate(deg);
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(r1, 0);
                ctx.lineTo(r3, 0);
                ctx.stroke();
                ctx.restore();
            }
            for (var i = 0; i < n2; i++) {
                var deg = i * degStep2;
                ctx.save();
                ctx.rotate(deg);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(r1, 0);
                ctx.lineTo(r2, 0);
                ctx.stroke();
                ctx.restore();
            }
            ctx.restore();
        },
        drawDashArc: function(ctx, x, y, r, bDeg, eDeg, sl, dl) {
            ctx.save();
            ctx.translate(x, y);
            var sDeg = sl / r;
            var dDeg = dl / r;
            var deg = bDeg;
            while(deg < eDeg) {
                ctx.beginPath();
                ctx.arc(0, 0, r, deg, deg + sDeg, false);
                deg += (sDeg + dDeg);
                ctx.stroke();
            }
            ctx.restore();
        },
        drawOuterLines: function(ctx, r, deg) {
            ctx.save();
            ctx.rotate(deg);
            ctx.lineWidth = 2;
            ctx.strokeStyle = drawer.goldColor(1);

            ctx.beginPath();
            ctx.arc(0, 0, r, -Math.PI / 2 + deg, deg, false);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, r, Math.PI / 2 + deg, Math.PI + deg, false);
            ctx.stroke();

            ctx.restore();
        },
        drawMessage: function(ctx, msg) {
            if (!msg) {
                return;
            }
            ctx.fillStyle = '#b99362';
            ctx.textAlign = 'start';
            ctx.textBaseline = 'bottom';
            ctx.font = '20px Abel';
            ctx.fillText(msg, 10, drawer.h - 10);
        },
        Enemy: function(R, deg, ldeg) {
            this.ro = 2 * Math.PI * Math.random();
            this.dro = this.ro * 180 / Math.PI;
            this.l = R * Math.random();
            this.x = this.l * Math.cos(this.ro);
            this.y = this.l * Math.sin(-this.ro);
            this.cs = 0;
            this.step = 1;
            this.r = 8;
            this.maxR = 200;
            this.draw = function(ctx) {
                if (this.cs != 1) {
                    return;
                }
                ctx.save();
                ctx.translate(this.x, this.y);

                ctx.fillStyle = drawer.goldColor(0.5);
                ctx.save();
                ctx.rotate(Math.PI / 4);
                ctx.fillRect(-8, -2, 16, 4);
                ctx.fillRect(-2, -8, 4, 16);
                ctx.restore();

                ctx.fillStyle = drawer.goldColor(1);
                ctx.beginPath();
                ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
                ctx.fill();

                ctx.strokeStyle = drawer.goldColor(1 - this.r / this.maxR);
                ctx.beginPath();
                ctx.arc(0, 0, this.r, 0, 2 * Math.PI, false);
                ctx.stroke();

                ctx.restore();
            };
        },
        createEnemies: function() {
            var len = drawer.enemies.length;
            for (var i = 0; i < drawer.option.enemiesNum - len; i++) {
                drawer.enemies.push(new drawer.Enemy(drawer.option.rs[1], drawer.currentSectorDeg, 0.75 * Math.PI));
            }
        },
        drawEnemies: function() {
            drawer.enemies.forEach(function(item) {
                item.draw(drawer.ctx);
            });
        },
        updateEnemies: function() {
            var current = drawer.currentSectorDeg * 180 / Math.PI;
            drawer.createEnemies();
            drawer.enemies.forEach(function(item) {
                if (item.cs == 0) {
                    if (Math.abs(item.dro - current) <= 1) {
                        item.cs = 1;
                        drawer.message = "Detected: " + item.l.toFixed(3) + " at " + item.dro.toFixed(3);
                    }
                } else if (item.cs == 1) {
                    item.r += item.step;
                    if (item.r >= item.maxR) {
                        item.cs = -1;
                    }
                }
            });
            drawer.enemies = drawer.enemies.filter(function(item) {
                return item.cs != -1;
            });
        },
        goldColor: function(op) {
            return 'rgba(' + drawer.option.goldColor + ', ' + op + ')';
        },
        getMarkCanvas: function(fillStyle) {
            var markCanvas = document.createElement('canvas');
            markCanvas.width = 340;
            markCanvas.height = 100;
            var ctx = markCanvas.getContext('2d');
            
            ctx.fillStyle = fillStyle || 'rgba(204, 204, 204, 0.5)';
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

(function() {
    let drawer = {
        option: {
            // 星星数量
            startNum: 400,
            // 星星半径
            maxStartRadius: 1,
            // 烟花数量
            maxFireNum: 20,
            // 新增烟花的概率
            cretefireword: 0.05,
            // 烟花半径
            fireRadius: 3,
            // 烟花尾迹长度
            fireTrailLen: 20,
            // 烟花距离边界最近距离
            firePadding: 40,
            // 烟花速度
            minFireStrength: 6,
            maxFireStrength: 10,
            // 烟花粒子半径
            particleRadius: 1,
            // 烟花粒子持续时间
            particleLifeTime: 150,
            // 烟花粒子尾迹长度
            particleTrailLen: 15,
            // 烟花粒子数量
            minParticleNum: 9,
            maxParticleNum: 30,
            // 烟花粒子速度
            minStrength: 1.75,
            maxStrength: 7,
            // 加速度
            g: 5e-2,
            a: 1e-3
        },
        init: function() {
            this.c = this.canvas = document.getElementById('canvas');
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.fireWords = [];
            this.createStarts();
            this.animate();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.starts.forEach(item => item.update());

            drawer.refreshFireWord();
            drawer.fireWords.forEach(item => item.update());
        },
        draw: function() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            drawer.starts.forEach(item => item.draw(ctx));
            drawer.fireWords.forEach(item => item.draw(ctx));
        },
        createStarts: function() {
            drawer.starts = [];
            for (let i = 0; i < drawer.option.startNum; i++) {
                let x = drawer.w * Math.random(),
                    y = drawer.h * Math.random(),
                    r = drawer.option.maxStartRadius * Math.random(),
                    alpha = Math.random();
                drawer.starts.push(new drawer.Start(x, y, r, alpha));
            }
        },
        Start: function(x, y, r, alpha) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.alpha = alpha;
            this.flag = Math.random() < 0/5 ? 1 : -1;
            this.update = function() {
                this.alpha += this.flag * (Math.random() * 0.04);
                if (this.alpha > 1 || this.alpha < 0) {
                    this.flag = - this.flag;
                    if (this.alpha > 1) {
                        this.alpha = 1;
                    }
                    if (this.alpha < 0) {
                        this.alpha = 0;
                    }
                }
            };
            this.draw = function(ctx) {
                ctx.save();
                ctx.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
            };
        },
        refreshFireWord: function() {
            drawer.fireWords = drawer.fireWords.filter(item => item.status > -1);
            if (drawer.fireWords.length < drawer.option.maxFireNum) {
                if (Math.random() < drawer.option.cretefireword) {
                    drawer.fireWords.push(
                        new drawer.FireWord(
                            drawer.random(drawer.option.firePadding, drawer.w - drawer.option.firePadding),
                            drawer.h,
                            drawer.random(-1 , 1),
                            drawer.random(-drawer.option.maxFireStrength, -drawer.option.minFireStrength),
                            drawer.random(-drawer.option.a, drawer.option.a),
                            drawer.option.g
                        )
                    );
                }
            }
        },
        Particle: function(x, y, vx, vy, ax, ay, color) {
            this.x = x;
            this.y = y;
            this.r = drawer.option.particleRadius;
            this.vx = vx;
            this.vy = vy;
            this.ax = ax;
            this.ay = ay;
            this.color = color;
            this.path = [];
            this.lifetime = ~~drawer.option.particleLifeTime;
            this.update = function() {
                if (this.path.length > drawer.option.particleTrailLen) {
                    this.path.shift();
                }
                this.path.push(new drawer.Point(this.x, this.y));
                this.x += this.vx;
                this.y += this.vy;
                this.vx += this.ax;
                this.vy += this.ay;
                this.lifetime--;
            };
            this.draw = function(ctx) {
                let alpha = this.lifetime / drawer.option.particleLifeTime;
                ctx.save();
                ctx.fillStyle = 'rgba(' + this.color + (alpha * 0.5) + ')';
                if (this.lifetime > drawer.option.particleLifeTime * 0.95 ) {
                    ctx.fillStyle = '#fff';
                }
                ctx.beginPath();
                ctx.moveTo(this.x - this.r, this.y);
                ctx.lineTo(this.path[0].x, this.path[0].y);
                ctx.lineTo(this.x + this.r, this.y);
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                ctx.save();
                ctx.fillStyle = 'rgba(' + this.color + alpha + ')';
                if (this.lifetime > drawer.option.particleLifeTime * 0.95 ) {
                    ctx.fillStyle = '#fff';
                }
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
            }
        },
        FireWord: function(x, y, vx, vy, ax, ay) {
            this.x = x;
            this.y = y;
            this.r = drawer.option.fireRadius;
            this.vx = vx;
            this.vy = vy;
            this.ax = ax;
            this.ay = ay;
            this.color =
                ~~ (Math.random() * 255) +
                ", " +
                ~~ (Math.random() * 255) +
                ", " +
                ~~ (Math.random() * 255) +
                ", ";
            this.status = 1;
            this.path = [];
            this.update = function() {
                if (this.status == 1) {
                    if (this.path.length > drawer.option.fireTrailLen) {
                        this.path.shift();
                    }
                    this.path.push(new drawer.Point(this.x, this.y));
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vx += this.ax;
                    this.vy += this.ay;
                    if (this.vy > 0 ||
                        this.x < drawer.option.firePadding ||
                        this.x > drawer.w - drawer.option.firePadding ||
                        this.y < drawer.option.firePadding) {
                        this.status = 2;
                        // this.status = -1;
                        let strength = drawer.random(drawer.option.minStrength, drawer.option.maxStrength),
                            num = drawer.random(drawer.option.minParticleNum, drawer.option.maxParticleNum);
                        this.particles = (function(x, y, s, n, c) {
                            let p = [],
                                step = 2 * Math.PI / n,
                                ax = drawer.option.a,
                                ay = drawer.option.g;
                            for (let i = 0; i < n; i++) {
                                let angle = i * step;
                                p.push(new drawer.Particle( x, y, s * Math.cos(angle), s * Math.sin(angle), ax, ay, c));
                            }
                            return p;
                        })(this.x, this.y, strength, num, this.color);
                        this.lifetime = drawer.option.particleLifeTime;
                        this.particles.forEach(item => item.update());
                    }
                } else if (this.status == 2) {
                    this.particles.forEach(item => item.update());
                    this.lifetime--;
                    if (this.lifetime <= 0) {
                        this.status = -1;
                    }
                }
            };
            this.draw = function(ctx) {
                if (this.status == 1) {
                    ctx.save();
                    ctx.fillStyle = 'rgba(' + this.color + '0.5)';
                    ctx.beginPath();
                    ctx.moveTo(this.x - this.r, this.y);
                    ctx.lineTo(this.path[0].x, this.path[0].y);
                    ctx.lineTo(this.x + this.r, this.y);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();

                    ctx.save();
                    ctx.fillStyle = 'rgba(' + this.color + '1)';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.restore();
                } else if (this.status == 2) {
                    this.particles.forEach(item => item.draw(ctx));
                }
            };
        },
        Point: function(x, y) {
            this.x = x;
            this.y = y;
        },
        random(min, max) {
            return Math.random() * (max - min) + min;
        }
    };
    drawer.init();
})();

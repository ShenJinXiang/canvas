(function() {

    var drawer = {
        option: {
            counts: [100, 5, 30, 5],
            els: [
                {val: 5, color: 'hsla(4, 73%, 62%, 1)', shadowColor: 'hsla(4, 83%, 92%, 1)'},
                {val: 9, color: 'hsla(1, 44%, 46%, 1)', shadowColor: 'hsla(1, 54%, 86%, 1)'},
                {val: 13, color: 'hsla(208, 56%, 46%, 1)', shadowColor: 'hsla(208, 76%, 66%, 1)'},
                {val: 17, color: 'hsla(200, 49%, 38%, 1)', shadowColor: 'hsla(200, 59%, 78%, 1)'},
                {val: 21, color: 'hsla(197, 98%, 43%, 1)', shadowColor: 'hsla(197, 100%, 73%, 0.8)'},
                {val: 25, color: 'hsla(121, 33%, 35%, 1)', shadowColor: 'hsla(121, 43%, 55%, 0.8)'},
                {val: 29, color: 'hsla(38, 40%, 39%, 1)', shadowColor: 'hsla(38, 50%, 59%, 0.8)'},
                {val: 33, color: 'hsla(36, 100%, 50%, 1)', shadowColor: 'hsla(36, 100%, 70%, 0.8)'},
                {val: 37, color: 'hsla(27, 100%, 60%, 1)', shadowColor: 'hsla(27, 100%, 80%, 0.8)'},
                {val: 41, color: 'hsla(24, 100%, 50%, 1)', shadowColor: 'hsla(24, 100%, 80%, 0.8)'}
            ],
            background: '#35394e',
            space: 100 
        },
        init: function(title, call) {
            this.c = this.canvas = document.getElementById('canvas');
            this.w = this.c.width = drawer.getWidth();
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.call = call;
            this.title = title;
            this.mark = drawer.getMarkCanvas();            
            this.start();
            this.bindEvent();
            this.animate();
        },
        bindEvent: function() {
            window.onresize = function() {
                drawer.w = drawer.c.width = drawer.getWidth();
                drawer.h = drawer.c.height = window.innerHeight;
                drawer.elements.forEach(function(item, index) {
                    item.sx = drawer.getXByIndex(index);
                    item.sy = drawer.c.height / 2;
                });
            };
        },
        start: function() {
            drawer.initElements();
            drawer.currentStatus = 0;
            drawer.count = 0;
            drawer.plans = [];
            drawer.plans.push(new drawer.Plan(0));
            drawer.algorithm();
            drawer.plans.push(new drawer.Plan(0))
            drawer.currentPlan = drawer.plans.shift();
        },
        algorithm: function() {
            var arr = [];
            drawer.elements.forEach(function(item) {
                arr.push(item.val);
            });
            drawer.call(arr);
        },
        swap: function(index, jndex) {
            drawer.plans.push(new drawer.Plan(1, index, jndex));
            drawer.plans.push(new drawer.Plan(2, index, jndex));
            drawer.plans.push(new drawer.Plan(3, index, jndex));
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            drawer.count++;
            if (drawer.count > drawer.currentPlan.count) {
                drawer.currentPlan = drawer.plans.shift();
                drawer.count = 0;
                if (!drawer.currentPlan) {
                    drawer.start();
                }
            }
            drawer.currentPlan.update();
        },
        draw: function() {
            var ctx = drawer.ctx;
            ctx.fillStyle = drawer.option.background;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            //drawer.drawTitle(drawer.ctx, drawer.title);
            drawer.currentPlan.draw();
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        drawTitle: function(ctx, title) {
            ctx.save();
            ctx.fillStyle = 'rgba(250, 250, 250, 0.5)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '30px cursive';
            ctx.fillText(title, drawer.w / 2, 40 );
            ctx.restore();
        },
        initElements: function() {
            var es = drawer.option.els,
            len = es.length;
            drawer.elements = [];
            var tempIndexs = [];
            for (var i = 0; i < len; i++) {
                var el;
                while(true) {
                    index = Math.floor(Math.random() * len);
                    if (tempIndexs.indexOf(index) < 0) {
                        tempIndexs.push(index);
                        break;
                    }
                }
                drawer.elements.push(new drawer.Element(es[index].val, i, es[index].color, es[index].shadowColor));
            }
        },
        Element: function(val, index, color, shadowColor) {
            this.val = val;
            this.r = val2r(val);
            this.sx = drawer.getXByIndex(index);
            this.sy = drawer.c.height / 2;
            this.color = color;
            this.shadowColor = shadowColor;
            this.active = false;
            this.update = function() {
            };
            this.draw = function(ctx, currentStatus) {
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.fillStyle = this.color;
                if (!this.active) {
                    ctx.arc(this.sx, this.sy, this.r, 0, 2 * Math.PI, false);
                } else {
                    ctx.shadowColor = this.shadowColor;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = this.r * 0.4;
                    ctx.arc(this.ax, this.ay, this.r, 0, 2 * Math.PI, false);
                }
                ctx.fill();
                ctx.restore();
            }
            function val2r(val) {
                return val;
            }
        },
        getXByIndex: function(index) {
            var space = drawer.option.space,
                num = drawer.option.els.length,
                w = drawer.w;
            return 0.5 * w - 0.5 * (num -1) * space + index * space;
        },
        Plan: function(planStatus, index, jndex) {
            var thisPlan = this;
            this['status'] = planStatus;
            this.count = drawer.option.counts[planStatus];
            if (index || jndex) {
                this.isSwap = true;
                this.i = index;
                this.j = jndex;
            } else {
                this.isSwap = false;
            }
            if (this['status'] == 2) {
                this.roStep = Math.PI / this.count;
            }
            this.update = function() {
                drawer.elements.forEach(function(item, index, arr) {
                    if (thisPlan.isSwap) {
                        item.active = (index == thisPlan.i || index == thisPlan.j);
                    } else {
                        item.active = false;
                    }
                });

                if (this.isSwap) {
                    if (this['status'] == 1 || this['status'] == 3) {
                        this.ro = 0;
                        if (this['status'] == 3 && drawer.count == 0) {
                            var temp = drawer.elements[this.i];
                            drawer.elements[this.i] = drawer.elements[this.j];
                            drawer.elements[this.j] = temp;
                            drawer.elements[this.i].sx = drawer.getXByIndex(this.i);
                            drawer.elements[this.j].sx = drawer.getXByIndex(this.j);
                        }
                    } else if (this['status'] == 2) {
                        this.ro = drawer.count * this.roStep;
                    }
                    this.mx = (drawer.elements[this.i].sx + drawer.elements[this.j].sx) / 2;
                    this.my = (drawer.elements[this.i].sy + drawer.elements[this.j].sy) / 2;
                    drawer.elements[this.i].ax = drawer.elements[this.i].sx - this.mx;
                    drawer.elements[this.i].ay = drawer.elements[this.i].sy - this.my;
                    drawer.elements[this.j].ax = drawer.elements[this.j].sx - this.mx;
                    drawer.elements[this.j].ay = drawer.elements[this.j].sy - this.my;
                }
            };
            this.draw = function() {
                var ctx = drawer.ctx;
                if (this.isSwap) {
                    ctx.save();
                    ctx.translate(this.mx, this.my);
                    ctx.rotate(this.ro);
                    drawer.elements[this.i].draw(ctx, this['status']);
                    drawer.elements[this.j].draw(ctx, this['status']);
                    ctx.restore();
                }
                drawer.elements.forEach(function(item) {
                    if (!item.active) {
                        item.draw(ctx, thisPlan['status']);
                    } 
                });
            };
        },
        getWidth: function() {
            return window.innerWidth <= 1100? 1100 : window.innerWidth;
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

    window.drawer = drawer;

})();

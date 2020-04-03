(function() {

    var drawer = {
        option: {
            counts: [100, 200, 300, 400],
            nums: [5, 10, 15, 20, 25, 30, 35, 40],
            background: '#333',
            fillStyle: '#084',
            space: 100 
        },
        init: function() {
            this.c = this.canvas = document.getElementById('canvas');
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.start();
            this.animate();
        },
        start: function() {
            drawer.initElements();
            drawer.currentStatus = 0;
            drawer.count = 0;
            drawer.plans = [];
            //drawer.plans.push(new drawer.Plan(0));
            //drawer.algorithm();
            //drawer.plans.push(new drawer.Plan(1, 2, 3));
            drawer.addGroupPlan(2, 3);
            //console.log(drawer.plans);
            drawer.currentPlan = drawer.plans.shift();
            
        },
        algorithm: function() {
            var arr = [];
            drawer.elements.forEach(function(item) {
                arr.push(item.val);
            });
            //console.log(drawer.elements);
            //console.log(arr);
            var len = arr.length;
            for (var i = 0; i < len - 1; i++) {
                for (var j = 0; j < len - 1 - i; j++) {
                    if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                        var temp = arr[j+1];        // 元素交换
                        arr[j+1] = arr[j];
                        arr[j] = temp;
                        drawer.addGroupPlan(j, j + 1);
                    }
                }
            }
        },
        addGroupPlan: function(index, jndex) {
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
            //console.log(drawer.currentPlan);
            //console.log('status:', drawer.currentPlan['status'], 'cnt:', drawer.count);
            drawer.currentPlan.update();
            drawer.count++;
            if (drawer.count > drawer.currentPlan.count) {
                drawer.currentPlan = drawer.plans.shift();
                drawer.count = 0;
                if (!drawer.currentPlan) {
                    drawer.start();
                }
            }
        },
        draw: function() {
            var ctx = drawer.ctx;
            ctx.fillStyle = drawer.option.background;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            drawer.currentPlan.draw();
        },
        initElements: function() {
            var nums = drawer.option.nums,
                color = drawer.option.fillStyle,
                num = nums.length;
            drawer.elements = [];
            drawer.tempVals = [];
            for (var i = 0; i < num; i++) {
                var val;
                while(true) {
                    val = nums[Math.floor(Math.random() * num)];
                    if (drawer.tempVals.indexOf(val) < 0) {
                        drawer.tempVals.push(val);
                        break;
                    }
                }
                drawer.elements.push(new drawer.Element(val, i, color));
            }
        },
        Element: function(val, index, color) {
            this.val = val;
            this.r = val2r(val);
            this.sx = drawer.getXByIndex(index);
            this.sy = drawer.c.height / 2;
            this.color = color;
            this.active = false;
            this.update = function() {
            };
            this.draw = function(ctx, currentStatus) {
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.beginPath();
                if (!this.active) {
                    ctx.arc(this.sx, this.sy, this.r, 0, 2 * Math.PI, false);
                } else {
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
                num = drawer.option.nums.length,
                w = drawer.w;
            return 0.5 * w - 0.5 * (num -1) * space + index * space;
        },
        Plan: function(planStatus, index, jndex) {
            var thisPlan = this;
            this['status'] = planStatus;
            this.count = drawer.option.counts[planStatus];
            if (index || jndex) {
                this.swap = true;
                this.i = index;
                this.j = jndex;
                this.mx = (drawer.elements[this.i].sx + drawer.elements[this.j].sx) / 2;
                this.my = (drawer.elements[this.i].sy + drawer.elements[this.j].sy) / 2;
            } else {
                this.swap = false;
            }
            if (this['status'] == 2) {
                this.roStep = Math.PI / this.count;
            }
            this.update = function() {
                drawer.elements.forEach(function(item, index, arr) {
                    if (thisPlan.swap) {
                        item.active = (index == thisPlan.i || index == thisPlan.j);
                    } else {
                        item.active = false;
                    }
                });

                if (this.swap) {
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
                    drawer.elements[this.i].ax = drawer.elements[this.i].sx - this.mx;
                    drawer.elements[this.i].ay = drawer.elements[this.i].sy - this.my;
                    drawer.elements[this.j].ax = drawer.elements[this.j].sx - this.mx;
                    drawer.elements[this.j].ay = drawer.elements[this.j].sy - this.my;
                }
            };
            this.draw = function() {
                var ctx = drawer.ctx;
                if (this.swap) {
                    console.log(this.ro);
                    ctx.save();
                    ctx.translate(this.mx, this.my);
                    ctx.rotate(this.ro);
                    ctx.beginPath();
                    ctx.arc(drawer.elements[this.i].ax, drawer.elements[this.i].ay, 1.1 * drawer.elements[this.i].r, 0, 2 * Math.PI, false);
                    ctx.arc(drawer.elements[this.j].ax, drawer.elements[this.j].ay, 1.1 * drawer.elements[this.j].r, 0, 2 * Math.PI, true);
                    ctx.stroke();
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
        }

    };
    drawer.init();
})();

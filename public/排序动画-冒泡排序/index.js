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
            drawer.plans.push(new drawer.Plan(0));
            drawer.plans.push(new drawer.Plan(1));
            drawer.plans.push(new drawer.Plan(2));
            drawer.plans.push(new drawer.Plan(3));
            drawer.currentPlan = drawer.plans.shift();
        },
        animate: function() {
            drawer.update();
            drawer.draw();
            requestAnimationFrame(drawer.animate);
        },
        update: function() {
            console.log(drawer.currentPlan);
            console.log('status:', drawer.currentPlan['status'], 'cnt:', drawer.count);
            drawer.count++;
            if (drawer.count >= drawer.currentPlan.count) {
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
            drawer.elements.forEach(function(item) {
                item.draw(ctx, drawer.currentStatus);
            });
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
            this.index = index;
            this.sx = drawer.getXByIndex(this.index);
            this.sy = drawer.c.height / 2;
            this.color = color;
            this.update = function() {
            };
            this.draw = function(ctx, currentStatus) {
                if (currentStatus == 0) {
                    ctx.save();
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.sx, this.sy, this.r, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.restore();
                }
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
        Plan: function(planStatus, ele1, ele2) {
            this['status'] = planStatus;
            this.ele1 = ele1;
            this.ele2 = ele2;
            this.count = drawer.option.counts[planStatus];
        }

    };
    drawer.init();
})();

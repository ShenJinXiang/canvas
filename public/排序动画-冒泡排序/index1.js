(function() {

    var drawer = {
        option: {
            counts: [100, 5, 30, 5],

            els: [
                {val: 30, color: 'hsla(4, 73%, 62%, 1)'},
                {val: 30, color: 'hsla(1, 44%, 46%, 1)'},
                {val: 30, color: 'hsla(208, 56%, 46%, 1)'},
                {val: 30, color: 'hsla(200, 49%, 38%, 1)'},
                {val: 30, color: 'hsla(197, 98%, 43%, 1)'},
                {val: 30, color: 'hsla(121, 33%, 35%, 1)'},
                {val: 30, color: 'hsla(38, 40%, 39%, 1)'},
                {val: 30, color: 'hsla(36, 100%, 50%, 1)'},
                {val: 30, color: 'hsla(27, 100%, 60%, 1)'},
                {val: 30, color: 'hsla(24, 100%, 50%, 1)'}
            ],
            els1: [
                {val: 30, color: 'hsla(4, 73%, 62%, 1)', shadowColor: 'hsla(4, 83%, 82%, 1)'},
                {val: 30, color: 'hsla(1, 44%, 46%, 1)', shadowColor: 'hsla(1, 54%, 66%, 1)'},
                {val: 30, color: 'hsla(208, 56%, 46%, 1)', shadowColor: 'hsla(208, 56%, 66%, 1)'},
                {val: 30, color: 'hsla(200, 49%, 38%, 1)', shadowColor: 'hsla(200, 59%, 58%, 1)'},
                {val: 30, color: 'hsla(197, 98%, 43%, 1)', shadowColor: 'hsla(197, 100%, 63%, 0.8)'},
                {val: 30, color: 'hsla(121, 33%, 35%, 1)', shadowColor: 'hsla(121, 43%, 55%, 0.8)'},
                {val: 30, color: 'hsla(38, 40%, 39%, 1)', shadowColor: 'hsla(38, 50%, 59%, 0.8)'},
                {val: 30, color: 'hsla(36, 100%, 50%, 1)', shadowColor: 'hsla(36, 100%, 70%, 0.8)'},
                {val: 30, color: 'hsla(27, 100%, 60%, 1)', shadowColor: 'hsla(27, 100%, 80%, 0.8)'},
                {val: 30, color: 'hsla(24, 100%, 50%, 1)', shadowColor: 'hsla(24, 100%, 80%, 0.8)'}
            ],
            background: '#35394e',
            fillStyle: '#084',
            activeColor: '#048',
            space: 100 
        },
        init: function() {
            this.c = this.canvas = document.getElementById('canvas');
            this.w = this.c.width = window.innerWidth;
            this.h = this.c.height = window.innerHeight;
            this.ctx = this.c.getContext('2d');
            this.initElements();
            this.initElement1s();
            this.draw();
        },
        initElements: function() {
            drawer.elements = [];
            var es = drawer.option.els;
            for(var i = 0; i < es.length; i++) {
                drawer.elements.push(new drawer.Element(es[i].val, i, es[i].color));
            }
        },
        initElement1s: function() {
            drawer.element1s = [];
            var es = drawer.option.els1;
            for(var i = 0; i < es.length; i++) {
                drawer.element1s.push(new drawer.Element1(es[i].val, i, es[i].color, es[i].shadowColor));
            }
        },
        draw: function() {
            var ctx = drawer.ctx;
            ctx.fillStyle = drawer.option.background;
            //ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            drawer.elements.forEach(function(item) {
                item.draw(ctx);
            });
            drawer.element1s.forEach(function(item) {
                item.draw(ctx);
            });
        },
        Element: function(val, index, color) {
            this.val = val;
            this.r = val;
            this.sx = drawer.getXByIndex(index);
            this.sy = drawer.c.height / 3;
            this.color = color;
            this.draw = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.sx, this.sy, this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
            }
        },
        Element1: function(val, index, color, shadowColor) {
            this.val = val;
            this.r = val;
            this.sx = drawer.getXByIndex(index);
            this.sy = 2 * drawer.c.height / 3;
            this.color = color;
            this.shadowColor = shadowColor;
            this.draw = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.shadowColor = this.shadowColor;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 15;
                ctx.fillStyle = this.color;
                ctx.arc(this.sx, this.sy, this.r, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.restore();
            }
        },
        getXByIndex: function(index) {
            var space = drawer.option.space,
                num = drawer.option.els.length,
                w = drawer.w;
            return 0.5 * w - 0.5 * (num -1) * space + index * space;
        }
    };
    drawer.init();
})();


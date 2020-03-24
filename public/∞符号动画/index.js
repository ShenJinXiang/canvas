(function() {
    var drawer = {
        option: {
        },
        init: function() {
            drawer.c = document.getElementById("canvas");
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ctx = drawer.c.getContext('2d');
            drawer.drawerBackground(drawer.ctx, drawer.w, drawer.h);
        },
        draw: function() {
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
        }
    };
    drawer.init();
})();

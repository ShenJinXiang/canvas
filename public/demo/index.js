{

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.draw();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ox = drawer.w / 2;
            drawer.oy = drawer.y / 2;
        },
        draw() {
            let ctx = drawer.ctx;
            ctx.save();
            ctx.translate(drawer.ox, drawer.oy);
            ctx.restore();
        }
    };
}

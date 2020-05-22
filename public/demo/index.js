(() => {
    const option = {

    };

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();

            // CanvasUtil.strokeHeart(drawer.ctx, drawer.w / 2, drawer.h / 2, drawer.radius, 2, '#f00');
            CanvasUtil.fillHeart(drawer.ctx, drawer.w / 2, drawer.h / 2, drawer.radius, '#f00');
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = drawer.width * 0.025;
        },

    };
    drawer.start();
})();

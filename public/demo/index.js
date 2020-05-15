(() => {
    const option = {
        sColor: 'rgba(255, 255, 255, 0.5)',
        ballRadius: 10,
        ballColor: '#084',
        angleStep: Math.PI / 90,
    };
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');

            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = 0.45 * drawer.width;
            drawer.ballRadius = 0.01 * drawer.width;


        },
    };

    drawer.start();
    drawer.bindEvent();
})();

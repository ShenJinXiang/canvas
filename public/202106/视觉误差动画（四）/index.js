{
    const option = {
        
    };
    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#fff');
            drawer.current = 0;
            drawer.init();
            drawer.animate();
        },
        init() {

        },
        animate() {
            drawer.draw();
            drawer.update();
            requestAnimationFrame(drawer.animate);
        },
        draw() {

        },
        update() {

        }
    };

    drawer.start();
}

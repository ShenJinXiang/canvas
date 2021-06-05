{
    const option = {
        backgroundColor: '#000',
        ellipseMajor: 0.4,
        ellipseMinor: 0.25,
        pointsLength: 50,
        linePointsLength: 1000,
        speed: 40,
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.init();
            drawer.animate();
        },
    };
}

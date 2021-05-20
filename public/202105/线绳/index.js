{
    const option = {
        radius: 0.45,
        backgroundColor: '#000',
        endpointRadius: 3,
        endpointColor: '#fff',
        startAngle: -Math.PI / 2,
        endpointTimeInterval: 5,
        lineTimeInterval: 5,
        lineGroupTimeInterval: 10,
        taskTimeInterval: 20,
        lineWidth: 1,
        taskEndpointNums: [5, 6, 7, 11, 17, 23, 29, 37, 43, 47, 101]
    };

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#fff');
            drawer.initSize();
        },
        initSize() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = drawer.width * option.radius;
        }
    };

    drawer.start();
}

{
    const option = {
        angleRange: 1.6 * Math.PI, // 角度范围
        maxVal: 160,                // 最大值
        stepNum: 8,                 // 段数
        width: 400,                 // 最大尺寸

    };

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.init();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
        }
    }

    drawer.start();
}
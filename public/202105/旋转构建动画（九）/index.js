{
    const option = {
        radius: 0.4,
        scaleOuter: 0.38,
        largeScale: 0.35,
        smallScale: 0.37,
        scaleWidth: 1,
        largeScaleWidth: 2,
        hourHandLen: 0.22, // 时针长度
        hourHandWid: 2,    // 时针宽度
        minuteHandLen: 0.34, // 分针长度
        minuteHandWid: 1,    // 分针宽度
        hourHandNums: [2, 3, 4, 6, 12, 24],
        minuteHandNum: 120,
        backgroundColor: '#000',
        scaleColor: '#ccc',
        hourHandColor: '#fff',
        minuteHandColor: '#F00'
    };

    class Element {
        constructor(sPoint, ePoint, color, lineWidth) {
            this.sPoint = sPoint;
            this.ePoint = ePoint;
            this.color = color
            this.lineWidth = lineWidth;
        }
        draw(ctx) {
            ctx.save();
            ctx.beginPath()
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.sPoint.x, this.sPoint.y);
            ctx.lineTo(this.ePoint.x, this.ePoint.y);
            ctx.stroke();
            ctx.restore();
        }
    }

    class Task {
        constructor(ctx, hourNum, minuteNum, color) {
            this.hourNum = hourNum;
            this.minuteNum = minuteNum;
            this.color = color;
        }
        init() {

        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.initSize();
            drawer.initTasks();
            drawer.animate();
        },
        initSize() {
            drawer.size = {};
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.size.radius = Math.min(drawer.w, drawer.h) * option.radius;
        },
        initTasks() {

        },
        animate() {

        }
    };
}

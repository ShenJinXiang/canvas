{
    const option = {
        radius: 0.4,
        scaleOuter: 0.38,
        largeScale: 0.35,
        smallScale: 0.37,
        scaleWidth: 1,
        largeScaleWidth: 2,
        hourHandLen: 0.22, // 时针长度
        hourHandEndLen: 0.02, // 时针长度
        hourHandWid: 2,    // 时针宽度
        minuteHandLen: 0.34, // 分针长度
        minuteHandEndLen: 0.34, // 分针长度
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
        constructor(ctx, option, hourNum, minuteNum, color) {
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
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.option = {
                radius: drawer.width * option.radius,
                scaleOuter: drawer.width * option.scaleOuter,
                largeScale: drawer.width * option.largeScale,
                smallScale: drawer.width * option.smallScale,
                scaleWidth: option.scaleWidth,
                largeScaleWidth: option.largeScaleWidth,
                hourHandLen: drawer.width * option.hourHandLen,
                hourHandEndLen: drawer.width * option.hourHandEndLen,
                hourHandWid: option.hourHandWid,
                minuteHandLen: drawer.width * option.minuteHandLen,
                minuteHandEndLen: drawer.width * option.minuteHandEndLen,
                minuteHandWid: option.minuteHandWid,
                backgroundColor: option.backgroundColor,
                scaleColor: option.scaleColor,
                hourHandColor: option.hourHandColor,
                minuteHandColor: option.minuteHandColor
            };
        },
        initTasks() {
            drawer.tasks = [];


        },
        animate() {

        }
    };
}

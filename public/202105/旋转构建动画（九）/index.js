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
        tasks: [
            {hourNum: 2, minuteNum: 60},
            {hourNum: 3, minuteNum: 60},
            {hourNum: 4, minuteNum: 60},
            {hourNum: 6, minuteNum: 60},
            {hourNum: 12, minuteNum: 60},
            {hourNum: 24, minuteNum: 120}
        ],
        backgroundColor: '#000',
        scaleColor: '#ccc',
        hourHandColor: '#fff',
        minuteHandColor: '#F00',
        timeInterval: 5,
        taskTimeInterval: 20
    };

    class Element {
        constructor(hourHandAngle, minuteHandAngle, sPoint, ePoint, color, lineWidth) {
            this.hourHandAngle = hourHandAngle;
            this.minuteHandAngle = minuteHandAngle;
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
            this.ctx = ctx;
            this.option = option;
            this.hourNum = hourNum;
            this.minuteNum = minuteNum;
            this.color = color;
            this.init();
        }
        init() {
            this.current = 0;
            this.stopTime = 0;
            this.end = false;
            this.elements = [];

        }
        run() {
            this.draw();
            this.update();
        }
        draw() {
            this.drawStatic();
            this.drawElements();
            this.drawHands();
        }
        drawStatic() {

        }
        drawElements() {

        }
        drawHands() {
            
        }
        update() {
            this.stopTime++;
            if (this.stopTime >= this.option.timeInterval) {
                this.current++;
                if (this.current >= this.elements.length) {
                    this.end = true;
                }
                this.stopTime = 0;
            }
        }
        reset() {
            this.end = false;
            this.current = 0;
            this.stopTime = 0;

        }
        isEnd() {
            return this.end;
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#999');
            drawer.initSize();
            drawer.initTasks();
            drawer.current = 0;
            drawer.stopTime = 0;
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
                minuteHandColor: option.minuteHandColor,
                timeInterval: option.timeInterval
            };
        },
        initTasks() {
            drawer.tasks = [];
            option.tasks.forEach((item, index) => {
                drawer.tasks.push(new Task(drawer.ctx, drawer.option, item.hourNum, item.minuteNum, drawer.color(index * 360 / option.tasks.length)));
            });
        },
        animate() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            let currentTask = drawer.tasks[drawer.current];
            if (!currentTask.isEnd) {
                currentTask.run();
            } else {
                drawer.stopTime += 1;
                if (drawer.stopTime >= option.taskTimeInterval) {
                    currentTask.reset();
                    drawer.current += 1;
                    if (drawer.current >= drawer.tasks.length) {
                        drawer.current = 0;
                    }
                    drawer.stopTime = 0;
                }
            }
            ctx.restore();
            CanvasUtil.drawMark(ctx, drawer.mark);
            requestAnimationFrame(drawer.animate);
        },
        color: function (hue) {
            return "hsl(" + hue + ", 100%, 50%)";
        }
    };
    drawer.start();
}

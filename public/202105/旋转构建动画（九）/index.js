{
    const option = {
        radius: 0.4,
        scaleOuter: 0.38,
        largeScale: 0.35,
        smallScale: 0.36,
        scaleWidth: 1,
        largeScaleWidth: 4,
        hourHandLen: 0.18, // 时针长度
        hourHandEndLen: 0.02, // 时针长度
        hourHandWid: 4,    // 时针宽度
        minuteHandLen: 0.34, // 分针长度
        minuteHandEndLen: 0.03, // 分针长度
        minuteHandWid: 3,    // 分针宽度
        lineWidth: 1,
        tasks: [
            {hourNum: 2, minuteNum: 60},
            {hourNum: 3, minuteNum: 60},
            {hourNum: 4, minuteNum: 60},
            {hourNum: 6, minuteNum: 60},
            {hourNum: 12, minuteNum: 60}
            // {hourNum: 24, minuteNum: 120}
        ],
        backgroundColor: '#000',
        scaleColor: '#ccc',
        hourHandColor: '#fff',
        minuteHandColor: '#F00',
        timeInterval: 5,
        taskTimeInterval: 50
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
            this.endTime = 0;
            this.end = false;
            this.hourLargeAngleStep = 2 * Math.PI / this.hourNum;
            this.hourSamllAngleStep = this.hourLargeAngleStep / this.minuteNum;
            this.minuteAngleStep = 2 * Math.PI / this.minuteNum;
            this.elements = [];
            this.startAngle = -Math.PI / 2;
            for (let h = 0; h < this.hourNum; h++) {
                for (let m = 0; m < this.minuteNum; m++) {
                    let hourAngle = this.startAngle + h * this.hourLargeAngleStep + m * this.hourSamllAngleStep,
                        minuteAngle = this.startAngle + m * this.minuteAngleStep;
                    this.elements.push(new Element(
                        hourAngle,
                        minuteAngle,
                        {x: this.option.hourHandLen * Math.cos(hourAngle), y: this.option.hourHandLen * Math.sin(hourAngle)},
                        {x: this.option.minuteHandLen * Math.cos(minuteAngle), y: this.option.minuteHandLen * Math.sin(minuteAngle)},
                        this.color,
                        this.option.lineWidth
                    ));
                }
            }
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
            let ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = this.option.scaleColor;

            // 外圈
            ctx.beginPath();
            ctx.arc(0, 0, this.option.radius, 0, 2 * Math.PI, false);
            ctx.arc(0, 0, this.option.scaleOuter, 0, 2 * Math.PI, true);
            ctx.fill();

            // 刻度
            for (let m = 0; m < this.minuteNum; m++) {
                ctx.save();
                ctx.rotate(this.startAngle + m * this.minuteAngleStep);
                ctx.strokeStyle = this.option.scaleColor;
                ctx.beginPath();
                ctx.moveTo(this.option.scaleOuter, 0);
                ctx.lineTo(this.option.smallScale, 0);
                ctx.stroke();
                ctx.restore();
            }
            for (let h = 0; h < this.hourNum; h++) {
                ctx.save();
                ctx.rotate(this.startAngle + h * this.hourLargeAngleStep);
                ctx.strokeStyle = this.option.scaleColor;
                ctx.lineWidth = this.option.largeScaleWidth;
                ctx.beginPath();
                ctx.moveTo(this.option.scaleOuter, 0);
                ctx.lineTo(this.option.largeScale, 0);
                ctx.stroke();
                ctx.restore();
            }

            ctx.restore();
        }
        drawElements() {
            let ctx = this.ctx;
            for (let i = 0; i <= this.current; i++) {
                this.elements[i].draw(ctx);
            }
        }
        drawHands() {
            let ctx = this.ctx;

            // 时针
            ctx.save();
            ctx.beginPath();
            let hourHandAngle = this.elements[this.current].hourHandAngle;
            ctx.strokeStyle = this.option.hourHandColor;
            ctx.lineWidth = this.option.hourHandWid;
            ctx.rotate(hourHandAngle);
            ctx.moveTo(-this.option.hourHandEndLen, 0);
            ctx.lineTo(this.option.hourHandLen, 0);
            ctx.stroke();
            ctx.restore();

            // 分针
            ctx.save();
            ctx.beginPath();
            let minuteHandAngle = this.elements[this.current].minuteHandAngle;
            ctx.strokeStyle = this.option.minuteHandColor;
            ctx.lineWidth = this.option.minuteHandWid;
            ctx.rotate(minuteHandAngle);
            ctx.moveTo(-this.option.minuteHandEndLen, 0);
            ctx.lineTo(this.option.minuteHandLen, 0);
            ctx.stroke();
            ctx.restore();
        }
        update() {
            this.stopTime++;
            if (this.stopTime >= this.option.timeInterval) {
                this.current++;
                if (this.current >= this.elements.length) {
                    // this.end = true;
                    this.endTime++;
                    if (this.endTime >= this.option.taskTimeInterval) {
                        
                    }
                }
                this.stopTime = 0;
            }
        }
        reset() {
            this.end = false;
            this.current = 0;
            this.stopTime = 0;
            this.endTime = 0;

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
                lineWidth: option.lineWidth,
                backgroundColor: option.backgroundColor,
                scaleColor: option.scaleColor,
                hourHandColor: option.hourHandColor,
                minuteHandColor: option.minuteHandColor,
                timeInterval: option.timeInterval,
                taskTimeInterval: option.taskTimeInterval
            };
        },
        initTasks() {
            drawer.tasks = [];
            option.tasks.forEach((item, index) => {
                drawer.tasks.push(new Task(drawer.ctx, drawer.option, item.hourNum, item.minuteNum, drawer.color(index * 360 / option.tasks.length)));
            });
            console.log(drawer.tasks);
        },
        animate() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            let currentTask = drawer.tasks[drawer.current];
            if (!currentTask.isEnd()) {
                currentTask.run();
            } else {
                drawer.current++;
                if (drawer.current >= drawer.tasks.length) {
                    drawer.current = 0;
                }
                // currentTask.draw();
                // drawer.stopTime += 1;
                // if (drawer.stopTime >= option.taskTimeInterval) {
                //     currentTask.reset();
                //     drawer.current += 1;
                //     if (drawer.current >= drawer.tasks.length) {
                //         drawer.current = 0;
                //     }
                //     drawer.stopTime = 0;
                // }
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

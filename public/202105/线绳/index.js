{
    const option = {
        radius: 0.35,
        msgRadius: 0.43,
        msgSize: 0.02,
        msgText: '端点数：',
        msgColor: '#fff',
        backgroundColor: '#000',
        endpointRadius: 3,
        endpointColor: '#fff',
        startAngle: -Math.PI / 2,
        endpointTimeInterval: 5,
        lineTimeInterval: 5,
        lineGroupTimeInterval: 25,
        taskTimeInterval: 40,
        lineWidth: 1,
        taskEndpointNums: [5, 7, 11, 17, 23, 29, 37, 43, 47, 101]
    };

    class Endpoint {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color
        }
        draw(ctx) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        }
    }

    class Line {
        constructor(startIndex, endIndex, lineWidth, lineColor) {
            this.startIndex = startIndex;
            this.endIndex = endIndex;
            this.lineWidth = lineWidth;
            this.lineColor = lineColor;
        }
        draw(ctx, endpoints) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.lineColor;
            ctx.moveTo(endpoints[this.startIndex].x, endpoints[this.startIndex].y);
            ctx.lineTo(endpoints[this.endIndex].x, endpoints[this.endIndex].y);
            ctx.stroke();
            ctx.restore();
        }
    }

    class Task {
        constructor(endpointNum, radius, option) {
            this.endpointNum = endpointNum;
            this.radius = radius;
            this.option = option;
            this.init();
            this.reset();
        }
        init() {
            this.initEndpoints();
            this.initLineGroups();
        }
        reset() {
            this.endpointCounter = 0;
            this.endpointIndex = 0;
            this.lineCounter = 0;
            this.lineIndex = 0;
            this.lineGroupCounter = 0;
            this.lineGroupIndex = 0;
            this.endCounter = 0;
            this.stage = 'endpoint';
            this.isEnd = false;
        }
        initEndpoints() {
            this.endpoints = [];
            this.angleStep = 2 * Math.PI / this.endpointNum;
            for (let i = 0; i < this.endpointNum; i++) {
                let angle = this.option.startAngle + i * this.angleStep;
                this.endpoints.push(new Endpoint(
                    this.radius * Math.cos(angle),
                    this.radius * Math.sin(angle),
                    this.option.endpointRadius,
                    this.option.endpointColor
                ));
            }
        }
        initLineGroups() {
            this.lineGroups = [];
            if (this.endpointNum < 5) {
                return;
            }
            let maxEndpointStep = (this.endpointNum % 2 == 0) ? (this.endpointNum / 2 - 1) : ((this.endpointNum - 1) / 2),
                groupNum = maxEndpointStep - 1,
                hueStep = 360 / groupNum;
            for (let pointStep = maxEndpointStep, index = 0; pointStep >= 2; index++, pointStep--) {
                let lines = [],
                    endpointIndexs = [0],
                    color = "hsl(" + (hueStep * index) + ", 100%, 50%)",
                    nextPointIndex = (endpointIndexs[endpointIndexs.length - 1] + pointStep) % this.endpointNum
                while (endpointIndexs.indexOf(nextPointIndex) <= 0) {
                    lines.push(new Line(
                        endpointIndexs[endpointIndexs.length - 1],
                        nextPointIndex,
                        this.option.lineWidth,
                        color
                    ));
                    endpointIndexs.push(nextPointIndex);
                    nextPointIndex = (endpointIndexs[endpointIndexs.length - 1] + pointStep) % this.endpointNum
                }
                this.lineGroups.push(lines);
            }
            console.log(this.lineGroups);
        }
        draw(ctx) {
            this.drawMsg(ctx);
            this.drawEndpoints(ctx);
            if (this.stage != 'endpoint') {
                this.drawLines(ctx);
            }
        }
        drawMsg(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = this.option.msgSize + 'px 楷体';
            ctx.fillStyle = this.option.msgColor;
            ctx.fillText(this.option.msgText + this.endpointNum, 0, this.option.msgY);
            ctx.restore();
        }
        drawEndpoints(ctx) {
            this.endpoints.forEach((item, index) => {
                if (index <= this.endpointIndex) {
                    item.draw(ctx);
                }
            });
        }
        drawLines(ctx) {
            ctx.save();
            this.lineGroups.forEach((lines, groupIndex) => {
                if (groupIndex < this.lineGroupIndex) {
                    lines.forEach((line) => {
                        line.draw(ctx, this.endpoints);
                    });
                }
                if (groupIndex === this.lineGroupIndex) {
                    lines.forEach((line, index) => {
                        if (index <= this.lineIndex) {
                            line.draw(ctx, this.endpoints);
                        }
                    });
                }
            });
            ctx.restore();
        }
        update() {
            if (this.stage === 'endpoint') {
                this.endpointCounter++;
                if (this.endpointCounter >= this.option.endpointTimeInterval) {
                    this.endpointCounter = 0;
                    this.endpointIndex++;
                    if (this.endpointIndex >= this.endpoints.length) {
                        this.stage = 'line';
                        // this.isEnd = true;
                    }
                }
            }
            if (this.stage === 'line') {
                this.lineCounter++;
                if (this.lineCounter >= this.option.lineTimeInterval) {
                    this.lineCounter = 0;
                    this.lineIndex++;
                    if (this.lineIndex >= this.lineGroups[this.lineGroupIndex].length) {
                        this.stage = 'lineGroup';
                    }
                }
            }
            if (this.stage === 'lineGroup') {
                this.lineGroupCounter++;
                if (this.lineGroupCounter >= this.option.lineGroupTimeInterval) {
                    this.lineGroupCounter = 0;
                    this.lineGroupIndex++;
                    if (this.lineGroupIndex >= this.lineGroups.length) {
                        this.stage = 'end';
                    } else {
                        this.stage = 'line';
                        this.lineIndex = 0;
                    }
                }
            }
            if (this.stage === 'end') {
                this.endCounter++;
                if (this.endCounter >= option.taskTimeInterval) {
                    this.isEnd = true;
                }
            }
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas('#fff');
            drawer.current = 0;
            drawer.initSize();
            drawer.initTasks();
            drawer.animate();
        },
        initSize() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.width = Math.min(drawer.w, drawer.h);
            drawer.radius = drawer.width * option.radius;
        },
        initTasks() {
            drawer.tasks = [];
            let taskOption = {
                msgRadius: option.msgRadius,
                msgSize: drawer.width * option.msgSize,
                msgText: option.msgText,
                msgColor: option.msgColor,
                msgY: -drawer.width * option.msgRadius,
                endpointRadius: option.endpointRadius,
                endpointColor: option.endpointColor,
                startAngle: option.startAngle,
                endpointTimeInterval: option.endpointTimeInterval,
                lineTimeInterval: option.lineTimeInterval,
                lineGroupTimeInterval: option.lineGroupTimeInterval,
                taskTimeInterval: option.taskTimeInterval,
                lineWidth: option.lineWidth
            };
            option.taskEndpointNums.forEach(item => {
                drawer.tasks.push(new Task(
                    item,
                    drawer.radius,
                    taskOption
                ));
            });
        },
        animate() {
            drawer.draw();
            drawer.update();
            requestAnimationFrame(drawer.animate);
        },
        update() {
            let currentTask = drawer.tasks[drawer.current];
            currentTask.update();
            if (currentTask.isEnd) {
                drawer.current++;
                if (drawer.current >= drawer.tasks.length) {
                    drawer.current = 0;
                }
                currentTask.reset();
            }

        },
        draw() {
            let ctx = drawer.ctx;
            ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            ctx.save();
            ctx.translate(drawer.w / 2, drawer.h / 2);
            drawer.tasks[drawer.current].draw(ctx);
            ctx.restore();
            CanvasUtil.drawMark(ctx, drawer.mark);
        }
    };

    drawer.start();
}

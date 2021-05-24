{
    const option = {
        radius: 0.4,
        msgRadius: 0.45,
        msgSize: 0.05,
        msgText: '端点数：',
        msgColor: '#fff',
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

    class Task {
        constructor(endpointNum, radius, option) {
            this.endpointNum = endpointNum;
            this.radius = radius;
            this.option = option;
            this.init();
        }
        init() {
            this.initEndpoints();
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
        draw(ctx) {
            this.drawMsg(ctx);
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
        update() {
            if (this.stage === 'endpoint') {
                this.endpointCounter++;
                if (this.endpointCounter >= this.option.endpointTimeInterval) {
                    this.endpointCounter = 0;
                    this.endpointIndex++;
                    if (this.endpointIndex >= this.endpoints.length) {
                        this.stage = 'line';
                    }
                }
            }
            if (this.stage === 'line') {
                this.lineCounter++;
                if (this.lineCounter >= this.option.lineTimeInterval) {
                    this.lineCounter = 0;
                    this.lineIndex++;
                }
            }
            if (this.stage === 'end') {

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
                msgSize: option.msgSize,
                msgText: option.msgText,
                msgColor: option.msgColor,
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
        },
        update() {
            let currentTask = drawer.tasks[drawer.current];
            currentTask.update();
            if (currentTask.isEnd) {
                drawer.current++;
                if (drawer.current >= drawer.tasks.length) {
                    drawer.current = 0;
                }
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

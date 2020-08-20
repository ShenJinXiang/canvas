{
    function zqgzt(setting) {
        const option = {
            el: setting.el,
            width: setting.width || 300,
            height: setting.height || 300,
            radius: setting.radius || 120,
            borderColor: setting.borderColor || 'red',
            borderWidth: setting.borderWidth || 2,
            showText: setting.showText,
            datas: setting.datas,
            initTime: 50,
        }

        class Element {
            constructor(ox, oy, text, value, radius, angle, startAngle, style, isFirst) {
                this.ox = ox;
                this.oy = oy;
                this.text = text;
                this.value = value;
                this.radius = radius;
                this.angle = angle;
                this.startAngle = startAngle;
                this.style = style;
                this.isFirst = isFirst;
                this.endAngle = this.startAngle + this.angle;

                this.drawOx = this.ox;
                this.drawOy = this.oy;
                this.drawRadius = this.radius;

                this.animate = {
                    moveStatus: 0,
                    moveTime: 5,
                    moveCount: 0,
                    clickTime: 50,
                    clickCount: 0,
                };
                this.animate.radiusStep = this.radius * 0.1 / this.animate.moveTime;

                this.event = {
                    checked: false,
                    isInPath: false
                };
                this.fill = false;

            }
            update(eventStatus) {
                this.lastInPath = this.event.isInPath;
                let canvasEventStatus = eventStatus;
                if (canvasEventStatus.eventType === 'move' || canvasEventStatus.eventType === 'click') {
                    this.event.isInPath = this.isInPath(canvasEventStatus.point);
                } else {
                    this.event.isInPath = false;
                }

                // 鼠标移入
                if (!this.lastInPath && this.event.isInPath) {
                    this.animate.moveStatus = 1;
                }
                if (this.event.isInPath && this.animate.moveStatus === 1) {
                    this.drawRadius = this.radius + this.animate.radiusStep * this.animate.moveCount;
                    this.animate.moveCount++;
                    if (this.animate.moveCount >= this.animate.moveTime) {
                        this.animate.moveCount = this.animate.moveTime;
                        this.animate.moveStatus = 2;
                    }
                }
                // 鼠标移出
                if (this.lastInPath && !this.event.isInPath) {
                    this.animate.moveStatus = 1;
                }
                if (!this.event.isInPath && this.animate.moveStatus === 1) {
                    this.drawRadius = this.radius + this.animate.radiusStep * this.animate.moveCount;
                    this.animate.moveCount--;
                    if (this.animate.moveCount <= 0) {
                        this.animate.moveCount = 0;
                        this.animate.moveStatus = 0;
                    }
                }
                // console.log(this.animate);
            }
            isInPath(point) {
                let distance = Math.sqrt(Math.pow(point.x - this.drawOx, 2) + Math.pow(point.y - this.drawOy, 2));
                if (Math.abs(distance) <= 1) {
                    return false
                }
                if (distance > this.drawRadius) {
                    return false;
                }
                let pSin = (point.y - this.drawOy) / distance,
                    angle = Math.asin(pSin);
                if (point.x < this.drawOx) {
                    angle = Math.PI - angle;
                }
                return this.startAngle <= angle && angle <= this.endAngle;
            }
            draw(ctx, endAngle) {
                // console.log("lastEventStatus: ", this.lastEventStatus);
                // console.log("eventStatus: ", this.eventStatus);
                ctx.save();
                ctx.translate(this.drawOx, this.drawOy);
                ctx.fillStyle = this.style;
                if(this.event.isInPath) {
                    ctx.strokeStyle = this.style;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                    ctx.shadowOffsetX = 0;
                } else {
                    ctx.strokeStyle = option.borderColor;
                }
                ctx.lineWidth = option.borderColor;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(this.drawRadius * Math.cos(this.startAngle), this.drawRadius * Math.sin(this.startAngle));
                ctx.arc(0, 0, this.drawRadius, this.startAngle, endAngle || this.endAngle, false);
                ctx.closePath();
                if (this.isFirst) {
                    ctx.fill();
                    ctx.stroke();
                } else {
                    if (this.event.isInPath) {
                        ctx.fill();
                        ctx.stroke();
                    } else {
                        ctx.stroke();
                    }
                }

                if (option.showText) {

                }

                ctx.restore();
            }

        }

        const drawer = {
            start() {
                drawer.c = document.getElementById(option.el);
                drawer.ctx = drawer.c.getContext('2d');
                drawer.init();
                drawer.animate();
                drawer.bindEvent();
            },
            init() {
                drawer.w = drawer.c.width = option.width;
                drawer.h = drawer.c.height = option.height;
                drawer.datas = option.datas;
                drawer.sumValue = drawer.sum(drawer.datas);
                drawer.startAngle = -Math.PI / 2 ;
                drawer.initElements();

                // 初始动画
                drawer.initAnimate = {
                    completed: false,
                    time: option.initTime,
                    count: 0,
                    angleStep: 2 * Math.PI / option.initTime,
                };
                drawer.eventStatus = {

                }
            },
            bindEvent() {
                drawer.c.addEventListener('mousemove', (e) => {
                    let point = drawer.eventToCanvas(drawer.c, e);
                    drawer.eventStatus.eventType = 'move';
                    drawer.eventStatus.point = point;
                }, false);
                drawer.c.addEventListener('mouseout', (e) => {
                    drawer.eventStatus.eventType = 'out';
                    drawer.eventStatus.point = null;
                }, false);
                drawer.c.addEventListener('click', (e) => {
                    let point = drawer.eventToCanvas(drawer.c, e);
                    drawer.eventStatus.eventType = 'click';
                    drawer.eventStatus.point = point;
                }, false);
            },
            animate() {
                drawer.update();
                drawer.draw();
                requestAnimationFrame(drawer.animate);
            },
            update() {
                if (!drawer.initAnimate.completed) {
                    drawer.initAnimate.count++;
                    if (drawer.initAnimate.count >= drawer.initAnimate.time) {
                        drawer.initAnimate.completed = true;
                    }
                } else {
                    drawer.elements.forEach((item) => item.update(drawer.eventStatus));
                }
            },
            draw() {
                const ctx = drawer.ctx;
                ctx.clearRect(0, 0, drawer.w, drawer.h);
                if (drawer.initAnimate.completed) {
                    drawer.elements.forEach((item) => item.draw(ctx));
                } else {
                    drawer.drawInitAnimate(ctx);
                }
            },
            drawInitAnimate(ctx) {
                let angle = drawer.startAngle + drawer.initAnimate.count * drawer.initAnimate.angleStep;
                drawer.elements.forEach((item) => {
                    if (angle > item.endAngle) {
                        item.draw(ctx);
                    } else if (angle > item.startAngle && angle < item.endAngle) {
                        item.draw(ctx, angle);
                    }
                });
            },
            initElements() {
                drawer.elements = [];
                let startAngle = drawer.startAngle;
                drawer.datas.forEach((item, index) => {
                    let angle = 2 * Math.PI * item.value / drawer.sumValue;
                    drawer.elements.push(new Element(
                        drawer.w / 2,
                        drawer.h / 2,
                            item.text,
                        item.value,
                        option.radius,
                        angle,
                        startAngle,
                        item.style,
                        index === 0
                    ));
                    startAngle += angle;
                });
            },
            eventToCanvas(canvas, e) {
                let box = canvas.getBoundingClientRect();
                return {
                    x: e.clientX - box.left,
                    y: e.clientY - box.top
                };
            },
            sum(arr) {
                let sum = 0;
                arr.map((item) => sum += item.value);
                return sum;
            }
        }
        drawer.start();
    }
    zqgzt({
        el: 'canvas1',
        radius: 120,
        borderColor: '#084',
        datas: [
            {text: '已填写', value: 200, style: '#084', showText: true},
            {text: '印花税', value: 100, style: '#808', showText: true},
            {text: '增值税', value: 150, style: '#f84', showText: true},
            {text: '所得税', value: 100, style: '#aa4', showText: true},
            {text: '财务报表', value: 200, style: '#84f', showText: true},
            {text: '其他', value: 100, style: '#4aa', showText: true},
        ]
    });
    // zqgzt({
    //     el: 'canvas2',
    //     borderColor: '#048',
    //     datas: [
    //         {text: '已填写', value: 200, style: '#048', showText: true},
    //         {text: '印花税', value: 130, style: '#808', showText: true},
    //         {text: '增值税', value: 50, style: '#f84', showText: true},
    //         {text: '所得税', value: 100, style: '#aa4', showText: true},
    //         {text: '财务报表', value: 100, style: '#84f', showText: true},
    //         {text: '其他', value: 80, style: '#4aa', showText: true},
    //     ]
    // });
    // zqgzt({
    //     el: 'canvas3',
    //     datas: [
    //         {text: '已填写', value: 200, style: 'red', showText: true},
    //         {text: '印花税', value: 50, style: '#808', showText: true},
    //         {text: '增值税', value: 150, style: '#f84', showText: true},
    //         {text: '所得税', value: 100, style: '#aa4', showText: true},
    //         {text: '财务报表', value: 200, style: '#84f', showText: true},
    //         {text: '其他', value: 130, style: '#4aa', showText: true},
    //     ]
    // });

}
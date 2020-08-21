{
    function zqgzt(setting) {
        const option = {
            el: setting.el,
            width: setting.width || 400,
            height: setting.height || 400,
            radius: setting.radius || 120,
            borderColor: setting.borderColor || 'red',
            borderWidth: setting.borderWidth || 1,
            datas: setting.datas,
            initTime: 50,
            click: setting.click
        }

        class Element {
            constructor(ox, oy, text, value, radius, angle, startAngle, style, isFirst, showText) {
                this.ox = ox;
                this.oy = oy;
                this.text = text;
                this.value = value;
                this.radius = radius;
                this.angle = angle;
                this.startAngle = startAngle;
                this.style = style;
                this.isFirst = isFirst;
                this.showText = showText;
                this.endAngle = this.startAngle + this.angle;

                this.drawOx = this.ox;
                this.drawOy = this.oy;
                this.drawRadius = this.radius;

                this.animate = {
                    moveStatus: 0,
                    moveTime: 10,
                    moveCount: 0,
                };
                this.maxRadius = this.radius * 1.05;
                this.animate.radiusStep = (this.maxRadius - this.radius) / this.animate.moveTime;

                this.midAngle = (this.startAngle + this.endAngle) / 2;
                let clickRadius = this.radius * 0.1;
                this.maxOx = this.ox + clickRadius * Math.cos(this.midAngle);
                this.maxOy = this.oy + clickRadius * Math.sin(this.midAngle);

                this.event = {
                    checked: false,
                    isInPath: false
                };
                this.fill = false;

            }
            checkClick(point) {
                return this.isInPath(point);
            }
            update(eventStatus) {
                // if (this.text !== '印花税') {
                //     return ;
                // }
                this.lastInPath = this.event.isInPath;
                // this.lastClickTime = this.event.clickTime;
                if (eventStatus.eventType) {
                    this.event.eventType = eventStatus.eventType;
                    if (eventStatus.eventType === 'move' || eventStatus.eventType === 'click') {
                        this.event.isInPath = this.isInPath(eventStatus.point);
                        this.event.point = eventStatus.point;
                    } else {
                        this.event.isInPath = false;
                    }
                } else {
                    this.event.eventType = 'none';
                }
                // if (this.event.isInPath && this.event.eventType === 'click') {
                //     this.event.clickTime = new Date().getTime();
                //     if (!this.lastClickTime || this.event.clickTime -  this.lastClickTime > 100) {
                //         this.event.checked = !this.event.checked;
                //     }
                // }

                if (this.event.checked) {
                    this.drawOx = this.maxOx;
                    this.drawOy = this.maxOy;
                } else {
                    this.drawOx = this.ox;
                    this.drawOy = this.oy;
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
                        this.drawRadius = this.radius;
                    }
                }

                // 判断是否需要填充
                if (this.event.isInPath || this.event.checked || this.animate.moveStatus !== 0 ) {
                    this.fill = true;
                } else {
                    this.fill = false;
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
                if (this.isFirst) {
                    ctx.strokeStyle = this.style;
                }
                if (this.fill) {
                    ctx.strokeStyle = this.style;
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                    ctx.shadowOffsetX = 1;
                } else {
                    ctx.strokeStyle = option.borderColor;
                }
                ctx.lineWidth = option.borderWidth;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(this.drawRadius * Math.cos(this.startAngle), this.drawRadius * Math.sin(this.startAngle));
                ctx.arc(0, 0, this.drawRadius, this.startAngle, endAngle || this.endAngle, false);
                ctx.closePath();
                if (this.isFirst || this.fill) {
                    ctx.fill();
                    ctx.stroke();
                } else {
                    ctx.stroke();
                }

                ctx.restore();
                if (this.showText) {
                    ctx.save();
                    ctx.strokeStyle = this.style;
                    ctx.lineWidth = 2;
                    ctx.translate(this.drawOx + this.radius * Math.cos(this.midAngle), this.drawOy + this.radius * Math.sin(this.midAngle));
                    // ctx.translate(this.drawRadius * Math.cos(this.startAngle), this.drawRadius * Math.sin(this.startAngle));
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(15 * Math.cos(this.midAngle), 30 * Math.sin(this.midAngle));
                    if (this.midAngle < Math.PI / 2) {
                        ctx.lineTo(15 * Math.cos(this.midAngle) + 10, 30 * Math.sin(this.midAngle));
                    } else {
                        ctx.lineTo(15 * Math.cos(this.midAngle) - 10, 30 * Math.sin(this.midAngle));
                    }
                    ctx.stroke();
                    ctx.fillStyle = this.style;
                    ctx.font = 'sans-serif 13px';
                    // ctx.textAlign = this.midAngle < Math.PI / 2 ? 'left' : 'right';
                    ctx.textBaseline = 'middle';
                    if (this.midAngle < Math.PI / 2) {
                        ctx.textAlign = 'left';
                        ctx.fillText(this.text, 15 * Math.cos(this.midAngle) + 12, 30 * Math.sin(this.midAngle));
                    } else {
                        ctx.textAlign = 'right';
                        ctx.fillText(this.text, 15 * Math.cos(this.midAngle) - 12, 30 * Math.sin(this.midAngle));
                    }
                    ctx.restore();
                }

                if (this.event.isInPath && this.event.point) {
                    ctx.save();
                    ctx.translate(this.event.point.x, this.event.point.y);
                    ctx.fillStyle = 'rgba(40, 40, 40, 0.5)';
                    let ox = 10,
                        oy = 10,
                        width = 100,
                        height = 40;
                    if (this.event.point.x + ox + width > drawer.w) {
                        ox = -ox - width;
                    }
                    ctx.translate(ox, oy);
                    ctx.fillRect(0, 0, width, height);

                    ctx.fillStyle = 'rgba(250, 250, 250, 1)';
                    ctx.font = 'sans-serif 13px';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'top';
                    ctx.fillText(this.text, 10, 5);
                    ctx.fillText(this.value, 10, 25);
                    ctx.restore();
                }
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
                drawer.eventStatus = {}
            },
            bindEvent() {
                drawer.c.addEventListener('mousemove', (e) => {
                    let point = drawer.eventToCanvas(drawer.c, e);
                    drawer.eventStatus.eventType = 'move';
                    drawer.eventStatus.point = point;
                    let has = drawer.elements.some((item) => item.checkClick(point));
                    if (has) {
                        drawer.c.style.cursor = 'pointer';
                    } else {
                        drawer.c.style.cursor = 'default';
                    }
                }, false);
                drawer.c.addEventListener('mouseout', (e) => {
                    drawer.eventStatus.eventType = 'out';
                    drawer.eventStatus.point = null;
                }, false);
                drawer.c.addEventListener('click', (e) => {
                    let point = drawer.eventToCanvas(drawer.c, e);
                    drawer.eventStatus.eventType = 'click';
                    drawer.eventStatus.point = point;
                    let has = drawer.elements.some((item) => item.checkClick(point));
                    if (has) {
                        drawer.elements.forEach((item, index) => {
                            if (item.checkClick(point)) {
                                item.event.checked = !item.event.checked;
                                if (item.event.checked && option.click) {
                                    option.click(drawer.datas[index]);
                                }
                            } else {
                                item.event.checked = false;
                            }
                        });
                    }

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
                    drawer.eventStatus = {}
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
                        index === 0,
                        item.showText
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


}
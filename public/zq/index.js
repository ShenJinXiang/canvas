{
    function zqgzt(setting) {
        const option = {
            el: setting.el,
            width: setting.width || 300,
            height: setting.height || 300,
            radius: setting.radius || 120,
            borderColor: setting.borderColor || 'red',
            borderWidth: setting.borderWidth || 2,
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
            }
            draw(ctx, endAngle) {
                ctx.save();
                ctx.translate(this.ox, this.oy);
                ctx.fillStyle = this.style;
                ctx.strokeStyle = option.borderColor;
                ctx.lineWidth = option.borderColor;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(this.radius * Math.cos(this.startAngle), this.radius * Math.sin(this.startAngle));
                ctx.arc(0, 0, this.radius, this.startAngle, endAngle || this.endAngle, false);
                ctx.closePath();
                if (this.isFirst) {
                    ctx.fill();
                }
                ctx.stroke();

                ctx.restore();
            }

        }

        const drawer = {
            start() {
                drawer.c = document.getElementById(option.el);
                drawer.ctx = drawer.c.getContext('2d');
                drawer.init();
                // console.log(drawer);
                drawer.animate();
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
            {text: '已填写', value: 200, style: '#084'},
            {text: '印花税', value: 100, style: '#808'},
            {text: '增值税', value: 150, style: '#f84'},
            {text: '所得税', value: 100, style: '#aa4'},
            {text: '财务报表', value: 200, style: '#84f'},
            {text: '其他', value: 100, style: '#4aa'},
        ]
    });
    zqgzt({
        el: 'canvas2',
        borderColor: '#048',
        datas: [
            {text: '已填写', value: 200, style: '#048'},
            {text: '印花税', value: 130, style: '#808'},
            {text: '增值税', value: 50, style: '#f84'},
            {text: '所得税', value: 100, style: '#aa4'},
            {text: '财务报表', value: 100, style: '#84f'},
            {text: '其他', value: 80, style: '#4aa'},
        ]
    });
    zqgzt({
        el: 'canvas3',
        datas: [
            {text: '已填写', value: 200, style: 'red'},
            {text: '印花税', value: 50, style: '#808'},
            {text: '增值税', value: 150, style: '#f84'},
            {text: '所得税', value: 100, style: '#aa4'},
            {text: '财务报表', value: 200, style: '#84f'},
            {text: '其他', value: 130, style: '#4aa'},
        ]
    });

}
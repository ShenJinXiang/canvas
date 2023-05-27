function line(config) {
    let option = {
        backgroundColor: '#fff',
        width: 900,
        height: 500,
        title: {
            text: config.title,
            font: 'bold 14px arial,sans-serif',
            color: '#04a',   // 标题颜色
            align: 'left',
        },
        axis: {  // 坐标轴
            lineWidth: 2,
            lineColor: 'rgba(40, 40, 40, 1)',
            arrow: false,   // 是否绘制坐标轴箭头
            arrowLength: 10,
            arrowWidth: 5,
        },
        backgroundLine: {  // 背景线
            lineWidth: 1,
            lineColor: 'rgba(100, 100, 100, 0.6)',
            horizontalLine: true,
            horizontalLineNum: 5,
            verticalLine: true,
        },
        console: {  // 底部控制台
            height: 30,
            background: 'rgba(220, 220, 220, 0.5)',
            topColor: 'rgba(250, 0, 0, 0.5)',
            dataColor: 'rgba(100, 100, 100, 1)',
        },
        data: config.data,
        content: {
            xStep: 5,
            xTextStep: 100,
            lineColor: 'red',
            lineWidth: 2,
            pointRadius: 3,
            pointLineWidth: 1,
            pointFillStyle: '#fff',
            pointClick: config.pointClick,
        },
    };

    const kit = {
        max(arr) {
            return Math.max.apply({}, arr);
        },
        min(arr) {
            return Math.min.apply({}, arr);
        },
        range(num1, num2) {
            // let min = Math.min(num1, num2),
            //     max = Math.max(num1, num2),
            //     minAbs = Math.abs(min),
            //     maxAbs = Math.abs(max),
            //     minLog = Math.log10(minAbs),
            //     maxLog = Math.log10(maxAbs),
            //     floor, ceil;
            // if (min < 0) {
            //     floor = -Math.pow(10, Math.ceil(minLog));
            // } else {
            //     floor = Math.pow(10, Math.floor(minLog));
            // }
            // if (max < 0) {
            //     ceil = -Math.pow(10, Math.floor(maxLog));
            // } else {
            //     ceil = Math.pow(10, Math.ceil(maxLog));
            // }
            // return [floor, ceil];
            let min = Math.min(num1, num2),
                max = Math.max(num1, num2);
            return [min, max];
        },
    };

    const drawer = {
        start() {
            drawer.c = document.createElement('canvas');
            drawer.ctx = drawer.c.getContext("2d");
            drawer.initDatas();
            drawer.init();
            console.log(drawer);

            drawer.draw();
            drawer.bindEvent();
            document.body.append(drawer.c);
        },
        init() {
            drawer.w = drawer.c.width = option.width;
            drawer.h = drawer.c.height = option.height;
            drawer.ox = 50;
            drawer.oy = drawer.h - option.console.height - 50;
            drawer.winWidth = drawer.w - drawer.ox - 50;
            drawer.winHeight = drawer.oy - 50;
            drawer.contentWidth = drawer.winWidth - 20;
            drawer.contentHeight = drawer.winHeight - 20;
            drawer.event = {};

            // 标题
            initTitle();
            // 底部控制区
            drawer.initConsole();
            initYAxis();
            drawer.initContent();


            function initYAxis() {
                drawer.backgroundLine = {
                    lineWidth: option.backgroundLine.lineWidth,
                    lineColor: option.backgroundLine.lineColor,
                    horizontalLine: option.backgroundLine.horizontalLine,
                    horizontalLineNum: option.backgroundLine.horizontalLineNum,
                    verticalLine: option.backgroundLine.verticalLine,
                    y: []
                }
                let yXStep = drawer.contentHeight / drawer.backgroundLine.horizontalLineNum,
                    yStep = (drawer.winYRange[1] - drawer.winYRange[0]) / drawer.backgroundLine.horizontalLineNum;
                for (let i = 0; i <= drawer.backgroundLine.horizontalLineNum; i++) {
                    drawer.backgroundLine.y.push({
                        y: (drawer.winYRange[0] + yStep * i).toFixed(2),
                        yxs: yXStep * i,
                    });
                }

            }

            /**
             * 标题
             */
            function initTitle() {
                drawer.title = {
                    text: option.title.text,
                    font: option.title.font,
                    color: option.title.color,
                    align: option.title.align,
                    y: 25,
                }
                drawer.title.x = 50;
                if (option.title.align === 'center') {
                    drawer.title.x = drawer.w / 2;
                }
                if (option.title.align === 'right') {
                    drawer.title.x = drawer.w - 50;
                }
            }

        },
        initContent() {
            drawer.content = {
                xTextStep: option.content.xTextStep,
                lineColor: option.content.lineColor,
                lineWidth: option.content.lineWidth,
                pointRadius: option.content.pointRadius,
                pointLineWidth: option.content.pointLineWidth,
                pointFillStyle: option.content.pointFillStyle,
                pointClick: option.content.pointClick,
            }
            let start, end;
            if (drawer.console.topMove) {
                start = drawer.console.top.startX;
                end = drawer.console.top.endX;
            } else {
                start = drawer.minX;
                end = drawer.maxX;
            }
            drawer.contentPoints = [];
            drawer.datas.points.forEach((item, index) => {
                if (item.x >= start && item.x <= end) {
                    drawer.contentPoints.push({
                        index: index,
                        x: item.x,
                        y: item.y,
                        xxs: drawer.contentWidth * (item.x - start) / (end - start),
                        yxs: drawer.contentHeight * (item.y - drawer.winYRange[0]) / (drawer.winYRange[1] - drawer.winYRange[0]),
                    });
                }
            });
            // 设置 x坐标 刻度
            if (drawer.contentPoints.length * drawer.content.xTextStep <= drawer.contentWidth) {
                drawer.content.markStep = 1;
            } else {
                drawer.content.markStep = Math.ceil(drawer.contentPoints.length * drawer.content.xTextStep / drawer.contentWidth);
            }

            // 开始和最后的连线
            if (drawer.contentPoints[0].index != 0) {
                let point = drawer.contentPoints[0],
                    prevPoint = drawer.datas.points[point.index - 1],
                    prevPointXxs = drawer.contentWidth * (prevPoint.x - start) / (end - start),
                    prevPointYxs = drawer.contentHeight * (prevPoint.y - drawer.winYRange[0]) / (drawer.winYRange[1] - drawer.winYRange[0]),
                    y = point.yxs - point.xxs * (point.yxs - prevPointYxs) / (point.xxs - prevPointXxs);
                drawer.startY = y;
            } else {
                delete drawer.startY;
            }
            if (drawer.contentPoints[drawer.contentPoints.length - 1].index != drawer.datas.points.length - 1) {
                let point = drawer.contentPoints[drawer.contentPoints.length - 1],
                    nextPoint = drawer.datas.points[point.index + 1];
                nextPointXxs = drawer.contentWidth * (nextPoint.x - start) / (end - start),
                    nextPointYxs = drawer.contentHeight * (nextPoint.y - drawer.winYRange[0]) / (drawer.winYRange[1] - drawer.winYRange[0]),
                    y = point.yxs + (drawer.contentWidth - point.xxs) * (nextPointYxs - point.yxs) / (nextPointXxs - point.xxs);
                drawer.endY = y;
            } else {
                delete drawer.endY;
            }
        },
        initConsole(start) {
            drawer.console = {
                background: option.console.background,
                topColor: option.console.topColor,
                dataColor: option.console.dataColor,
                width: drawer.contentWidth,
                height: option.console.height,
                ox: drawer.ox,
                oy: drawer.h - 10,
                yMinWin: 5,
                yMaxWin: option.console.height,
                yRangeWin: option.console.height - 5,
                xMinWin: 0,
                xMaxWin: drawer.contentWidth,
                xRangeWin: drawer.contentWidth,
                data: [],
            };

            drawer.datas.points.forEach((item) => {
                let x = drawer.console.xRangeWin * (item.x - drawer.minX) / (drawer.maxX - drawer.minX) + drawer.console.xMinWin,
                    y = drawer.console.yRangeWin * (item.y - drawer.minY) / (drawer.maxY - drawer.minY) + drawer.console.yMinWin;
                drawer.console.data.push({x: x, y: y});
            });

            if (drawer.contentWidth < option.content.xStep * drawer.datas.x.length) {
                drawer.console.topMove = true;
                drawer.console.top = {
                    start: start || 0,
                    width: drawer.contentWidth * drawer.contentWidth / (option.content.xStep * drawer.datas.x.length),
                };
                drawer.console.top.maxStart = drawer.contentWidth - drawer.console.top.width;
                drawer.console.top.startX = (drawer.maxX - drawer.minX) * drawer.console.top.start / drawer.contentWidth + drawer.minX;
                drawer.console.top.endX = (drawer.maxX - drawer.minX) * (drawer.console.top.start + drawer.console.top.width) / drawer.contentWidth + drawer.minX;
            } else {
                drawer.console.topMove = false;
            }
        },
        initDatas() {
            drawer.datas = {
                x: [],
                y: [],
                points: [],
            };
            option.data.y.forEach((item, index) => {
                drawer.datas.x.push(option.data.x[index]);
                drawer.datas.y.push(item);
                drawer.datas.points.push({x: option.data.x[index], y: item});
            });
            drawer.minY = kit.min(drawer.datas.y);
            drawer.maxY = kit.max(drawer.datas.y);
            drawer.winYRange = kit.range(drawer.minY, drawer.maxY);
            drawer.minX = kit.min(drawer.datas.x);
            drawer.maxX = kit.max(drawer.datas.x);
        },
        getData() {
            return drawer.datas;
        },
        draw() {
            let ctx = drawer.ctx;
            // ctx.clearRect(0, 0, drawer.w, drawer.h);
            ctx.fillStyle = option.backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);
            drawer.drawTitle(ctx);
            drawer.drawAxis(ctx);
            drawer.drawConsole(ctx);
            drawer.drawYAxis(ctx);
            drawer.drawContent(ctx);
        },
        drawTitle(ctx) {
            ctx.save();
            ctx.fillStyle = drawer.title.color;
            ctx.font = drawer.title.font;
            ctx.textAlign = drawer.title.align;
            ctx.textBaseline = 'middle';
            ctx.fillText(drawer.title.text, drawer.title.x, drawer.title.y);
            ctx.stroke();
        },
        drawYAxis(ctx) {

            ctx.save();
            ctx.translate(drawer.ox, drawer.oy);
            drawer.backgroundLine.y.forEach((item) => {
                // Y 轴刻度
                ctx.beginPath();
                ctx.strokeStyle = option.axis.lineColor;
                ctx.lineWidth = option.axis.lineWidth;
                ctx.moveTo(0, -item.yxs);
                ctx.lineTo(-5, -item.yxs);
                ctx.stroke();

                // Y 轴刻度值
                ctx.beginPath();
                ctx.fillStyle = option.axis.lineColor;
                ctx.font = '12px';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.fillText(item.y, -8, -item.yxs);

                // 水平横线
                if (drawer.backgroundLine.horizontalLine) {
                    ctx.beginPath();
                    ctx.strokeStyle = drawer.backgroundLine.lineColor;
                    ctx.lineWidth = drawer.backgroundLine.lineWidth;
                    ctx.moveTo(0, -item.yxs);
                    ctx.lineTo(drawer.contentWidth, -item.yxs);
                    ctx.stroke();
                }
            });
            ctx.restore();
        },
        drawAxis(ctx) {
            ctx.save();
            ctx.strokeStyle = option.axis.lineColor;
            ctx.lineWidth = option.axis.lineWidth;

            // Y轴
            ctx.beginPath();
            ctx.moveTo(drawer.ox, drawer.oy);
            ctx.lineTo(drawer.ox, drawer.oy - drawer.winHeight);
            ctx.stroke();
            // X轴
            ctx.beginPath();
            ctx.moveTo(drawer.ox, drawer.oy);
            ctx.lineTo(drawer.ox + drawer.winWidth, drawer.oy);
            ctx.stroke();

            if (option.axis.arrow) {
                // Y轴 箭头
                ctx.beginPath();
                ctx.moveTo(drawer.ox - option.axis.arrowWidth, drawer.oy - drawer.winHeight + option.axis.arrowLength);
                ctx.lineTo(drawer.ox, drawer.oy - drawer.winHeight);
                ctx.lineTo(drawer.ox + option.axis.arrowWidth, drawer.oy - drawer.winHeight + option.axis.arrowLength);
                ctx.stroke();
                // X轴 箭头
                ctx.beginPath();
                ctx.moveTo(drawer.ox + drawer.winWidth - option.axis.arrowLength, drawer.oy - option.axis.arrowWidth);
                ctx.lineTo(drawer.ox + drawer.winWidth, drawer.oy);
                ctx.lineTo(drawer.ox + drawer.winWidth - option.axis.arrowLength, drawer.oy + option.axis.arrowWidth);
                ctx.stroke();
            }

            ctx.restore();
        },
        drawConsole(ctx) { // 底部控制区
            ctx.save();
            ctx.fillStyle = drawer.console.background;
            ctx.fillRect(drawer.console.ox, drawer.console.oy - drawer.console.height, drawer.console.width, drawer.console.height);

            // 数据缩略图
            ctx.save()
            ctx.translate(drawer.console.ox, drawer.console.oy);
            ctx.scale(1, -1);
            ctx.beginPath();
            ctx.fillStyle = drawer.console.dataColor;
            ctx.moveTo(0, 0);
            drawer.console.data.forEach((item) => {
                ctx.lineTo(item.x, item.y);
            });
            // ctx.lineTo(400, drawer.console.height);
            ctx.lineTo(drawer.winWidth - 20, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // 控制区遮罩
            if (!drawer.console.topMove) {
                ctx.fillStyle = drawer.console.topColor;
                ctx.fillRect(drawer.console.ox, drawer.console.oy - drawer.console.height, drawer.console.width, drawer.console.height);
            } else {

                ctx.beginPath();
                ctx.fillStyle = drawer.console.topColor;
                ctx.moveTo(drawer.console.ox + drawer.console.top.start,
                    drawer.console.oy - drawer.console.height);
                ctx.lineTo(drawer.console.ox + drawer.console.top.start + drawer.console.top.width,
                    drawer.console.oy - drawer.console.height);
                ctx.lineTo(drawer.console.ox + drawer.console.top.start + drawer.console.top.width,
                    drawer.console.oy - drawer.console.height + drawer.console.height);
                ctx.lineTo(drawer.console.ox + drawer.console.top.start,
                    drawer.console.oy - drawer.console.height + drawer.console.height);
                ctx.closePath();
                if (drawer.isInPath(ctx)) {
                    drawer.c.style.cursor = 'grab';
                    if ("down" === drawer.event.type) {
                        drawer.event.console = {
                            mouse: drawer.currentPoint.x,
                            x: drawer.console.top.start,
                        }
                    }
                    if ('move' === drawer.event.type && drawer.event.console) {
                        let start = drawer.currentPoint.x - drawer.event.console.mouse + drawer.event.console.x;
                        start = start <= 0 ? 0 : start;
                        console.log('start: ' + start + '  max: ' + drawer.console.top.maxStart);
                        if (start >= drawer.console.top.maxStart) {
                            console.log(111);
                            start = drawer.console.top.maxStart;
                        } else {
                            console.log(222);
                        }
                        // srart = (start >= (drawer.contentWidth - drawer.console.top.width)) ? (drawer.contentWidth - drawer.console.top.width) : start;
                        console.log('start: ' + start + '  max: ' + drawer.console.top.maxStart);
                        drawer.initConsole(start);
                        drawer.initContent();
                    }
                } else {
                    drawer.c.style.cursor = 'default';
                }
                ctx.fill();
            }

            ctx.restore();
        },
        drawContent(ctx) {
            ctx.save();

            // 刻度
            drawer.contentPoints.forEach((item, index) => {
                if (index % drawer.content.markStep == 0) {
                    ctx.beginPath();
                    ctx.strokeStyle = option.axis.lineColor;
                    ctx.lineWidth = option.axis.lineWidth;
                    ctx.moveTo(drawer.ox + item.xxs, drawer.oy);
                    ctx.lineTo(drawer.ox + item.xxs, drawer.oy + 5);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.fillStyle = option.axis.lineColor;
                    ctx.font = '12px';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(item.x, drawer.ox + item.xxs, drawer.oy + 8);

                }
            });

            ctx.strokeStyle = drawer.content.lineColor;
            ctx.lineWidth = drawer.content.lineWidth;

            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.lineJoin = "bevel";
            // ctx.lineTo(drawer.ox + drawer.prevPoint.xxs, drawer.oy - drawer.prevPoint.yxs);
            if (drawer.startY) {
                ctx.lineTo(drawer.ox, drawer.oy - drawer.startY);
            }
            drawer.contentPoints.forEach((item, index) => {
                ctx.lineTo(drawer.ox + item.xxs, drawer.oy - item.yxs);
            });
            if (drawer.endY) {
                ctx.lineTo(drawer.ox + drawer.contentWidth, drawer.oy - drawer.endY);
            }
            ctx.stroke();


            let show = null;
            drawer.contentPoints.forEach((item, index) => {
                ctx.beginPath();
                ctx.fillStyle = drawer.content.pointFillStyle;
                ctx.lineWidth = drawer.content.pointLineWidth;
                ctx.arc(drawer.ox + item.xxs, drawer.oy - item.yxs, drawer.content.pointRadius, 0 , 2 * Math.PI, false);
                if (drawer.isInPath(ctx)) {
                    if ("click" === drawer.event.type) {
                        if (typeof drawer.content.pointClick === 'function') {
                            drawer.content.pointClick({
                                x: item.x,
                                y: item.y,
                                index: item.index
                            });
                        }
                    }
                    show = item;

                }
                ctx.fill();
                ctx.stroke();

            });

            if (show) {
                drawer.showPoint(ctx, show);
            }

            ctx.restore();
        },
        showPoint(ctx, point) {
            ctx.save();
            ctx.translate(drawer.ox + point.xxs, drawer.oy - point.yxs);
            ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
            ctx.fillRect(0, 0, 80, 50);
            ctx.font = 'normal 12px';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText('x: ' + point.x, 10, 12);
            ctx.fillText('y: ' + point.y, 10, 38);
            ctx.restore();
        },
        setPointY(index, y) {
            if (index >= 0 && index < drawer.datas.points.length) {
                option.data.y[index] = y;
                drawer.initDatas();
                drawer.init();
                drawer.draw();
            } else {
                console.log('index 越界');
            }
        },
        bindEvent() {
            drawer.c.addEventListener('mousemove', (e) => {
                drawer.event.type = 'move';
                drawer.currentPoint = drawer.eventToCanvas(e);
                drawer.draw();
            }, false);
            drawer.c.addEventListener('click', (e) => {
                drawer.event.type = 'click';
                drawer.currentPoint = drawer.eventToCanvas(e);
                drawer.draw();
            }, false);
            drawer.c.addEventListener('mousedown', (e) => {
                console.log('mousedown');
                drawer.event.type = 'down';
                drawer.currentPoint = drawer.eventToCanvas(e);;
                drawer.draw();
            }, false);
            drawer.c.addEventListener('mouseup', (e) => {
                console.log('mouseup');
                drawer.currentPoint = drawer.eventToCanvas(e);
                drawer.event.type = 'up';
                drawer.event.console = null;
                drawer.draw();
            }, false);
            drawer.c.addEventListener('mouseout', (e) => {
                drawer.event.type = 'out';
                drawer.currentPoint = null;
                drawer.event.console = null;
            }, false);
        },
        eventToCanvas(e) {
            let box = drawer.c.getBoundingClientRect();
            return {
                x: e.clientX - box.left,
                y: e.clientY - box.top
            };
        },
        windowToCanvas(x, y) {
            let box = drawer.c.getBoundingClientRect();
            return {
                x: x - box.left,
                y: y - box.top
            };
        },
        isInPath(ctx) {
            return drawer.currentPoint && ctx.isPointInPath(drawer.currentPoint.x, drawer.currentPoint.y);
        }
    };
    drawer.start();

    return {
        kit: kit,
        datas: drawer.getData,
        setPointY: drawer.setPointY
    };
};
var num = 6000;
var arr = [];
for (let i = 0; i < num; i++) {
    arr.push((Math.random() * 100).toFixed(4))
}
var x = [...arr.keys()].map((item) => item * 100);
console.log(x);
console.log(new Date().getTime());
var l = line({
    title: '这里是一个标题',
    data: {
        x: x,
        y: arr
    },
    pointClick: function (point) {
        alert('index:' + point.index + ' x: ' + point.x  + ' y: ' + point.y);
    }
});
console.log(new Date().getTime());

var szbtn = document.getElementById('szbtn');
szbtn.addEventListener('click', () => {
    l.setPointY(3, 0);
}, false);
var databtn = document.getElementById('databtn');
databtn.addEventListener('click', () => {
    data = l.datas();
    console.log(data);
}, false);
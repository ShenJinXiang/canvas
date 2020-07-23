function line() {
    let option = {
        backgroundColor: '#fff',
        width: 800,
        height: 500,
        title: {
            text: '这里是标题，真的',
            font: 'bold 14px arial,sans-serif',
            color: '#04a',   // 标题颜色
            align: 'center',
        },
        axis: {  // 坐标轴
            lineWidth: 2,
            lineColor: 'rgba(40, 40, 40, 1)',
            arrow: true,   // 是否绘制坐标轴箭头
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
            topColor: 'rgba(140, 140, 140, 0.5)',
            dataColor: 'rgba(100, 100, 100, 1)',
        },
        data: {
            x: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000],
            y: [5, 15, 10, 25, 10, 15, 30, 15, 10, 15, 5, 25, 10, 15, 10, 12, 10, 15, 17, 11],
        },
        content: {
            xStep: 50,
            lineColor: 'red',
            lineWidth: 2,
            pointRadius: 3,
            pointLineWidth: 1,
            pointFillStyle: '#fff',
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
            initConsole();
            initYAxis();
            initContent();


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

            function initContent() {
                drawer.content = {
                    lineColor: option.content.lineColor,
                    lineWidth: option.content.lineWidth,
                    pointRadius: option.content.pointRadius,
                    pointLineWidth: option.content.pointLineWidth,
                    pointFillStyle: option.content.pointFillStyle,
                }
                let start = drawer.console.top.startX,
                    end = drawer.console.top.endX;
                drawer.contentPoints = [];
                drawer.datas.points.forEach((item, index) => {
                    if (item.x >= start && item.x <= end) {
                        drawer.contentPoints.push({
                            index: index,
                            x: item.x,
                            y: item.y,
                            xxs: drawer.contentWidth * (item.x - drawer.minX) / (drawer.maxX - drawer.minX),
                            yxs: drawer.contentHeight * (item.y - drawer.winYRange[0]) / (drawer.winYRange[1] - drawer.winYRange[0]),
                        });
                    }
                });
                if (drawer.contentPoints[0].index != 0) {
                    let point = drawer.contentPoints[0],
                        prevPoint = drawer.datas.points[point.index - 1];
                    drawer.prevPoint = prevPoint;
                }
                if (drawer.contentPoints[drawer.contentPoints.length - 1].index != drawer.datas.points.length - 1) {
                    let point = drawer.contentPoints[drawer.contentPoints.length - 1],
                        nextPoint = drawer.datas.points[point.index + 1];
                    drawer.nextPoint = nextPoint;
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

            /**
             * 底部控制区
             */
            function initConsole() {
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
                        start: 0,
                        width: drawer.contentWidth * drawer.contentWidth / (option.content.xStep * drawer.datas.x.length),
                    };
                    drawer.console.top.startX = (drawer.maxX - drawer.minX) * drawer.console.top.start / drawer.contentWidth + drawer.minX;
                    drawer.console.top.endX = (drawer.maxX - drawer.minX) * (drawer.console.top.start + drawer.console.top.width) / drawer.contentWidth + drawer.minX;
                } else {
                    drawer.console.topMove = false;
                }
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
                ctx.fillStyle = drawer.console.topColor;
                ctx.fillRect(
                    drawer.console.ox + drawer.console.top.start,
                    drawer.console.oy - drawer.console.height,
                    drawer.console.top.width,
                    drawer.console.height);
            }

            ctx.restore();
        },
        drawContent(ctx) {
            ctx.save();

            ctx.strokeStyle = drawer.content.lineColor;
            ctx.lineWidth = drawer.content.lineWidth;

            ctx.beginPath();
            drawer.contentPoints.forEach((item, index) => {
                ctx.lineTo(drawer.ox + item.xxs, drawer.oy - item.yxs);
            });
            ctx.stroke();

            // drawer.contentPoints.forEach((item, index) => {
            //     ctx.beginPath();
            //     ctx.fillStyle = drawer.content.pointFillStyle;
            //     ctx.lineWidth = drawer.content.pointLineWidth;
            //     ctx.arc(drawer.ox + item.xxs, drawer.oy - item.yxs, drawer.content.pointRadius, 0 , 2 * Math.PI, false);
            //     ctx.fill();
            //     ctx.stroke();
            // });

            ctx.restore();
        },
        bindEvent() {
            drawer.c.addEventListener('mousemove', (e) => {
                // console.log(drawer.eventToCanvas(e));
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
    };
    drawer.start();

    return {
        kit: kit,
        datas: drawer.getData
    };
}

var l = line(),
    data = l.datas();
console.log(data);
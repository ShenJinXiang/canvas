function line() {
    let option = {
        backgroundColor: '#fff',
        width: 600,
        height: 500,
        title: {
            text: '这里是标题，真的',
            font: 'bold 14px arial,sans-serif',
            color: '#04a',   // 标题颜色
        },
        axis: {  // 坐标轴
            lineWidth: 2,
            lineColor: 'rgba(40, 40, 40, 1)',
            arrow: true,   // 是否绘制坐标轴箭头
            arrowLength: 40,
            arrowWidth: 20,
        },
        backgroundLine: {  // 背景线
            lineWidth: 1,
            lineColor: 'rgba(100, 100, 100, 0.6)',
            horizontalLine: true,
            verticalLine: true,
        },
        console: {  // 底部控制台
            height: 30,
            background: 'rgba(200, 200, 200, 1)',
            topColor: 'rgba(140, 140, 140, 0.5)',
            dataColor: 'rgba(100, 100, 100, 1)',
        },
        data: {
            x: [100, 200, 300, 400],
            y: [5, 15, 154, 12],
        }
    };

    const drawer = {
        start() {

        },
    };
    drawer.start();

    const kit = {
        max(arr) {
            return Math.max.apply({}, arr);
        },
        min(arr) {
            return Math.min.apply({}, arr);
        },
        range(num1, num2) {
            let min = Math.min(num1, num2),
                max = Math.max(num1, num2),
                minAbs = Math.abs(min),
                maxAbs = Math.abs(max),
                minLog = Math.log10(minAbs),
                maxLog = Math.log10(maxAbs),
                floor, ceil;
            if (min < 0) {
                floor = -Math.pow(10, Math.ceil(minLog));
            } else {
                floor = Math.pow(10, Math.floor(minLog));
            }
            if (max < 0) {
                ceil = -Math.pow(10, Math.floor(maxLog));
            } else {
                ceil = Math.pow(10, Math.ceil(maxLog));
            }
            return [floor, ceil];
        },
    }


    return {
        kit: kit,
    };
}
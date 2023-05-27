(function() {
    var option = {
        gridWidth: 80,
        lineColor: '#f00',
        // lineColor: '#555',
        gridStyle: 'mi',
        xn: 11,
        yn: 14
    };
    var canvas = document.getElementById('canvas');
    canvas.width = (option.xn + 1) * option.gridWidth;
    canvas.height = (option.yn + 3) * option.gridWidth;
    var ctx = canvas.getContext('2d');

    draw();

    var redBtn = document.getElementById('redBtn');
    var blackBtn = document.getElementById('blackBtn');
    addEvent(redBtn, 'click', function() {
        option.lineColor = '#f00';
        removeClass(blackBtn, 'active');
        addClass(redBtn, 'active');
        draw();
    });

    addEvent(blackBtn, 'click', function() {
        option.lineColor = '#555';
        removeClass(redBtn, 'active');
        addClass(blackBtn, 'active');
        draw();
    });

    var miBtn = document.getElementById('miBtn');
    var tianBtn = document.getElementById('tianBtn');
    addEvent(miBtn, 'click', function() {
        option.gridStyle = 'mi';
        removeClass(tianBtn, 'active');
        addClass(miBtn, 'active');
        draw();
    });
    addEvent(tianBtn, 'click', function() {
        option.gridStyle = 'tian';
        removeClass(miBtn, 'active');
        addClass(tianBtn, 'active');
        draw();
    });
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrids();
        drawTexts();
    }

    function drawGrids() {
        ctx.save();
        ctx.strokeStyle = option.lineColor;
        // ctx.lineWidth = 8;
        // ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 1;

        ctx.translate(0.5 * option.gridWidth, 2 * option.gridWidth);
        if (option.gridStyle == 'tian') {
            drawTianLines();
        } else {
            drawMiLines();
        }
        for (var i = 1; i < option.xn; i++) {
            drawGridLine(i, 0, i, option.yn);
        }
        for (var j = 1; j < option.yn; j++) {
            drawGridLine(0, j, option.xn, j);
        }
        ctx.lineWidth = 3;
        ctx.strokeRect(0, 0, option.xn * option.gridWidth, option.yn * option.gridWidth);
        ctx.restore();
    }

    function drawTexts() {
        ctx.fillStyle = option.lineColor;
        drawTitle();
        drawName();
        drawDate();
        drawBottomTxt();
    }

    function drawTitle() {
        var arr = ['硬', '笔', '书', '法', '纸'];
        ctx.font = 'bold 40px auto';
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.translate(canvas.width / 2, option.gridWidth);
        ctx.fillText(arr[0], -1.6 * option.gridWidth, 0);
        ctx.fillText(arr[1], -0.8 * option.gridWidth, 0);
        ctx.fillText(arr[2], 0, 0);
        ctx.fillText(arr[3], 0.8 * option.gridWidth, 0);
        ctx.fillText(arr[4], 1.6 * option.gridWidth, 0);
        ctx.restore();
    }

    function drawName() {
        ctx.font = '20px cursive';
        ctx.save();
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.translate(0.75 * option.gridWidth, 1.75 * option.gridWidth);
        ctx.fillText("姓名____________", 0, 0);
        ctx.restore();
    }

    function drawDate() {
        ctx.save();
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.translate(canvas.width - 0.75 * option.gridWidth, 1.75 * option.gridWidth);
        ctx.fillText("________年____月____日", 0, 0);
        ctx.restore();
    }

    function drawBottomTxt() {
        ctx.save();
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.translate(0.85 * option.gridWidth, canvas.height - 0.75 * option.gridWidth);
        ctx.fillText("硬笔书法纸", 0, 0);
        ctx.restore();

    }

    function drawTianLines() {
        for (var i = 0; i < option.xn; i++) {
            for (var j = 0; j < option.yn; j++) {
                ctx.save();
                ctx.translate(i * option.gridWidth, j * option.gridWidth);
                ctx.translate(option.gridWidth / 2, option.gridWidth / 2);
                ctx.lineWidth = 0.5;
                ctx.setLineDash([2, 5])
                drawGridLine(0, -0.5, 0, 0.5);
                drawGridLine(-0.5, 0, 0.5, 0);
                ctx.restore();
            }
        }
    }

    function drawMiLines() {
        for (var i = 0; i < option.xn; i++) {
            for (var j = 0; j < option.yn; j++) {
                ctx.save();
                ctx.translate(i * option.gridWidth, j * option.gridWidth);
                ctx.translate(option.gridWidth / 2, option.gridWidth / 2);
                ctx.lineWidth = 0.5;
                ctx.setLineDash([2, 5])
                drawGridLine(-0.5, -0.5, 0.5, 0.5);
                drawGridLine(0.5, -0.5, -0.5, 0.5);
                drawGridLine(0, -0.5, 0, 0.5);
                drawGridLine(-0.5, 0, 0.5, 0);
                ctx.restore();
            }
        }
    }

    function drawGridLine(sx, sy, ex, ey) {
        $c.drawLine(ctx, sx * option.gridWidth, sy * option.gridWidth, ex * option.gridWidth, ey * option.gridWidth);
    }

})();

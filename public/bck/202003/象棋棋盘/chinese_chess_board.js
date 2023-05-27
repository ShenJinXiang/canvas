(function() {
    var option = {
        background: '#fdf5db',
        gridWidth: 80,
        cornerDistance: 6,
        cornerWidth: 14,
        margin: 10,
        borderWidth: 5,
        outerWidth: 40
    };
    var canvas = document.getElementById('canvas');
    canvas.width = 8 * option.gridWidth + 2 * option.margin + 2 * option.outerWidth;
    canvas.height = 9 * option.gridWidth + 2 * option.margin + 2 * option.outerWidth;
    var context = canvas.getContext('2d');
    
    context.save();
    context.strokeStyle = '#444';
    var oWidth = option.outerWidth + option.margin;
    context.fillStyle = option.background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.translate(oWidth, oWidth);
    
    basicLine();
    cornerLine();
    drawText();

    function basicLine() {
        for (var i = 0; i < 10; i++) {
            context.beginPath();
            context.moveTo(0, i * option.gridWidth);
            context.lineTo(8 * option.gridWidth, i * option.gridWidth);
            context.stroke();
        }

        for (var j = 0; j < 9; j++) {
            if (j == 0 || j == 8) {
                drawGridLine(j, 0, j, 9);
            } else {
                drawGridLine(j, 0, j, 4);
                drawGridLine(j, 5, j, 9);
            }
        }

        drawGridLine(3, 0, 5, 2);
        drawGridLine(3, 2, 5, 0);
        drawGridLine(3, 7, 5, 9);
        drawGridLine(3, 9, 5, 7);

        context.lineWidth = option.borderWidth;
        context.strokeRect(-option.margin, -option.margin, 2 * option.margin + 8 * option.gridWidth, 2 * option.margin + 9 * option.gridWidth);
    }

    function cornerLine() {
        var arr = [
            {x: 1, y: 2, cron: [0, 1, 2, 3]},
            {x: 7, y: 2, cron: [0, 1, 2, 3]}, 
            {x: 0, y: 3, cron: [0, 3]},
            {x: 2, y: 3, cron: [0, 1, 2, 3]}, 
            {x: 4, y: 3, cron: [0, 1, 2, 3]}, 
            {x: 6, y: 3, cron: [0, 1, 2, 3]}, 
            {x: 8, y: 3, cron: [1, 2]}, 
            {x: 0, y: 6, cron: [0, 3]}, 
            {x: 2, y: 6, cron: [0, 1, 2, 3]}, 
            {x: 4, y: 6, cron: [0, 1, 2, 3]}, 
            {x: 6, y: 6, cron: [0, 1, 2, 3]}, 
            {x: 8, y: 6, cron: [1, 2]}, 
            {x: 1, y: 7, cron: [0, 1, 2, 3]}, 
            {x: 7, y: 7, cron: [0, 1, 2, 3]}, 
        ]
        arr.forEach(function(item) {
            item.cron.forEach(function(jtem) {
                drawCornerLine(item.x, item.y, jtem);
            });
        });
    }

    function drawText() {
        drawTxt('楚', 1.5, 4.5, false);
        drawTxt('河', 3, 4.5, false);
        drawTxt('漢', 6.5, 4.5, true);
        drawTxt('界', 5, 4.5, true);
    }

    function drawTxt(txt, x, y, flag) {
        context.save();
        context.translate(x * option.gridWidth, y * option.gridWidth);
        var ro = flag ? Math.PI / 2 : -Math.PI / 2;
        context.rotate(ro);
        context.fillStyle = '#000';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold 50px cursive';
        context.fillText(txt, 0, 0);
        context.restore();
    }

    function drawCornerLine(ox, oy, n) {
        context.save();
        context.lineWidth = 1;
        context.translate(ox * option.gridWidth, oy * option.gridWidth);
        context.rotate(n * Math.PI / 2)
        drawLine(option.cornerDistance, option.cornerDistance + option.cornerWidth, option.cornerDistance, option.cornerDistance);
        drawLine(option.cornerDistance, option.cornerDistance , option.cornerWidth + option.cornerDistance, option.cornerDistance);
        context.restore();
    }

    function drawGridLine(sx, sy, ex, ey) {
        drawLine(sx * option.gridWidth, sy * option.gridWidth, ex * option.gridWidth, ey * option.gridWidth);
    }

    function drawLine(sx, sy, ex, ey) {
        context.beginPath();
        context.moveTo(sx, sy);
        context.lineTo(ex, ey);
        context.stroke();
    }


})();

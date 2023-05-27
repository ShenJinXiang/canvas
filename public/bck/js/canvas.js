(function(win) {
    function drawLine(context, sx, sy, ex, ey) {
        context.beginPath();
        context.moveTo(sx, sy);
        context.lineTo(ex, ey);
        context.stroke();
    }

    var rObj = {
        drawLine: drawLine
    };

    win.$c = rObj;
})(window);

(function() {
    let option = {
        timeStep: 100
    };
    function Element(x, y, radius, color, sideNum) {
    }
    let drawer = {
        start: function() {
            drawer.c = document.getElementById('canvas');
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = drawer.getMarkCanvas('#999');
            drawer.animate();
            drawer.bindEvent();
        },
        bindEvent: function() {
            $(window).resize(function() {
            });
        },
        animate: function() {
            // if (drawer.currentTime === 0) {
                drawer.draw();
            // }
            // drawer.update();
            // requestAnimationFrame(drawer.animate);
        },
        update: function() {
        },
        draw: function() {
            drawer.drawMark(drawer.ctx, drawer.mark);
        },
        getMarkCanvas: function(fillStyle) {
            let markCanvas = document.createElement('canvas');
            markCanvas.width = 240;
            markCanvas.height = 60;
            let ctx = markCanvas.getContext('2d');

            ctx.fillStyle = fillStyle ? fillStyle : 'rgba(250, 250, 250, 0.5)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '30px cursive';
            ctx.fillText('shenjinxiang.com', markCanvas.width / 2, markCanvas.height / 2 );
            return markCanvas;
        },
        drawMark: function(ctx, mark) {
            ctx.drawImage(mark, ctx.canvas.width - mark.width, ctx.canvas.height - mark.height);
        }
    };
    drawer.start();
})();

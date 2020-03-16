(function() {
    let canvas = document.getElementById('canvas'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        context = canvas.getContext('2d'),
        grid = 6,
        tempCanvas = document.createElement('canvas'),
        tempContext = tempCanvas.getContext('2d');
        
        tempCanvas.width = w;
        tempCanvas.height =h;
    let ps = [];
    getPixels(context);
    console.log(ps);
    ps.forEach(function(item) {
        debugger
        drawPartical(item.x, item.y);
    });

    function getPixels(ctx) {
        ctx.textAlign = 'let';
        ctx.textBaseline = 'middle';
        ctx.font = '400px cursive';
        ctx.fillText('A', 0, 0);
        debugger
        let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        let buffer32 = new Uint32Array(imgData.data.buffer);
        
        for (let y = 0; y < ctx.canvas.height; y += 6) {
            for (let x = 0; x < ctx.canvas.width; x += 6) {
                if (buffer32[y * ctx.canvas.width + x]) {
                    ps.push({x: x, y: y});
                }
            }
        }
    }

    function drawPartical(x, y) {
        debugger
        context.save();
        context.translate(x, y);
        context.fillStyle = 'red';
        context.fillRect(0, 0, 5, 5);
        context.restore();
    }


    
})();

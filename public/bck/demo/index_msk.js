{
    const option = {
        borderWidth: 1,
        cellWidth: 4,
        backgroundColor: '#003349',
        borderColor: '#002B3D',
        fontColor: '#3DE3C9'
    };

    class Element {
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.drawGrid();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
        },
        drawGrid() {
            const {ctx} = drawer;
            const {borderWidth, cellWidth, backgroundColor, borderColor} = option,
                cellDistance = borderWidth + cellWidth;
            ctx.save();
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, drawer.w, drawer.h);

            ctx.fillStyle = borderColor;
            for (let x = cellWidth; x < drawer.w; x += cellDistance) {
                ctx.fillRect(x, 0, borderWidth, drawer.h);
            }
            for (let y = cellWidth; y < drawer.h; y += cellDistance) {
                ctx.fillRect(0, y, drawer.w, borderWidth);
            }
            ctx.restore();
        }
    };
    drawer.start();
}

{
    const option = {
        lineLength: 100,
        lineWidth: 3,
        lineSpace: 21,
        lineColors: ['coral', 'Cyan'],
        arrowStyle: '#ddd',

    };

    class Element {
        constructor(point, lineLength, lineWidth, lineStyle, isArrow, angle, angleStep, arrowStyle) {
            this.point = point;
            this.lineLength = lineLength;
            this.lineWidth = lineWidth;
            this.lineStyle = lineStyle;
            this.angle = angle;
            this.angleStep = angleStep;
            this.arrowStyle = arrowStyle;
        }
        update() {

        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.point.x, this.point.y);
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.lineStyle;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, this.lineLength);
            ctx.stroke();
            ctx.restore();
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.mark = CanvasUtil.getMarkCanvas();
            drawer.init();
            drawer.animate();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.initElements();
            console.log(drawer.elements);
        },
        animate() {
            drawer.draw();
        },
        draw() {
            let ctx = drawer.ctx;
            drawer.elements.forEach((item) => item.draw(ctx));
        },
        initElements() {
            drawer.elements = [];
            for (let y = -option.lineLength / 2, ny = 0; y < drawer.h + option.lineLength / 2; y += option.lineLength, ny++) {
                for (let x = 2 * option.lineSpace / 3; x < drawer.w; x += option.lineSpace) {
                    if (ny % 2 === 0) {
                        drawer.elements.push(new Element(
                            {x, y},
                            option.lineLength,
                            option.lineWidth,
                            option.lineColors[0],
                            true
                        ));
                    } else {
                        drawer.elements.push(new Element(
                            {x, y},
                            option.lineLength,
                            option.lineWidth,
                            option.lineColors[1],
                            false,
                        ));
                    }
                }
            }
        }
    };
    drawer.start();
}
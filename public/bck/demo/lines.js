{
    const option = {
        lineWidth: 1,
        lineLength: 10,
        num: 3,
        times: [300, 400],

    };
    class Element {
        constructor(point, angle, length, width, style) {
            this.point = point;
            this.angle = angle;
            this.length = length;
            this.width = width;
            this.style = style;

            this.start = this.point;
            this.end = {
                x: this.start.x + this.length * Math.cos(this.angle),
                y: this.start.y + this.length * Math.sin(this.angle)
            };
        }
        draw(ctx, origin) {
            ctx.save();
            origin = origin ? origin: {x: 0, y: 0};
            ctx.translate(this.point.x - origin.x, this.point.y - origin.y);
            ctx.strokeStyle = this.style;
            ctx.lineWidth = this.width;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(this.length * Math.cos(this.angle), this.length * Math.sin(this.angle));
            ctx.stroke();
            ctx.restore();
        }
        reverse() {
            let temp = this.start;
            this.start = this.end;
            this.end = temp;
            this.angle = Math.PI - this.angle;
        }
    }

    class ElementGroup {
        constructor(elemnts, time1, time2) {
            this.elements = elemnts;
            this.time1 = time1;
            this.time2 = time2;
            this.start = this.elements[0].start;
            this.end = this.elements[this.elements.length - 1].end;
            this.status = 0;

            this.angleStep = Math.PI / 2 / this.time2;
            this.time1Count = 0;
            this.time2Count = 0;
        }
        update() {
            if (this.status === 0) {
                this.time1Count++;
                if (this.time1Count >= this.time1) {
                    this.start = 1;
                }
            }
            if (this.status === 1) {
                this.angle = this.angleStep * this.time2Count;
                this.time2Count++;
                if (this.time2Count >= this.time2) {
                    this.status = 2;
                }
            }
        }
        draw(ctx) {
            this.elements.forEach((item) => {
                item.draw(ctx);
            });
            if (this.status === 1) {
                ctx.save();
                ctx.restore();
            }
        }

    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.initElements();
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;

        },
        initElements() {
            drawer.elements = [];
            for (let i = 0; i < option.num; i++) {

            }
        }
    };
    drawer.start();
}
{
    const option = {
		dateColor: '#048',

    }

    class Element {
        constructor(width, height, radius, char, color) {
            this.width = width;
            this.height = height;
            this.radius = radius;
            this.char = char;
            this.color = color;
            this.init();
        }
        init() {
            this.c = document.createElement('canvas');
            this.ctx = this.c.getContext('2d');
            this.c.width = this.width;
            this.c.height = this.height;
            this.ctx.save();
            this.ctx.translate(this.width / 2, this.height / 2);
            this.ctx.fillStyle = 'red';
            this.ctx.font = 'bolder ' + this.height + 'px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.char, 0, 0);
            this.ctx.restore();
            this.imgData = this.ctx.getImageData(0, 0, this.width, this.height);
            this.buffer = new Uint32Array(this.imgData.data.buffer);
            this.points = this.getPoints(this.radius);
        }
        getBuffer() {
            return this.buffer;
        }
        getCanvas() {
            return this.c;
        }
        getPoints(radius) {
            let ps = [];
            for (let y = 0; y < Math.floor(this.height); y += (radius + .5) * 2) {
                for (let x = 0; x < Math.floor(this.width); x += (radius + .5) * 2) {
                    if (this.buffer[y * Math.floor(this.width) + x]) {
                        ps.push(new Point(x, y));
                    }
                }
            }
            return ps;
        }
        drawPoints(ctx, sx, sy) {
            ctx.save();
            ctx.translate(sx, sy);
            this.points.forEach((item) => {
                item.draw(ctx, this.radius, this.color)
            });
            ctx.restore();
        }
    }

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        draw(ctx, radius, color) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        }
    }

	class Ball {
		constructor(point, radius, vx, vy, ax, ay, color) {
			this.point = point;
			this.radius = radius;
			this.vx = vx;
			this.vy = vy;
			this.ax = ax;
			this.ay = ay;
			this.color = color;
		}
		update(maxY) {
			this.point.x += this.vx;
			this.point.y += this.vy;
			this.vx += this.ax;
			this.vy += this.ay;
			if (this.point.y >= maxY) {
				this.vy = -this.vy;
			}
		}
		draw(ctx) {
		    this.point.draw(ctx, this.radius, this.color);
        }
	}

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.initElements();
            drawer.elements.forEach((item, index) => {
                item.drawPoints(drawer.ctx, index * drawer.elementWidth, 0);
            });
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.elementWidth = Math.floor(drawer.w * 0.6 / 7);
            drawer.elementHeight = drawer.elementWidth * 1.5;
            drawer.ballRadius = Math.floor(drawer.elementWidth / 20);
        },
        initElements() {
            drawer.elements = [
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '0', option.dateColor),
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '1', option.dateColor),
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '2', option.dateColor),
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '3', option.dateColor),
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '4', option.dateColor),
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '5', option.dateColor),
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '6', option.dateColor),
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '7', option.dateColor),
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '8', option.dateColor),
                new Element(drawer.elementWidth, drawer.elementHeight, drawer.ballRadius, '9', option.dateColor),
                new Element(drawer.elementWidth / 2, drawer.elementHeight, drawer.ballRadius, ':', option.dateColor),
            ];
        },
    };
    drawer.start();
}

{
    const option = {

    }

    class Element {
        constructor(width, height, char) {
            this.width = width;
            this.height = height;
            this.char = char;
            this.init();
        }
        init() {
            this.c = document.createElement('canvas');
            this.ctx = this.c.getContext('2d');
            this.c.width = this.width;
            this.c.height = this.height;
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(0, 0, this.width, this.height);
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
        }
        getBuffer() {
            return this.buffer;
        }
        getCanvas() {
            return this.c;
        }
    }

    const drawer = {
        start() {
            drawer.c = document.getElementById('canvas');
            drawer.ctx = drawer.c.getContext('2d');
            drawer.init();
            drawer.initElements();
            drawer.elements.forEach((item, index) => {
                drawer.ctx.drawImage(item.getCanvas(), index * drawer.elementWidth, 0);
            });
        },
        init() {
            drawer.w = drawer.c.width = window.innerWidth;
            drawer.h = drawer.c.height = window.innerHeight;
            drawer.elementWidth = drawer.w * 0.6 / 7;
            drawer.elementHeight = drawer.elementWidth * 1.5;
        },
        initElements() {
            drawer.elements = [
                new Element(drawer.elementWidth, drawer.elementHeight, '0'),
                new Element(drawer.elementWidth, drawer.elementHeight, '1'),
                new Element(drawer.elementWidth, drawer.elementHeight, '2'),
                new Element(drawer.elementWidth, drawer.elementHeight, '3'),
                new Element(drawer.elementWidth, drawer.elementHeight, '4'),
                new Element(drawer.elementWidth, drawer.elementHeight, '5'),
                new Element(drawer.elementWidth, drawer.elementHeight, '6'),
                new Element(drawer.elementWidth, drawer.elementHeight, '7'),
                new Element(drawer.elementWidth, drawer.elementHeight, '8'),
                new Element(drawer.elementWidth, drawer.elementHeight, '9'),
                new Element(drawer.elementWidth / 2, drawer.elementHeight, ':'),
            ];
        }
    };
    drawer.start();
}
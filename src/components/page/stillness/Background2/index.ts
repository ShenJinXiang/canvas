import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
    showColor: string;
    minSize: number;
}

class Element1 {
    private x: number;
    private y: number;
    private s: number;
    private size: number;
    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.s = this.size / (2 * 4 * Math.sqrt(2));
    }
    draw(context: CanvasRenderingContext2D | null, showColor: string) {
        if (!context) {
            return;
        }
        context.save();
        context.translate(this.x + this.size / 2, this.y + this.size / 2);
        context.strokeStyle = showColor;
        for (let i = 0; i < 4; i++) {
            context.save();
            context.beginPath();
            context.lineWidth = this.s;
            context.lineCap = 'square';
            context.rotate(Math.PI / 4 + i * Math.PI / 2);
            context.moveTo(0, 0);
            context.lineTo(2 * this.s, 0);
            context.lineTo(2 * this.s, -2 * this.s);
            context.lineTo(4 * this.s, -2 * this.s);
            context.lineTo(4 * this.s, 4 * this.s);
            context.stroke();
            context.restore();
        }
        context.restore();
    }
}

class Element2 {
    private x: number;
    private y: number;
    private r: number;
    private s: number;
    private angle1: number;
    private angle2: number;
    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.s = this.r / 6;
        this.angle1 = Math.atan(1 / 6);
        this.angle2 = Math.atan(1 / 3);
    }
    draw(context: CanvasRenderingContext2D | null, showColor: string) {
        if (!context) {
            return;
        }
        context.save();
        context.strokeStyle = showColor;
        context.translate(this.x, this.y);
        context.lineWidth = this.s;
        
        context.beginPath();
        context.moveTo(-this.r - this.s / 2, 0);
        context.lineTo(this.r + this.s / 2, 0);
        context.stroke();

        context.beginPath();
        context.lineTo(this.r * Math.cos(Math.PI / 2 - this.angle1) + this.s, 4 * this.s);
        context.lineTo(this.r * Math.cos(Math.PI / 2 - this.angle1), 4 * this.s);
        context.arc(0, 0, this.r, Math.PI / 2 - this.angle1, this.angle2, true)
        context.arc(0, 0, this.r, Math.PI - this.angle2, Math.PI / 2 + this.angle1, true)
        context.lineTo(this.r * Math.cos(Math.PI / 2 + this.angle1), 4 * this.s);
        context.lineTo(this.r * Math.cos(Math.PI / 2 + this.angle1) - this.s, 4 * this.s);
        context.stroke();

        context.beginPath();
        context.arc(0, 0, this.r, this.angle2 - Math.PI / 2, - this.angle2, false)
        context.arc(0, 0, this.r, Math.PI + this.angle2, -this.angle2 - Math.PI / 2, false)
        context.stroke();

        context.beginPath();
        context.moveTo(-1.5 * this.s, -4 * this.s);
        context.lineTo(1.5 * this.s, -4 * this.s);
        context.stroke();

        context.beginPath();
        context.moveTo(0, -6 * this.s);
        context.lineTo(0, 0);
        context.stroke();

        context.restore();
    }
}

export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#8b0903',
        showColor: '#f8c687',
        minSize: 40
    };
    private element1s: Element1[] = [];
    private element2s: Element2[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.markCanvas.setStyle('rgba(250, 250, 250, 0.5)');
        this.initData();
    }

    initData() {
        this.element1s = [];
        this.element2s = [];
        let size = Math.min(this.width, this.height) / 10;
        size = size < Background.option.minSize ? Background.option.minSize : size;
        for (let i = 0; i * size < this.width + size; i++) {
            for (let j = 0; j * size < this.height + size; j++) {
                this.element1s.push(new Element1(i * size, j * size, size));
                this.element2s.push(new Element2(i * size, j * size, 0.25 * size));
            }
        }
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(Background.option.backgroundColor);
        this.element1s.forEach((element) => {element.draw(this.context, Background.option.showColor);});
        this.element2s.forEach((element) => {element.draw(this.context, Background.option.showColor);});
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}
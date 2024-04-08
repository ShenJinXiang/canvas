import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
    showColor: string;
}

class Element {
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
        // context.strokeStyle = '#fff';
        // context.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
        context.strokeStyle = showColor;
        for (let i = 0; i < 4; i++) {
            context.save();
            context.beginPath();
            context.lineWidth = this.s;
            context.rotate(Math.PI / 4 + i * Math.PI / 2);
            context.moveTo(0, 0);
            context.lineTo(2 * this.s, 0);
            context.lineTo(2 * this.s, -2 * this.s);
            context.lineTo(4 * this.s, -2 * this.s);
            context.lineTo(4 * this.s, 4 * this.s);
            context.stroke();
            context.restore();
        }
        // context.fillRect(-this.size / 4, -this.size / 4, this.size / 2, this.size / 2);
        context.restore();
    }
}

export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#8b0903',
        showColor: '#f8c687',
    };
    private elements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        this.elements = [];
        let size = this.width / 10;
        for (let i = 0; i < 10; i++) {
            this.elements.push(new Element(0.5 * this.width - 1.5 * size, 0.5 * this.height - 1.5 * size, size));
            this.elements.push(new Element(0.5 * this.width - 0.5 * size, 0.5 * this.height - 1.5 * size, size));
            this.elements.push(new Element(0.5 * this.width + 0.5 * size, 0.5 * this.height - 1.5 * size, size));
            this.elements.push(new Element(0.5 * this.width - 1.5 * size, 0.5 * this.height - 0.5 * size, size));
            this.elements.push(new Element(0.5 * this.width - 0.5 * size, 0.5 * this.height - 0.5 * size, size));
            this.elements.push(new Element(0.5 * this.width + 0.5 * size, 0.5 * this.height - 0.5 * size, size));
            this.elements.push(new Element(0.5 * this.width - 1.5 * size, 0.5 * this.height + 0.5 * size, size));
            this.elements.push(new Element(0.5 * this.width - 0.5 * size, 0.5 * this.height + 0.5 * size, size));
            this.elements.push(new Element(0.5 * this.width + 0.5 * size, 0.5 * this.height + 0.5 * size, size));
        }
    }

    draw(): void {
        this.clear();
        if (!this.context) {
            return;
        }
        this.clear(Background.option.backgroundColor);
        // this.clear();
        this.elements.forEach((element) => {
            element.draw(this.context, Background.option.showColor);
        });
    }
}
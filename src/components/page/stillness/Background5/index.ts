import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
    showColor: string;
    rotate: number;
}

class Element {
    private x: number;
    private y: number;
    private rotate: number;
    private size: number;
    private l: number;
    constructor(x: number, y: number, size: number, rotate: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotate = size;
        this.l = 0.5 * this.size;
    }
    draw(context: CanvasRenderingContext2D | null, showColor: string) {
        if (!context) {
            return;
        }
        context.save();
        context.translate(this.x, this.y);
        context.strokeStyle = showColor;
        context.moveTo(-this.l * Math.cos(this.rotate), this.l * Math.sin(this.rotate));
        context.lineTo(0, 0);
        context.lineTo(this.l * Math.cos(this.rotate), this.l * Math.sin(this.rotate));
        context.stroke();
        context.restore();
    }
}


export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#000',
        showColor: '#fff',
        rotate: Math.PI / 6
    };
    private elements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.markCanvas.setStyle('rgba(250, 250, 250, 0.5)');
        this.initData();
    }
    initData() {
        this.elements = [
            new Element(0.5 * this.width, 0.5 * this.height, 0.1 * this.width, Background.option.rotate)
        ];
    }
    draw() {
        if (!this.context) {
            return;
        }
        this.clear(Background.option.backgroundColor);

        this.context.save();
        this.elements.forEach(item => item.draw(this.context, Background.option.showColor));
        this.context.restore();
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}
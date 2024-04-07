import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
    showColor: string;
}

class Element {
    private x: number;
    private y: number;
    private size: number;
    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw(context: CanvasRenderingContext2D | null) {
        if (!context) {
            return;
        }
        context.save();
        // context.translate(this.x, this.y);
        context.translate(this.x + this.size / 2, this.y + this.size / 2);
        context.fillStyle = '#f8c687';
        // context.fillRect(-this.size / 4, -this.size / 4, this.size / 2, this.size / 2);
        context.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
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
        for (let i = 0; i < 10; i++) {
            this.elements.push(new Element(this.width / 2 - this.width / 20, this.height / 2 - this.width / 20, this.width / 10));
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
            element.draw(this.context);
        });
    }
}
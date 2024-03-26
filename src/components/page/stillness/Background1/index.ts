import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
    showColor: string;
}

class Element {
    private x: number;
    private y: number;
    private radius: number;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
    }

    data(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        return this;
    }

    draw(context: CanvasRenderingContext2D | null, style: string, backgroundColor: string) {
        if (!context) {
            return;
        }
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        context.closePath();
        context.restore();
    }
}

export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#a00000',
        showColor: '#fdc287',
    };
    private elements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
    }
    initData() {
        const size = this.width * 0.025 < 30 ? 30 : this.width * 0.025;
        const yStep = size * 0.5;
        const xStep = size * 2;
        for (let yIndex = 0; yIndex * yStep < this.height + size; yIndex += 1) {
            for (let xIndex = 0; xIndex * xStep < this.width + size; xIndex += 1) {
                if (yIndex % 2 === 0) {
                    this.elements.push(
                        new Element().data(xIndex * xStep, yIndex * yStep, size)
                    );
                } else {
                    this.elements.push(
                        new Element().data(xIndex * xStep + size, yIndex * yStep, size)
                    );
                }
            }
        }
    }
    draw() {
        if (!this.context) {
            return;
        }
        this.clear(Background.option.backgroundColor);

        this.context.save();
        this.context.restore();
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}
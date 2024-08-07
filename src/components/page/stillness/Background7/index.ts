import BaseCanvas from "@/lib/BaseCanvas";
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    showColor: string;
    minSize: number;
}

class Element {
    private x: number;
    private y: number;
    private radius: number;
    private points: Point[] = [];
    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        const angleStep = Math.PI / 3;
        const startAngle = -Math.PI / 2;
        for (let i = 0; i < 6; i++) {
            this.points.push({
                x: this.radius * Math.cos(angleStep * i + startAngle),
                y: this.radius * Math.sin(angleStep * i + startAngle)
            });
        }
    }
    draw(context: CanvasRenderingContext2D | null, showColor: string) {
        if (!context) {
            return;
        }
        context.save();
        context.translate(this.x, this.y);
        context.beginPath();
        context.strokeStyle = showColor;
        this.points.forEach((p) => context.lineTo(p.x, p.y));
        context.closePath();
        context.stroke();
        context.restore();
    }
}

export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#000',
        showColor: '#fff',
        minSize: 40
    };
    private elements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.markCanvas.setStyle('rgba(250, 250, 250, 0.5)');
        this.initData();
    }
    initData() {
        this.elements = [];
        const radius = this.width / 30;
        const margin = 2 * radius;
        const xStep = 2 * radius * Math.cos(Math.PI / 6);
        const yStep = 1.5 * radius
        for (let y = 0; -margin + y * yStep < this.height + margin; y++) {
            for (let x = 0; -margin + x * xStep < this.width + margin; x++) {
                const startX = y % 2 == 0 ? -margin : -margin + radius * Math.cos(Math.PI / 6);
                this.elements.push(new Element(startX + x * xStep, -margin + y * yStep, radius));
            }
        }
    }
    draw() {
        if (!this.context) {
            return;
        }
        this.clear(Background.option.backgroundColor);

        this.context.save();
        this.elements.forEach((item) => item.draw(this.context, Background.option.showColor));
        this.context.restore();
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}
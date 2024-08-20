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
    private dPoints: Point[] = [];
    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.initData();
    }
    private initData() {
        const angleStep = Math.PI / 3;
        const startAngle = -Math.PI / 2;
        for (let i = 0; i < 6; i++) {
            this.points.push({
                x: this.radius * Math.cos(angleStep * i + startAngle),
                y: this.radius * Math.sin(angleStep * i + startAngle)
            });
        }
        const r = this.radius * 0.25;
        this.dPoints.push({ x: r * Math.cos(startAngle), y: r * Math.sin(startAngle) });
        this.dPoints.push({ x: this.dPoints[0].x + 2 * r * Math.cos(Math.PI / 6), y: this.dPoints[0].y + 2 * r * Math.sin(Math.PI / 6)});
        this.dPoints.push({ x: this.dPoints[1].x + 2 * r * Math.cos(Math.PI / 2), y: this.dPoints[1].y + 2 * r * Math.sin(Math.PI / 2)});
        this.dPoints.push({ x: this.dPoints[2].x + 3 * r * Math.cos(5 * Math.PI / 6), y: this.dPoints[2].y + 3 * r * Math.sin(5 * Math.PI / 6)});
    }
    draw(context: CanvasRenderingContext2D | null, showColor: string) {
        if (!context) {
            return;
        }
        context.save();
        context.translate(this.x, this.y);
        this.drawLine(context, this.points, showColor);
        const angleStep = Math.PI / 3;
        for (let i = 0; i < 6; i++) {
            context.rotate(angleStep);
            this.drawLine(context, this.dPoints, showColor);
        }
        context.restore();
    }
    drawLine(context: CanvasRenderingContext2D, points: Point[], showColor: string) {
        context.strokeStyle = showColor;
        const path = new Path2D();
        points.forEach(p => path.lineTo(p.x, p.y));
        context.stroke(path);
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
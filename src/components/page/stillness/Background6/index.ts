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
    private sRadius: number;
    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sRadius = this.radius * 0.05;
        this.points = [];
        const aStep = 2 * Math.PI / 6;
        for (let i = 0; i < 6; i++) {
            this.points.push({x: this.radius * Math.cos(i * aStep), y: this.radius * Math.sin(i * aStep)});
        }
    }

    draw(context: CanvasRenderingContext2D | null, showColor: string) {
        if (!context) {
            return;
        }
        context.save();
        context.translate(this.x, this.y);
        this.drawLines(context, this.points, showColor);
        context.fillStyle = showColor;
        this.points.forEach((item, index) => {
            if (index % 2 !== 0) {
                return;
            }
            this.drawLines(context, [{x: 0, y: 0}, item], showColor);
            context.beginPath();
            context.arc(item.x, item.y, this.sRadius, 0, 2 * Math.PI, false);
            context.fill();
        });
        context.restore();
    }

    private drawLines(context: CanvasRenderingContext2D, ps: Point[], showColor: string) {
        context.strokeStyle = showColor;
        context.beginPath();
        ps.forEach((item) => context.lineTo(item.x, item.y));
        context.closePath();
        context.stroke();
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
        const size = this.width / 10;
        this.elements = [
            new Element(0.5 * this.width, 0.5 * this.height, size / 2)
        ];
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
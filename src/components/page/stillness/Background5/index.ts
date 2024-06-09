import BaseCanvas from "@/lib/BaseCanvas";
import { StrokeOption } from "@/lib/DrawOption";
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    showColor1: string;
    showColor2: string;
    rotate: number;
    minSize: number;
}

class Element {
    private x: number;
    private y: number;
    private rotate: number;
    private size: number;
    private l: number;
    private points: Point[] = [];
    constructor(x: number, y: number, size: number, rotate: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.rotate = rotate;
        this.l = 0.5 * this.size;
        this.initPoints();
    }
    private initPoints() {
        this.points.push({x: this.x, y: this.y});
        this.points.push({x: this.x - this.l, y: this.y + this.l / Math.tan(this.rotate)});
        this.points.push({x: this.x + this.l, y: this.y + this.l / Math.tan(this.rotate)});
        this.points.push({x: this.points[0].x, y: this.points[0].y + this.l * 0.2});
        this.points.push({x: this.points[1].x, y: this.points[1].y + this.l * 0.2});
        this.points.push({x: this.points[2].x, y: this.points[2].y + this.l * 0.2});
    }
    private joinLines(context: CanvasRenderingContext2D, points: Point[], strokeStyle: string = '#fff', lineWidth: number = 1) {
        context.beginPath();
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        points.forEach(p => context.lineTo(p.x, p.y));
        context.stroke();
    }
    draw(context: CanvasRenderingContext2D | null, showColor1: string, showColor2: string) {
        if (!context) {
            return;
        }
        context.save();
        this.joinLines(context, [this.points[1], this.points[0], this.points[2]], showColor1);
        this.joinLines(context, [this.points[4], this.points[3], this.points[5]], showColor1);
        this.joinLines(context, [this.points[0], this.points[3]], showColor2);
        this.joinLines(context, [this.points[1], this.points[4]], showColor2);
        // this.joinLines(context, [this.points[2], this.points[5]]);
        context.restore();
    }
}


export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#000',
        showColor1: '#fff',
        showColor2: '#696a64',
        rotate: Math.PI / 3,
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
        let size = this.width / 18;
        size = size < Background.option.minSize ? Background.option.minSize : size;
        let hSize = 0.5 * size / Math.tan(Background.option.rotate) + 0.1 * size;
        for (let y = 0; y * hSize < this.height; y++ ) {
            for (let x = 0; x * size < this.width + size; x++) {
                this.elements.push(new Element(y % 2 === 0 ? x * size : (x + 0.5)  * size, y * hSize, size, Background.option.rotate));
            }
        }
    }
    draw() {
        if (!this.context) {
            return;
        }
        this.clear(Background.option.backgroundColor);

        this.context.save();
        this.elements.forEach(item => item.draw(this.context, Background.option.showColor1, Background.option.showColor2));
        this.context.restore();
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}
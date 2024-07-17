import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    showColor: string;
}

const OPTION: IOption = {
    backgroundColor: '#000',
    showColor: '#fdc287'
}

class Element {
    private txt: string;
    private angle: number = 0;
    private radius: number = 0;
    private angleStep: number;
    private point: Point;
    constructor(txt: string, radius: number, angleStep: number) {
        this.txt = txt;
        this.radius = radius;
        this.angle = 0;
        this.angleStep = angleStep;
        this.point = this.position();
    }

    reset() {
        this.angle = 0;
        this.point = this.position();
    }

    position(): Point {
        return {
            x: this.radius * Math.cos(this.angle),
            y: this.radius * Math.sin(this.angle)
        }

    }

    update() {
        this.angle += this.angleStep;
        this.point = this.position();
    }

    draw(context: CanvasRenderingContext2D | null, ele: Element) {
        if (!context) {
            return;
        }
        context.save();
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = OPTION.showColor;
        context.moveTo(this.point.x, this.point.y);
        context.lineTo(ele.point.x, ele.point.y);
        context.stroke();
        context.restore();
    }
}

export default class RotateConstructionAnimation extends Animate {
    private elements: Element[] = [];
    private radius: number = 0;
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    private initData() {
        this.radius = Math.min(this.width, this.height) * 0.4;
        this.elements = [
            new Element('A', this.radius, Math.PI / 96),
            new Element('B', this.radius, Math.PI / 40),
        ];
    }

    update(): void {
        this.elements.forEach((item) => item.update());
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        // this.clear(OPTION.backgroundColor);
        this.context.save();
        // this.context.fillStyle = "red";
        // this.context.fillRect(200, 200, 400, 230);
        this.context.translate(0.5 * this.width, 0.5 * this.height);
        this.drawArc();
        this.elements[0].draw(this.context, this.elements[1]);
        this.context.restore();
    }

    drawArc() {
        if (!this.context) {
            return;
        }
        this.context.beginPath();
        this.context.strokeStyle = OPTION.showColor;
        this.context.lineWidth = 2;
        this.context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
        this.context.stroke();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
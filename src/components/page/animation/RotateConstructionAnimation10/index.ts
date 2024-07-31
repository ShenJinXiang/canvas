import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    showColor: string;
    textColor: string;
    lineLength: number;
}

const OPTION: IOption = {
    backgroundColor: '#000',
    // showColor: '#088',
    showColor: 'rgba(0, 80, 200, 0.5)',
    textColor: '#fff',
    lineLength: 5000
}

class Element {
    private txt: string;
    private angle: number = 0;
    private radius: number = 0;
    private angleStep: number;
    private point: Point;
    private pointRadius: number = 2;
    private fontSize: number = 10;
    constructor(txt: string, radius: number, angleStep: number) {
        this.txt = txt;
        this.radius = radius;
        this.angle = 0;
        this.angleStep = angleStep;
        this.point = this.position();
        this.pointRadius = this.radius * 0.01;
        this.fontSize = this.radius * 0.05;
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

    draw(context: CanvasRenderingContext2D | null) {
        if (!context) {
            return;
        }
        context.save();
        context.fillStyle = OPTION.textColor;
        context.font = `${this.fontSize}px bold`;
        context.fillText(this.txt, this.point.x - this.fontSize, this.point.y);

        context.beginPath();
        context.arc(this.point.x, this.point.y, this.pointRadius, 0, 2 * Math.PI, false);
        context.fill();
        context.restore();
    }
}

class Line {
    private start: Point;
    private end: Point;
    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
    }
    draw(context: CanvasRenderingContext2D | null) {
        if (!context) {
            return;
        }
        context.save();
        context.strokeStyle = OPTION.showColor;
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.y);
        context.stroke();
        context.restore();
    }
}

export default class RotateConstructionAnimation extends Animate {
    private a: Element = new Element('A', 0, Math.PI / 240);
    private b: Element = new Element('B', 0, Math.PI / 240);
    private radius: number = 0;
    private lines: Line[] = [];
    private count = 0;
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    private initData() {
        this.lines = [];
        this.radius = Math.min(this.width, this.height) * 0.4;
        this.a = new Element('A', this.radius, Math.PI / 240);
        this.b = new Element('B', this.radius, Math.PI / 300);
    }

    update(): void {
        this.a.update();
        this.b.update();
        this.count++;
        if (this.count >= 10) {
            this.lines.push(new Line(this.a.position(), this.b.position()));
            this.count = 0;
        }
        if (this.lines.length > OPTION.lineLength) {
            this.lines.shift();
        }
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(OPTION.backgroundColor);
        this.context.save();
        // this.context.fillStyle = "red";
        // this.context.fillRect(200, 200, 400, 230);
        this.context.translate(0.5 * this.width, 0.5 * this.height);
        this.lines.forEach((item) => item.draw(this.context));
        this.drawArc();
        this.a.draw(this.context);
        this.b.draw(this.context);
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
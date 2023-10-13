import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

const PI = Math.PI;
const PPI = PI / 360;

interface IOption {
    backgroundColor: string;
};

class Element {
    private origin: Point;
    private baseRadius: number;
    private radius: number;
    private angle: number;
    private minAngle: number;
    private maxAngle: number;
    private angleStep: number;
    private color: string;
    private currentPoint: Point;
    constructor(origin: Point, baseRadius: number, radius: number, startAngle: number, endAngle: number, angleStep: number, color: string) {
        this.origin = origin;
        this.baseRadius = baseRadius;
        this.radius = radius;
        this.angle = startAngle;
        this.minAngle = Math.min(startAngle, endAngle);
        this.maxAngle = Math.max(startAngle, endAngle);
        this.angleStep = angleStep;
        this.color = color;
        this.currentPoint = { x: origin.x, y: origin.y };
    }

    update() {
        this.angle += this.angleStep;
        if (this.angle >= this.maxAngle) {
            this.angle = this.maxAngle - (this.angle - this.maxAngle);
            this.angleStep = -this.angleStep;
        }
        if (this.angle <= this.minAngle) {
            this.angle = this.minAngle + (this.minAngle - this.angle)
            this.angleStep = -this.angleStep;
        }
        this.currentPoint = {
            x: this.origin.x + this.baseRadius * Math.cos(this.angle),
            y: this.origin.y + this.baseRadius * Math.sin(this.angle)
        };
    }

    draw(context: CanvasRenderingContext2D | null) {
        if (!context) {
            return;
        }

        context.save();
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.currentPoint.x, this.currentPoint.y, this.radius, 0, 2 * PI, false);
        context.fill();
        context.restore();
    }
}

export default class RotateConstructionAnimation extends Animate {
    private option: IOption = {
        backgroundColor: '#000',
    };
    private elements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        const base = Math.min(this.width, this.height);
        this.elements = [
            new Element(
                { x: this.width / 2, y: this.height / 2 },
                base * 0.2,
                10,
                0,
                PI,
                PPI,
                'red'
            )
        ]
    }

    update() {
        this.elements.forEach((item) => item.update());
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);
        this.context.save();
        this.elements.forEach((item) => item.draw(this.context));
        this.context.restore();
    }
    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
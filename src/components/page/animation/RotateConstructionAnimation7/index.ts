import Animate from "@/lib/Animate";
import { hueColor, randomColor } from "@/lib/Kit";
import Point from "@/lib/Point";
import { el } from "element-plus/es/locale";

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

    current() {
        return this.currentPoint;
    }
}

export default class RotateConstructionAnimation extends Animate {
    private option: IOption = {
        backgroundColor: '#ddd',
    };
    private wElements: Element[] = [];
    private bElements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        const base = Math.min(this.width, this.height) * 0.24;
        let elementRadius = base / 50;
        elementRadius = elementRadius <= 3 ? 3 : elementRadius;
        elementRadius = elementRadius >= 8 ? 8 : elementRadius;
        // let elementRadius = 3;
        const len = Math.floor(base / elementRadius);
        this.wElements = [];
        this.bElements = [];
        const origin = { x: this.width / 2, y: this.height / 2};
        const hueColorStep= 240 / len;
        for (let i = 0; i < len; i++) {
            const color = hueColor(Math.round(hueColorStep * i));
            this.wElements.push(
                new Element(
                    origin,
                    (2 * i + 1) * elementRadius,
                    elementRadius,
                    0,
                    PI,
                    (len - i) * PPI / 8,
                    color
                )
            );
            this.bElements.push(
                new Element(
                    origin,
                    (2 * i + 1) * elementRadius,
                    elementRadius,
                    -PI,
                    0,
                    (len - i) * PPI / 8,
                    color
                )
            );
        }
    }

    update() {
        this.wElements.forEach((item) => item.update());
        this.bElements.forEach((item) => item.update());
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);
        this.context.save();
        this.drawElementsLines(this.bElements, '#000');
        this.drawElementsLines(this.wElements, '#fff');
        this.wElements.forEach((item) => item.draw(this.context));
        this.bElements.forEach((item) => item.draw(this.context));
        this.context.restore();
    }
    private drawElementsLines(elements: Element[], color: string) {
        if (!this.context) {
            return;
        }
        this.context.save();
        this.context.beginPath();
        this.context.lineWidth = 1;
        this.context.strokeStyle = color;
        for (let i = 0; i < elements.length; i++) {
            const point = elements[i].current();
            this.context.lineTo(point.x, point.y);
        }
        this.context.stroke();
        this.context.restore();
    }
    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
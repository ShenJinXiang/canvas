import Animate from "@/lib/Animate";
import { maxDivisor, minMultiple } from "@/lib/Kit";
import Point from "@/lib/Point";

const PI = Math.PI;
const PPI = PI / 360;

interface IOption {
    backgroundColor: string;
    elementColor: string;
    lineColor: string;
    baseRadiusRatio: number; // 基础半径
    baseAngleStep: number; // 以及旋转角速度
    eleRadiusRatio: number;  // 旋转元素半径
    eleAngleStep: number; // 以及旋转角速度
    elementNumber: number; // 元素数量
};

class Element {
    private radius: number;
    private angle: number;
    private angleStep: number;
    private point: Point;
    private hasTrace: boolean;
    private traces: Point[];
    private traceLength: number;
    constructor(radius: number, angle: number, angleStep: number, hasTrace: boolean, traceLength: number) {
        this.radius = radius;
        this.angle = angle;
        this.angleStep = angleStep;
        this.hasTrace = hasTrace;
        this.point = { x: 0, y: radius };
        this.traces = [];
        this.traceLength = traceLength;
    }
    update() {
        this.angle += this.angleStep;
    }
    draw(context: CanvasRenderingContext2D | null, origin: Point | null, lineColor: string) {
        if (!context) {
            return;
        }
        if (!origin) {
            origin = { x: 0, y: 0 };
        }
        this.point = {
            x: this.radius * Math.cos(this.angle),
            y: this.radius * Math.sin(this.angle)
        }
        if (this.hasTrace) {
            this.traces.push({
                x: origin.x + this.point.x,
                y: origin.y + this.point.y
            });
            if (this.traces.length > this.traceLength) {
                this.traces.shift();
            }
        }
        context.save();
        context.translate(origin.x, origin.y);
        context.beginPath();
        context.strokeStyle = lineColor;
        context.lineWidth = 1;
        context.moveTo(0, 0);
        context.lineTo(this.point.x, this.point.y);
        context.closePath();
        context.stroke();
        context.restore();
    }
    public drawTraces(context: CanvasRenderingContext2D | null, color: string) {
        if (!context || !this.hasTrace) {
            return;
        }
        context.save();
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 1;
        this.traces.forEach((item) => context.lineTo(item.x, item.y));
        context.stroke();
        context.restore();
    }
    public getPoint(): Point {
        return this.point;
    }
}

export default class RotateConstructionAnimation extends Animate {
    private option: IOption = {
        backgroundColor: '#000',
        elementColor: 'rgba(255, 255, 255, 1)',
        lineColor: 'rgba(255, 255, 255, 0.3)',
        // lineColor: 'rgba(255, 0, 0, 1)',
        baseRadiusRatio: 0.25,
        baseAngleStep: 2,
        eleRadiusRatio: 0.20,
        eleAngleStep: 14.4,
        elementNumber: 3
    };
    private baseAngle: number = 0;
    private baseElement: Element | null = null;
    private elements: Element[] = [];
    private angle: number = 0;
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        const base = Math.min(this.width, this.height);
        const baseRadius = base * this.option.baseRadiusRatio;
        const eleRadius = base * this.option.eleRadiusRatio;
        // const traceLength = minMultiple(2 * PI / this.option.baseAngleStep, 2 * PI / this.option.eleAngleStep);
        const num1 = 2 * 360 / this.option.baseAngleStep;
        const num2 = 2 * 360 / this.option.eleAngleStep;
        const traceLength = minMultiple(num1, num2) + maxDivisor(num1, num2);
        console.log('traceLength ', traceLength);
        this.baseElement = new Element(baseRadius, 0, this.option.baseAngleStep * PPI, false, 0);
        this.elements = [];
        const angleStep = 2 * PI / this.option.elementNumber;
        for (let i = 0; i < this.option.elementNumber; i++) {
            this.elements.push(new Element(eleRadius, i * angleStep, this.option.eleAngleStep * PPI, true, traceLength));
        }
    }

    update() {
        if (!this.baseElement) {
            return;
        }
        this.baseElement.update();
        this.elements.forEach((item) => item.update());
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);
        this.context.save();
        this.context.translate(this.width / 2, this.height / 2);
        if (this.baseElement) {
            this.baseElement.draw(this.context, { x: 0, y: 0 }, this.option.lineColor);
            const p = this.baseElement.getPoint();
            this.elements.forEach((item) => item.draw(this.context, p, this.option.lineColor));
            this.elements.forEach((item) => item.drawTraces(this.context, this.option.elementColor));
        }
        this.context.restore();
    }
    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}

/*

px = R * cos(a) + r * cos(b)
py = R * sin(a) + r * sin(b)
n * da % 2PI + n * db % 2PI = 0;
2PI / PI /180  360
2PI / PI / 25  50 


*/
import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

const PI = Math.PI;

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
    private lineColor: string;
    private point: Point;
    constructor(radius: number, angle: number, angleStep: number, lineColor: string) {
        this.radius = radius;
        this.angle = angle;
        this.angleStep = angleStep;
        this.lineColor = lineColor;
        this.point = { x: 0, y: radius };
    }
    update() {
        this.angle += this.angleStep;
    }
    draw(context: CanvasRenderingContext2D | null, origin: Point | null) {
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
        context.save();
        context.translate(origin.x, origin.y);
        context.beginPath();
        context.strokeStyle = this.lineColor;
        context.lineWidth = 1;
        context.moveTo(0, 0);
        context.lineTo(this.point.x, this.point.y);
        context.closePath();
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
        elementColor: 'red',
        // lineColor: 'rgba(255, 255, 255, 0.3)',
        lineColor: 'rgba(255, 0, 0, 1)',
        baseRadiusRatio: 0.25,
        baseAngleStep: PI / 180,
        eleRadiusRatio: 0.2,
        eleAngleStep: PI / 90,
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
        this.baseElement = new Element(baseRadius, 0, this.option.baseAngleStep, this.option.lineColor);
        this.elements = [];
        const angleStep = 2 * PI / this.option.elementNumber;
        for (let i = 0; i < this.option.elementNumber; i++) {
            this.elements.push(new Element(eleRadius, i * angleStep, this.option.eleAngleStep, this.option.lineColor));
        }
        console.log(this.elements);
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
            this.baseElement.draw(this.context, { x: 0, y: 0 });
            const p = this.baseElement.getPoint();
            this.elements.forEach((item) => item.draw(this.context, p));
        }
        this.context.restore();
    }
    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
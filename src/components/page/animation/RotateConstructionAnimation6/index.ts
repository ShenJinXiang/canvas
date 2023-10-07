import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

const PI = Math.PI / 360;

interface IOption {
    backgroundColor: string;
    elementColor: string;
    lineColor: string;
    baseRadiusRatio: number; // 基础半径
    baseAngleStep: number; // 以及旋转角速度
    eleRadiusRatio: number;  // 旋转元素半径
    eleAngleStep: number; // 以及旋转角速度
};

class Element {
    private radius: number;
    private angle: number;
    private angleStep: number;
    private lineColor: string;
    constructor(radius: number, angle: number, angleStep: number, lineColor: string) {
        this.radius = radius;
        this.angle = angle;
        this.angleStep = angleStep;
        this.lineColor = lineColor;
    }
    update() {
        this.angle += this.angleStep;
    }
    draw(context: CanvasRenderingContext2D, origin: Point) {
        if (!context) {
            return;
        }
        context.save();
        context.translate(origin.x, origin.y);
        context.restore();
    }
}

export default class RotateConstructionAnimation extends Animate {
    private option: IOption = {
        backgroundColor: '#000',
        elementColor: 'red',
        lineColor: 'rgba(255, 255, 255, 0.3)',
        baseRadiusRatio: 0.25,
        baseAngleStep: PI * 10,
        eleRadiusRatio: 0.2,
        eleAngleStep: PI * 5
    };
    private baseRadius: number = 0;
    private eleRadius: number = 0;
    private baseAngle: number = 0;
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        const base = Math.min(this.width, this.height);
        this.baseRadius = base * this.option.baseRadiusRatio;
        this.eleRadius = base * this.option.eleRadiusRatio;
    }

    update() {

    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);
        this.context.save();
        this.context.translate(this.width / 2, this.height / 2);
        this.drawBaseLine();
        this.context.restore();
    }
    drawBaseLine() {
        if (!this.context) {
            return;
        }
        this.context.save();
        this.context.strokeStyle = this.option.lineColor;
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(this.baseRadius * Math.cos(this.baseAngle), this.baseRadius * Math.sin(this.baseAngle));
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }
    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
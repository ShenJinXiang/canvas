import Animate from "@/lib/Animate";
import Line from '@/lib/Line';
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    elementColor: string;
    lineColor: string;
    timestep: number;
};

class Element {
    private x: number;
    private y: number;
    private radius: number;
    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(context: CanvasRenderingContext2D | null, style: string) {
        if (!context) {
            return;
        }

        context.save();
        context.beginPath();
        context.strokeStyle = style;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.restore();
    }

    refresh(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    position() {
        return {
            x: this.x,
            y: this.y
        };
    }
}

export default class RotateConstructionAnimation extends Animate {
    private origin: Point = { x: 0, y: 0 }
    private baseRadius: number = 0;
    private baseElement: Element | null = null;
    private elements: Element[] = [];
    private option: IOption = {
        backgroundColor: '#000',
        elementColor: 'red',
        lineColor: 'rgba(255, 255, 255, 0.3)',
        timestep: 10
    };
    private currentIndex: number = 0;
    private current: number = 0;
    private line1: Line | null = null;
    private line2: Line | null = null;
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        const base = Math.min(this.width, this.height);
        this.baseRadius = base * 0.2;
        this.origin = {
            x: 0.5 * this.width,
            y: 0.35 * this.height
        }
        this.baseElement = new Element(0, 0, this.baseRadius);
        const num = 90;
        const angleStep = 2 * Math.PI / num;
        this.elements = [];
        for (let index = 0; index < num; index++) {
            this.elements.push(new Element(
                this.baseRadius * Math.cos(angleStep * index),
                this.baseRadius * Math.sin(angleStep * index),
                2 * this.baseRadius * Math.sin(index * angleStep / 2)
            ));
        }
        this.line1 = new Line(0, 0, 0, 0);
        this.line2 = new Line(this.baseRadius, 0, 0, 0);
    }

    update() {
        this.current++;
        if (this.current >= this.option.timestep) {
            this.current = 0;
            this.currentIndex += 1;
            if (this.currentIndex > this.elements.length + 10) {
                this.currentIndex = 0;
            }
            if (this.currentIndex < this.elements.length) {
                const currentPosition = this.elements[this.currentIndex].position();
                this.line1?.updatePosition(0, 0, currentPosition.x, currentPosition.y);
                this.line2?.updatePosition(this.baseRadius, 0, currentPosition.x, currentPosition.y);
            }
        }
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);
        this.context.save();
        this.context.translate(this.origin.x, this.origin.y);
        this.context.rotate(-Math.PI / 2);
        this.baseElement?.draw(this.context, this.option.lineColor);
        if (this.currentIndex < this.elements.length) {
            this.line1?.stroke(this.context, { strokeStyle: this.option.lineColor });
            this.line2?.stroke(this.context, { strokeStyle: this.option.lineColor });
        }
        this.elements.forEach((item, index) => index <= this.currentIndex ? item.draw(this.context, this.option.elementColor) : '');
        this.context.restore();
    }
}
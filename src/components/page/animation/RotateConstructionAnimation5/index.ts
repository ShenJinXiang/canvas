import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    elementColor: string;
    lineColor: string;
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
}

export default class RotateConstructionAnimation extends Animate {
    private origin: Point = { x: 0, y: 0 }
    // private baseRadius: number = 0;
    private baseElement: Element | null = null;
    private elements: Element[] = [];
    private option: IOption = {
        backgroundColor: '#000',
        elementColor: 'red',
        lineColor: 'rgba(255, 255, 255, 0.3)'
    };
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        const base = Math.min(this.width, this.height);
        const baseRadius = base * 0.2;
        this.origin = {
            x: 0.5 * this.width,
            y: 0.35 * this.height
        }
        this.baseElement = new Element(0, 0, baseRadius);
        const num = 90;
        const angleStep = 2 * Math.PI / num;
        this.elements = [];
        for (let index = 0; index < num; index++) {
            this.elements.push(new Element(
                baseRadius * Math.cos(angleStep * index),
                baseRadius * Math.sin(angleStep * index),
                2 * baseRadius * Math.sin(index * angleStep / 2)
            ));
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
        // this.elements.forEach((item) => item.draw(this.context, this.option.elementColor));
        this.context.restore();
    }
}
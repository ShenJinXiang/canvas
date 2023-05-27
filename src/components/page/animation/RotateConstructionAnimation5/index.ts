import Animate from "@/lib/Animate";

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
    private option: IOption = {
        backgroundColor: '#000',
        elementColor: 'red',
        lineColor: 'rgba(255, 255, 255, 0.3)'
    };
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);
        this.context.save();
        new Element(0.5 * this.width, 0.5 * this.height, 0.2 * this.height).draw(this.context, this.option.elementColor);
        this.context.restore();
    }
}
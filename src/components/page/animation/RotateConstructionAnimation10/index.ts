import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    showColor: string;
}

const OPTION: IOption = {
    backgroundColor: '#000',
    showColor: '#084'
}

class Element {
    private txt: string;
    private angle: number = 0;
    private radius: number = 0;
    private angleStep: number;
    private counterclockwise: boolean;
    private point: Point;
    constructor(txt: string, radius: number, angleStep: number, counterclockwise: boolean = false) {
        this.txt = txt;
        this.radius = radius;
        this.angle = 0;
        this.angleStep = angleStep;
        this.counterclockwise = counterclockwise;
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

    draw(context: CanvasRenderingContext2D | null) {
        if (!context) {
            return;
        }
        context.save();
        context.beginPath();
        context.strokeStyle = OPTION.showColor;
        context.moveTo(this.p1.x, this.p1.y);
        context.lineTo(this.p2.x, this.p2.y);
        context.stroke();
        context.restore();
    }
}

export default class RotateConstructionAnimation extends Animate {
    private ele: Element = new Element();
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    private initData() {


    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(OPTION.backgroundColor);
        this.context.save();
        this.context.fillStyle = "red";
        this.context.fillRect(200, 200, 400, 230);
        this.context.restore();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
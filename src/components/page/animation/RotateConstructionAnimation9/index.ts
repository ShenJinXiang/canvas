import Animate from "@/lib/Animate";
import { Polygon, PolygonOption } from "@/lib/Polygon";

interface IOption {
    minRadius: number;
    radiusStep: number;
    angleStep: number;
}

class Element extends Polygon {
    private style: string;
    private angleStep: number;
    constructor(options: PolygonOption, style: string, angleStep: number) {
        super(options);
        this.style = style;
        this.angleStep = angleStep;
    }

    update() {
        this.rotate += this.angleStep;
    }

    draw(context: CanvasRenderingContext2D | null) {
        this.stroke(context, { strokeStyle: this.style });
    }

}
export default class RotateConstructionAnimation extends Animate {
    private sideNumber: number;
    private elements: Element[] = [];
    private static readonly option: IOption = {
        minRadius: 5,
        radiusStep: 10,
        angleStep: Math.PI / 720
    }
    constructor(width: number, height: number, sideNumber: number) {
        super();
        this.initRect(width, height);
        this.sideNumber = sideNumber;
        this.initData();
    }

    initData() {
        this.elements = [];
        let radius = Math.min(this.width, this.height) / 2;
        let angle = Math.PI / 360;
        let s = 0;
        while(radius > RotateConstructionAnimation.option.minRadius) {
            this.elements.push(new Element({
                ox: this.width / 2,
                oy: this.height / 2,
                sideNum: this.sideNumber,
                radius,
                rotate: Math.PI / 2
            }, `hsl(${s}, 100%, 50%)`, angle))
            s += 2;
            angle += RotateConstructionAnimation.option.angleStep;
            radius -= RotateConstructionAnimation.option.radiusStep;
        }

    }

    draw() {
        if (!this.context) {
            return;
        }
        this.context.save();
        this.elements.forEach(element => {
            element.draw(this.context);
        });
        this.context.restore();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
    
      public setSideNumber(sideNumber: number) {
        this.sideNumber = sideNumber;
        this.initData();
    }

}
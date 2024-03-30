import Animate from "@/lib/Animate";
import { Polygon, PolygonOption } from "@/lib/Polygon";

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
        this.fill(context, { fillStyle: this.style });
    }

}
export default class RotateConstructionAnimation extends Animate {
    private sideNumber: number;
    private elements: Element[] = [];
    constructor(width: number, height: number, sideNumber: number) {
        super();
        this.initRect(width, height);
        this.sideNumber = sideNumber;
    }

    initData() {

    }

    draw() {
        if (!this.context) {
            return;
        }
        this.context.save();
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
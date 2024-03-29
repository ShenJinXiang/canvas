import Animate from "@/lib/Animate";
import { Polygon } from "@/lib/Polygon";

class Element extends Polygon {

}
export default class RotateConstructionAnimation extends Animate {
    private sideNumber: number;
    constructor(width: number, height: number, sideNumber: number) {
        super();
        this.initRect(width, height);
        this.sideNumber = sideNumber;
    }

    draw() {
        if (!this.context) {
            return;
        }
        this.context.save();
        this.context.restore();
    }

}
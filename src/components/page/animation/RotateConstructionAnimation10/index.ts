import Animate from "@/lib/Animate";

export default class RotateConstructionAnimation extends Animate {
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
import Animate from "@/lib/Animate";

export default class FractalImage extends Animate {
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    private initData() {

    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
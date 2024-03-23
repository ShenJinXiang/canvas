import BaseCanvas from "@/lib/BaseCanvas";

export default class Background extends BaseCanvas {
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
    }
}
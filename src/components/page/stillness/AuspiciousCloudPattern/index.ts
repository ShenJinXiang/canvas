import BaseCanvas from "@/lib/BaseCanvas"

export default class AuspiciousCloudPattern extends BaseCanvas {
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
    }

    draw() {
        if (!this.context) {
            return;
        }
        this.context.save();
        this.context.fillStyle = 'red';
        this.context.fillRect(200, 200, 300, 160);
        this.context.restore();
    }
}
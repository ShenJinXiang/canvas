import BaseCanvas from "@/lib/BaseCanvas";

export default class Background extends BaseCanvas {
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
    }

    draw(): void {
        this.clear();
        if (!this.context) {
            return;
        }
        this.context.fillStyle = '#8b0903';
        this.context.fillRect(100, 100, 300, 220);

        this.context.fillStyle = '#f8c687';
        this.context.fillRect(600, 600, 100, 60);
    }
}
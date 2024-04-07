import BaseCanvas from "@/lib/BaseCanvas";

class Element {
    private size: number;
    constructor(size: number) {
        this.size = size;
    }
    draw(context: CanvasRenderingContext2D | null) {
        if (!context) {
            return;
        }
        context.save();
        context.translate(this.size / 2, this.size / 2);
        context.fillStyle = '#8b0903';
        context.fillRect(-this.size / 4, -this.size / 4, this.size / 2, this.size / 2);
        context.restore();
    }
}

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
        // this.context.fillStyle = '#8b0903';
        // this.context.fillRect(100, 100, 300, 220);

        // this.context.fillStyle = '#f8c687';
        // this.context.fillRect(600, 600, 100, 60);
    }
}
import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
    gridWidth: number;
};

export default class WoodenPatterns extends BaseCanvas {
    private option: IOption = {
        backgroundColor: '#f1f1f1',
        gridWidth: 200
    };
    gridCanvas: HTMLCanvasElement = document.createElement('canvas');
    gridContext: CanvasRenderingContext2D | null  = null;
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        const griwWidth = this.width / 10;
        this.gridCanvas.width = griwWidth;
        this.gridCanvas.height = griwWidth;
        this.gridContext = this.gridCanvas.getContext('2d');
    }

    draw() {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);

        // this.context.save();
        // this.context.fillStyle = '#084';
        // this.context.fillRect(200, 200, 200, 146);
        // this.context.restore();
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}
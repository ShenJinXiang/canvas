import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
}

export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#f1f1f1'
    };
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
    }
    initData() {

    }
    draw() {
        if (!this.context) {
            return;
        }
        this.clear(Background.option.backgroundColor);

        this.context.save();
        this.context.fillStyle = 'red';
        this.context.fillRect(100, 100, 200, 120);
        this.context.restore();
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}
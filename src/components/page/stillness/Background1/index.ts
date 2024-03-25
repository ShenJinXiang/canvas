import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
    showColor: string;
}

export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#a00000',
        showColor: '#fdc287',
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
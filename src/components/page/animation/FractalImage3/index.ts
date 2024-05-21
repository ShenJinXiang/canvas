import Animate from "@/lib/Animate";

interface IOption {
    backgroundColor: string;
    showColor: string;
    lineWidth: number;
    ratio: number;
}

export default class FractalImage extends Animate {
    private static readonly OPTION: IOption = {
        backgroundColor: '#f1f1f1',
        showColor: '#0075c9',
        lineWidth: 1,
        ratio: 0.7
    }
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    private initData() {

    }

    draw(): void {
        if(!this.context) {
            return;
        }

        this.clear(FractalImage.OPTION.backgroundColor);
        this.context.save();
        this.context.strokeStyle = FractalImage.OPTION.showColor;
        this.context.strokeRect(100, 100, 200, 160);
        this.context.restore();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
      }
}
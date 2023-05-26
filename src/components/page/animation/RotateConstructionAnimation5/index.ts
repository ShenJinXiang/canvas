import Animate from "@/lib/Animate";

interface IOption {
    backgroundColor: string;
};

export default class RotateConstructionAnimation extends Animate {
    private option: IOption = {
        backgroundColor: '#000'
    };
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);
        this.context.save();
        this.context.fillStyle = '#592';
        this.context.fillRect(300, 300, 420, 280);
        this.context.restore();
    }
}
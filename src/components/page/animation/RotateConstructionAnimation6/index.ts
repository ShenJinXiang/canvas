import Animate from "@/lib/Animate";

interface IOption {
    backgroundColor: string;
    elementColor: string;
    lineColor: string;
};

class Element {
}

export default class RotateConstructionAnimation extends Animate {
    private option: IOption = {
        backgroundColor: '#000',
        elementColor: 'red',
        lineColor: 'rgba(255, 255, 255, 0.3)',
    };
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
    }

    update() {
    }

    draw(): void {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);
        this.context.save();
        this.context.translate(this.width / 2, this.height / 2);
        this.context.fillStyle = 'red';
        this.context.fillRect(-120, -50, 240, 100);
        this.context.restore();
    }
    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
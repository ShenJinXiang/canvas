import Animate from "@/lib/Animate";

const PI = Math.PI;
const PPI = PI / 360;

interface IOption {
    backgroundColor: string;
};

export default class RotateConstructionAnimation extends Animate {
    private option: IOption = {
        backgroundColor: '#000',
    };
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        const base = Math.min(this.width, this.height);
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
        this.context.fillRect(-200, -120, 400, 240);
        this.context.restore();
    }
    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}

/*

px = R * cos(a) + r * cos(b)
py = R * sin(a) + r * sin(b)
n * da % 2PI + n * db % 2PI = 0;
2PI / PI /180  360
2PI / PI / 25  50 


*/
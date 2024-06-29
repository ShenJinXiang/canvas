import Animate from "@/lib/Animate";
import Background from "../../stillness/Background1";
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    showColor: string;
    lineWidth: number;
}

enum ElementOriginType {
    start, end
}

class Element {
    private origin: Point;
    private len: number;
    private angle: number;
    private originType: ElementOriginType;
    private animation: boolean = false;
    private animationTime: number = 0;
    private counterclockwise: boolean = false;
    
    constructor(origin: Point, len: number, angle: number, originType: ElementOriginType, animation: boolean = false, animationTime: number = 100, counterclockwise: boolean = false) {
        this.origin = origin;
        this.len = len;
        this.angle = angle;
        this.originType = originType;
        this.animation = animation;
        this.animationTime = animationTime;
        this.counterclockwise = counterclockwise;
    }

}

export default class FractalImage extends Animate {

    private static readonly OPTION: IOption = {
        backgroundColor: '#fff',
        showColor: '#084',
        lineWidth: 1
    };
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    private initData() {

    }

    draw() {
        if (!this.context) {
            return;
        }

        this.clear(FractalImage.OPTION.backgroundColor);
        this.context.save();
        this.context.fillStyle = '#084';
        this.context.fillRect(200, 200, 300, 220);
        this.context.restore();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
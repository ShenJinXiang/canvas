import Animate from "@/lib/Animate";

interface IOption {
    backgroundColor: string;
    showColor: string;
    lineWidth: number;
    ratio: number;
}

class Element {
    private x: number;
    private y: number;
    private radius: number;
    private time: number;
    private r: number = 0;
    private rStep: number = 0;
    private current: number = 0;
    private angleStep: number = 0;
    private startAngle: number = 0;

    constructor(x: number, y: number, radius: number, time: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.time = time;
    }
    init() {
        this.current = 0;
        this.r = 0;
        this.rStep = 0;
        this.angleStep = 0;
        this.startAngle = Math.PI;
    }
    
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
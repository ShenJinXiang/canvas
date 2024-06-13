import BaseCanvas from "@/lib/BaseCanvas";
import { StrokeOption } from "@/lib/DrawOption";
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    showColor: string;
    minSize: number;
}


export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#000',
        showColor: '#fff',
        minSize: 40
    };
    private elements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.markCanvas.setStyle('rgba(250, 250, 250, 0.5)');
        this.initData();
    }
    initData() {
        this.elements = [];
    }
    draw() {
        if (!this.context) {
            return;
        }
        this.clear(Background.option.backgroundColor);

        this.context.save();
        this.context.strokeStyle = Background.option.showColor;
        this.context.strokeRect(100, 100, 200, 120);
        this.context.restore();
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}
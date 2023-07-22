import BaseCanvas from "@/lib/BaseCanvas"

interface IOption {
    backgroundColor: string;
    cloudColor: string;
};

class Element {
    private x: number;
    private y: number;
    private radius: number;
    private rs: number[];
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.rs = [1, 0.8, 0.6, 0.5, 0.4, 0.3];
    }

    data(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(context: CanvasRenderingContext2D | null, style: string) {
        if (!context) {
            return;
        }
        context.save();
        context.translate(this.x, this.y);
        this.rs.forEach((item) => {
            context.beginPath();
            context.strokeStyle = style;
            context.lineWidth = 1;
            context.arc(0, 0, this.radius * item, -Math.PI, 0, false);
            context.stroke();
        });
        context.restore();
    }
}

export default class AuspiciousCloudPattern extends BaseCanvas {
    private elements: Element[] = [];
    private option: IOption = {
        backgroundColor: '#f1f1f1',
        cloudColor: '#333'
    };
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        const ele = new Element();
        ele.data(
            this.width * 0.5,
            this.height * 0.5,
            200
        );
        this.elements = [
            ele
        ];
    }

    draw() {
        if (!this.context) {
            return;
        }
        this.clear(this.option.backgroundColor);

        this.context.save();
        this.elements.forEach((item) => item.draw(this.context, this.option.cloudColor));
        this.context.restore();
    }
}
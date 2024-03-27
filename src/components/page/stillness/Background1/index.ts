import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
    showColor: string;
}

class Element {
    private x: number;
    private y: number;
    private radius: number;
    private rs: number[];
    private angles: number[];
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.rs = [1, 0.9, 0.7, 0.5, 0.1]
        const angle = -Math.PI / 5;
        this.angles = [1 * angle, 2 * angle, 3 * angle, 4 * angle ]
    }

    data(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        return this;
    }

    draw(context: CanvasRenderingContext2D | null, style: string, backgroundColor: string) {
        if (!context) {
            return;
        }
        console.log(this);
        context.save();
        context.translate(this.x, this.y);

        context.beginPath();
        context.fillStyle = backgroundColor;
        context.arc(0, 0, this.radius * this.rs[0], -Math.PI, 0, false);
        context.fill();
        
        context.beginPath();
        context.fillStyle = style;
        context.arc(0, 0, this.radius * this.rs[1], -Math.PI, 0, false);
        context.fill();

        context.beginPath();
        context.fillStyle = backgroundColor;
        context.arc(0, 0, this.radius * this.rs[2], -Math.PI, 0, false);
        context.fill();

        this.angles.forEach((angle: number, i: number) => {
            context.save();
            context.rotate(angle);
            context.fillStyle = style;
            context.beginPath();
            context.arc(this.radius * this.rs[3], 0, this.radius * 0.08, 0, 2 * Math.PI, false);
            context.fill();

            context.beginPath();
            context.moveTo(this.radius * this.rs[4], 0);
            context.lineTo(this.radius * this.rs[3], this.radius * 0.02);
            context.lineTo(this.radius * this.rs[3], -this.radius * 0.02);
            context.closePath();
            context.fill();
            context.restore();
        });

        context.restore();
    }
}

export default class Background extends BaseCanvas {
    private static readonly option: IOption = {
        backgroundColor: '#a00000',
        showColor: '#fdc287',
    };
    private elements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }
    initData() {
        // const size = this.width * 0.025 < 30 ? 30 : this.width * 0.025;
        // const yStep = size * 0.5;
        // const xStep = size * 2;
        // for (let yIndex = 0; yIndex * yStep < this.height + size; yIndex += 1) {
        //     for (let xIndex = 0; xIndex * xStep < this.width + size; xIndex += 1) {
        //         if (yIndex % 2 === 0) {
        //             this.elements.push(
        //                 new Element().data(xIndex * xStep, yIndex * yStep, size)
        //             );
        //         } else {
        //             this.elements.push(
        //                 new Element().data(xIndex * xStep + size, yIndex * yStep, size)
        //             );
        //         }
        //     }
        // }
        this.elements = [
            new Element().data(this.width / 2, this.height / 2, this.height * 0.3)
        ];
        console.log(this.elements);
    }
    draw() {
        if (!this.context) {
            return;
        }
        this.clear();

        this.context.save();
        console.log(this.elements);
        this.elements.forEach((item) => item.draw(this.context, Background.option.showColor, Background.option.backgroundColor));
        this.context.restore();
        this.drawMark();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
        this.draw();
    }
}
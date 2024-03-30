import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
    backgroundColor: string;
    showColor: string;
}

class Element {
    private x: number;
    private y: number;
    private radius: number;
    private angles: number[];
    private bl: number[];
    constructor() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        // 最大半径， 淡色弧线半径，淡色弧线宽度， 四个小圆位置， 四个小圆半径, 四条线位置，四条线最宽的宽度
        this.bl = [1, 0.8, 0.2, 0.5, 0.08, 0.1, 0.02]
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

        // 最大半圆
        context.beginPath();
        context.fillStyle = backgroundColor;
        context.arc(0, 0, this.radius * this.bl[0], -Math.PI, 0, false);
        context.fill();
        
        // 半圆弧线
        context.beginPath();
        context.strokeStyle = style;
        context.lineWidth = this.radius * this.bl[2];
        context.arc(0, 0, this.radius * this.bl[1], -Math.PI, 0, false);
        context.stroke();

        this.angles.forEach((angle: number, i: number) => {
            // 小圆
            context.save();
            context.rotate(angle);
            context.fillStyle = style;
            context.beginPath();
            context.arc(this.radius * this.bl[3], 0, this.radius * this.bl[4], 0, 2 * Math.PI, false);
            context.fill();

            // 线
            context.beginPath();
            context.moveTo(this.radius * this.bl[5], 0);
            context.lineTo(this.radius * this.bl[3], this.radius * this.bl[6]);
            context.lineTo(this.radius * this.bl[3], -this.radius * this.bl[6]);
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
        this.markCanvas.setStyle('rgba(250, 250, 250, 0.5)');
        this.initData();
    }
    initData() {
        this.elements = [];
        const size = this.width * 0.025 < 30 ? 30 : this.width * 0.025;
        const yStep = size * 0.6;
        const xStep = size * 2;
        for (let yIndex = 0; yIndex * yStep < this.height + size; yIndex += 1) {
            for (let xIndex = 0; xIndex * xStep < this.width + size; xIndex += 1) {
                if (yIndex % 2 === 0) {
                    this.elements.push(
                        new Element().data(xIndex * xStep, yIndex * yStep, size)
                    );
                } else {
                    this.elements.push(
                        new Element().data(xIndex * xStep + size, yIndex * yStep, size)
                    );
                }
            }
        }
    }
    draw() {
        if (!this.context) {
            return;
        }
        this.clear(Background.option.backgroundColor);

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
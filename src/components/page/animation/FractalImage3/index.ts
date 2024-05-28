import Animate from "@/lib/Animate";

interface IOption {
    backgroundColor: string;
    showColor: string;
    lineWidth: number;
    ratio: number;
    deepNum: number;
    timeStep: number;
}

function fillTriangle(ctx: CanvasRenderingContext2D | null, x: number, y: number, radius: number, angle: number, color: string) {
    if (!ctx) {
        return;
    }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(radius, radius);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(Math.cos(0), Math.sin(0));
    ctx.lineTo(Math.cos(2 * Math.PI / 3), Math.sin(2 * Math.PI / 3));
    ctx.lineTo(Math.cos(4 * Math.PI / 3), Math.sin(4 * Math.PI / 3));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

class Element {
    private x: number;
    private y: number;
    private radius: number;
    private time: number;
    private r: number = 0;
    private rStep: number = 0;
    private current: number = 0;
    private angle: number = 0;
    private angleStep: number = 0;
    private startAngle: number = 0;

    constructor(x: number, y: number, radius: number, time: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.time = time;
        this.angleStep =  Math.PI / this.time;
        this.rStep = this.radius / this.time;
        this.startAngle = Math.PI;
    }
    setStart() {
        this.current = 0;
        this.r = 0;
        this.angle = 0;
    }
    setComplete() {
        this.angle =  2 * Math.PI;
        this.r = this.radius;
    }
    update() {
        if (this.current < this.time) {
            this.current++;
            this.r = this.current * this.rStep;
            this.angle = this.startAngle + this.current * this.angleStep;
        }
    }
    draw(ctx: CanvasRenderingContext2D|null, showColor: string) {
        fillTriangle(ctx, this.x, this.y, this.r, .5 * Math.PI + this.angle, showColor);
    }
    children() {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            arr.push(new Element(
                this.x + this.radius * Math.cos(-0.5 * Math.PI + 2 * i * Math.PI / 3 ),
                this.y + this.radius * Math.sin(-0.5 * Math.PI + 2 * i * Math.PI / 3 ),
                this.radius / 2,
                this.time
            ));
        }
        return arr;
    }
    
}

export default class FractalImage extends Animate {
    private static readonly OPTION: IOption = {
        backgroundColor: '#f1f1f1',
        showColor: '#0075c9',
        lineWidth: 1,
        ratio: 0.7,
        deepNum: 6,
        timeStep: 100
    }
    private elements: Element[][] = [];
    private currentDeep: number = 0;
    private currentTime: number = 0;
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    private initData() {
        this.currentDeep = 0;
        this.currentTime = 0;
        this.elements = [];
        for (let i = 0; i < FractalImage.OPTION.deepNum; i++) {
            let eles: Element[] = [];
            if (i === 0) {
                eles.push(new Element(
                    0.5 * this.width,
                    0.65 * this.height,
                    0.3 * this.height,
                    FractalImage.OPTION.timeStep
                ));
            } else {
                this.elements[i - 1].forEach(item => eles.push(...item.children()));
            }
            this.elements.push(eles);
        }
        console.log(this.elements);
    }

    update() {
        this.elements.forEach((item, index) => {
            if (this.currentDeep === index) {
                item.forEach(ele => ele.update());
            }
            if (this.currentDeep > index) {
                item.forEach(ele => ele.setComplete());
            }
        });
        // console.log('currentTime:' + this.currentTime + " currentDeep:" + this.currentDeep);
        this.currentTime++;
        if (this.currentTime >= FractalImage.OPTION.timeStep) {
            this.currentTime = 0;
            this.currentDeep++;
            if (this.currentDeep >= FractalImage.OPTION.deepNum) {
                this.currentDeep = 0;
                this.elements.forEach(function (item) {
                    item.forEach(ele => ele.setStart())
                })
            }
        }
    }
    draw(): void {
        if(!this.context) {
            return;
        }

        this.clear(FractalImage.OPTION.backgroundColor);
        this.context.save();
        // fillTriangle(this.context, 0.5 * this.width, 0.65 * this.height , this.height * 0.6, -Math.PI / 2, FractalImage.OPTION.showColor);
        // this.elements.forEach((item, index) => {
        //     if (this.currentDeep >= index) {
        //         item.forEach(ele => ele.draw(this.context, FractalImage.OPTION.showColor));
        //     }
        // });
        this.elements[1].forEach((item) => {
            item.draw(this.context, FractalImage.OPTION.showColor);
        });
        this.context.restore();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
      }
}
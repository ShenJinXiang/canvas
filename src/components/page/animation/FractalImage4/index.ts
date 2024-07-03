import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

interface IOption {
    backgroundColor: string;
    showColor: string;
    lineWidth: number;
    deepNum: number;
    timeStep: number;
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
    private endPoint: Point;
    private tp1: Point;
    private tp2: Point;
    
    constructor(origin: Point, len: number, angle: number, originType: ElementOriginType, animation: boolean = false, animationTime: number = 100, counterclockwise: boolean = false) {
        this.origin = origin;
        this.len = len;
        this.angle = angle;
        this.originType = originType;
        this.animation = animation;
        this.animationTime = animationTime;
        this.counterclockwise = counterclockwise;

        if (this.originType === ElementOriginType.start) {
            this.endPoint = {
                x: this.origin.x + this.len * Math.cos(this.angle),
                y: this.origin.y + this.len * Math.sin(this.angle)
            }
        } else {
            this.endPoint = {
                x: this.origin.x - this.len * Math.cos(this.angle),
                y: this.origin.y - this.len * Math.sin(this.angle)
            }
        }
        this.tp1 = {
            x: this.origin.x + (this.endPoint.x - this.origin.x) / 3,
            y: this.origin.y + (this.endPoint.y - this.origin.y) / 3
        };
        this.tp2 = {
            x: this.origin.x + 2 * (this.endPoint.x - this.origin.x) / 3,
            y: this.origin.y + 2 * (this.endPoint.y - this.origin.y) / 3
        };

    }

    draw(context: CanvasRenderingContext2D | null, showColor: string) {
        if (!context) {
            return;
        }
        context.save();
        context.strokeStyle = showColor;
        context.beginPath();
        context.moveTo(this.origin.x, this.origin.y);
        context.lineTo(this.endPoint.x, this.endPoint.y);
        context.stroke();
        context.restore();
    }

    children() {
        const len: number = this.len / 3;
        if (this.originType === ElementOriginType.start) {
            return [
                new Element(this.origin, len, this.angle, ElementOriginType.start, false, this.animationTime),
                new Element(this.tp1, len, this.angle - Math.PI / 3, ElementOriginType.start, true, this.animationTime, false),
                new Element(this.tp2, len, this.angle + Math.PI / 3, ElementOriginType.end, true, this.animationTime, true),
                new Element(this.endPoint, len, this.angle, ElementOriginType.end, false, this.animationTime)
            ];
        } else {
            return [
                new Element(this.origin, len, this.angle, ElementOriginType.end, false, this.animationTime),
                new Element(this.tp1, len, this.angle + Math.PI / 3, ElementOriginType.end, true, this.animationTime, false),
                new Element(this.tp2, len, this.angle - Math.PI / 3, ElementOriginType.start, true, this.animationTime, true),
                new Element(this.endPoint, len, this.angle, ElementOriginType.start, false, this.animationTime)
            ];
        }
    }

}

export default class FractalImage extends Animate {

    private static readonly OPTION: IOption = {
        backgroundColor: '#fff',
        showColor: '#084',
        lineWidth: 1,
        timeStep: 100,
        deepNum: 6
    };
    private elementGroup: Element[][] = [];
    private currentDeep: number = 0;
    private radius: number = 0;
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    private initData() {
        this.radius = Math.min(this.width, this.height) * 0.4;
        this.initElementGroup();
    }
    initElementGroup() {
        this.elementGroup = [[]];
        for (let i = 0; i < 3; i++) {
            this.elementGroup[0].push(new Element(
                {
                    x: 0.5 * this.width + this.radius * Math.cos(-Math.PI / 2 + 2 * i * Math.PI / 3),
                    y: 0.5 * this.height + this.radius * Math.sin(-Math.PI / 2 + 2 * i * Math.PI / 3)
                },
                2 * this.radius * Math.sin(Math.PI / 3),
                (2 * i + 1) * Math.PI / 3,
                ElementOriginType.start,
                false,
                FractalImage.OPTION.timeStep
            ));
        }
        console.log(this.elementGroup);
    }

    draw() {
        if (!this.context) {
            return;
        }

        this.clear(FractalImage.OPTION.backgroundColor);
        this.context.save();
        // this.context.fillStyle = '#084';
        // this.context.fillRect(200, 200, 300, 220);
        this.elementGroup[this.currentDeep].forEach((item) => item.draw(this.context, FractalImage.OPTION.showColor));
        // this.context.strokeStyle = FractalImage.OPTION.showColor;
        // for (let i = 0; i < 3; i++) {
        //     const p: Point = {
        //         x: 0.5 * this.width + this.radius * Math.cos(-Math.PI / 2 + 2 * i * Math.PI / 3),
        //         y: 0.5 * this.height + this.radius * Math.sin(-Math.PI / 2 + 2 * i * Math.PI / 3)
        //     }
        //     this.context.beginPath();
        //     this.context.arc(p.x, p.y, 10, 0, 2 * Math.PI, false);
        //     this.context.stroke();
        //     this.context.beginPath();
        //     this.context.arc(p.x, p.y, this.radius, 0, 2 * Math.PI, false);
        //     this.context.stroke();
        // }
        this.context.restore();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
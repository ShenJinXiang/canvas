import Animate from '@/lib/Animate';
import { random } from '@/lib/Kit';

interface IOption {
    backgroundColor: string;
    rainColor: string;
}

class Element {
    private x: number;
    private y: number;
    private vx: number;
    private vy: number;
    private length: number;
    constructor({x, y, vx, vy, length}: {x: number, y: number, vx: number, vy: number, length: number}) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.length = length;
    }

    update(maxX: number, maxY: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > maxX || this.y - this.length > maxY) {
            this.x = Math.random() * maxX;
            this.y = -this.length;
        }
    }

    draw(context: CanvasRenderingContext2D | null, color: string) {
        if (!context) {
            return;
        }
        context.beginPath();
        context.strokeStyle = color;
        context.lineCap = 'round';
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.length * this.vx, this.y + this.length * this.vy);
        context.stroke();
    }

}

export default class RainAnimation extends Animate {
    private static readonly option: IOption = {
        backgroundColor: '#061928',
        rainColor: 'rgba(174,194,224,0.5)',
    }
    private elements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {
        this.elements = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (Math.round(Math.random() * 1000) == 1) {
                    this.elements.push(new Element({
                        x: x,
                        y: y,
                        vx: random(-1, 3),
                        vy: random(8, 14),
                        length: random(0, 1)
                    }));
                }
            }
        }
    }

    update() {
        this.elements.forEach((item) => item.update(this.width, this.height));
    }

    draw() {
        if (!this.context) {
            return;
        }
        this.clear(RainAnimation.option.backgroundColor);
        this.context.save();
        this.elements.forEach((item) => item.draw(this.context, RainAnimation.option.rainColor));
        this.context.restore();
    }

    public setRect(width: number, height: number) {
        this.initRect(width, height);
        this.initData();
    }
}
import Animate from "@/lib/Animate";

interface IOption {
  minRoundTime: number;
  maxRoundTime: number;
  elementColors: string[];
  elementNumberRatio: number;
}

class Element {
  private x: number;
  private y: number;
  private color: string;
  private angle: number;
  private angleStep: number;
  private roundRadius: number;
  protected size: number;
  constructor(x: number, y: number, roundRadius: number, size: number, color: string, roundTime: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = 0;
    this.angleStep = 2 * Math.PI / roundTime;
    this.roundRadius = roundRadius;
    this.size = size;
  }
  public update() {
    this.angle += this.angleStep;
  }
  public position(x: number, y: number, roundRadius: number): this {
    this.x = x;
    this.y = y;
    return this;
  }
  public setRoundRadius(roundRadius: number): this {
    this.roundRadius = roundRadius;
    return this;
  }
  public setSize(size: number): this {
    this.size = size;
    return this;
  }
  public draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.x + this.roundRadius * Math.cos(this.angle), this.y + this.roundRadius * Math.sin(this.angle));
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    this.path(context);
    context.fill();
    context.restore();
  }

  private path(context: CanvasRenderingContext2D) { }
}

class CircleElement extends Element {
  constructor(x: number, y: number, roundRadius: number, size: number, color: string, roundTime: number) {
    super(x, y, roundRadius, size, color, roundTime);
  }
  private path(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(0, 0, this.size, 0, 2 * Math.PI, false);
  }
}
class RectElement extends Element {
  constructor(x: number, y: number, roundRadius: number, size: number, color: string, roundTime: number) {
    super(x, y, roundRadius, size, color, roundTime);
  }
  private path(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.rect(-0.5 * this.size, -0.5 * this.size, this.size, this.size);
  }
}

export default class CardioidAnimation extends Animate {

  private elements: Element[] = [];
  private option: IOption = {
    minRoundTime: 50,
    maxRoundTime: 100,
    elementColors: ['#0f628b', '#ccdff0', '#66ebff', '#ffffff', '#f0ff00'],
    elementNumberRatio: 1,
  };
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    this.elements = [];
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(200, 200, 260, 120);
    this.context.restore();
  }
}
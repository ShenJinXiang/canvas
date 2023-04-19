import Animate from "@/lib/Animate";
import { random, randomInt } from "@/lib/Kit";
import Point from "@/lib/Point";

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

  path(context: CanvasRenderingContext2D) { }
}

class CircleElement extends Element {
  constructor(x: number, y: number, roundRadius: number, size: number, color: string, roundTime: number) {
    super(x, y, roundRadius, size, color, roundTime);
  }
  path(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(0, 0, this.size * 0.5, 0, 2 * Math.PI, false);
  }
}
class RectElement extends Element {
  constructor(x: number, y: number, roundRadius: number, size: number, color: string, roundTime: number) {
    super(x, y, roundRadius, size, color, roundTime);
  }
  path(context: CanvasRenderingContext2D) {
    // context.rotate(Math.PI / 4);
    context.beginPath();
    // context.rect(-0.5 * this.size, -0.5 * this.size, this.size, this.size);
    context.moveTo(0.5 * this.size, 0);
    context.lineTo(0, 0.5 * this.size);
    context.lineTo(-0.5 * this.size, 0);
    context.lineTo(0, -0.5 * this.size);
    context.closePath();
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
    const base = Math.min(this.width, this.height);
    const elementNumber = Math.floor(base / 6);
    const angleStep = 2 * Math.PI / elementNumber;
    const baseRadius = base * 0.4 / 16;
    const [minRoundRadius, maxRoundRadius] = [base * 0.0062, base * 0.013];
    const [minElementSize, maxElementSize] = [base * 0.003, base * 0.02];
    for (let i = 0; i < elementNumber; i++) {
      const color = this.option.elementColors[randomInt(this.option.elementColors.length)];
      const roundRadius = random(minRoundRadius, maxRoundRadius);
      const size = random(minElementSize, maxElementSize);
      const roundTime = random(this.option.minRoundTime, this.option.maxRoundTime);
      const p: Point = this.cardioidPosition(baseRadius, i * angleStep);
      this.elements.push(
        random() > 0.6 ?
          new CircleElement(p.x, p.y, roundRadius, size, color, roundTime) :
          new RectElement(p.x, p.y, roundRadius, size, color, roundTime)
      );
    }
  }

  private cardioidPosition(r: number, θ: number): Point {
    return {
      x: r * 16 * Math.pow(Math.sin(θ), 3),
      y: -r * (13 * Math.cos(θ) - 5 * Math.cos(2 * θ) - 2 * Math.cos(3 * θ) - Math.cos(4 * θ))
    }
  }

  update() {
    this.elements.forEach((item) => item.update());
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.context.translate(0.5 * this.width, 0.45 * this.height);
    this.elements.forEach((item) => item.draw(this.context));
    this.context.restore();
  }
  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
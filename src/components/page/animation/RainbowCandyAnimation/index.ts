import Animate from "@/lib/Animate";

class Element {
  private x: number;
  private y: number;
  private radius: number;
  private amplitude: number;
  private angleStep: number;
  private style: string;
  private angle: number;
  constructor(x: number, y: number, radius: number, amplitude: number, angleStep: number, style: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.amplitude = amplitude;
    this.angle = 0;
    this.angleStep = angleStep;
    this.style = style;
  }

  update() {
    this.angle += this.angleStep;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.x, this.y);
    context.beginPath();
    context.fillStyle = this.style;
    context.arc(0, this.amplitude * Math.sin(this.angle), this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
  }
}

export default class RainbowCandyAnimation extends Animate {

  private radius: number = 0;
  private amplitude: number = 0;
  private elements: Element[] = [];
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    this.radius = this.width * 0.002;
    this.amplitude = this.height * 0.35;
    this.elements = [];
    let x: number = this.width / 2;
    let len: number = 0;
    let angle: number = 0;
    let count: number = 0;
    let cstep: number = 720 / (this.width / (this.radius * 2 + 1));
    while(len < this.width / 2) {
      if (len === 0) {
          this.elements.push(new Element(
              this.width / 2,
              this.height / 2,
              this.radius,
              this.amplitude,
              angle,
              'hsla(0, 100%, 60%, 1)'
          ));
      } else {
          this.elements.push(new Element(
              this.width / 2 + len,
              this.height / 2,
              this.radius,
              this.amplitude,
              angle + count * 0.001,
              // 0,
              'hsla(' + (count * cstep) + ', 100%, 60%, 1)'
          ));
          this.elements.push(new Element(
              this.width / 2 - len,
              this.height / 2,
              this.radius,
              this.amplitude,
              angle - count * 0.001,
              // 0,
              'hsla(' + (count * cstep) + ', 100%, 60%, 1)'
          ));
      }
      len += 2 * this.radius + 1;
      count++;
    }
    console.log(this.elements);

  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear('#000');
    this.context.save();
    this.elements.forEach((item) => item.draw(this.context));
    this.context.restore();
  }

  public setRect(width: number, height: number): this {
    this.initRect(width, height);
    this.initData();
    return this;
  }
}
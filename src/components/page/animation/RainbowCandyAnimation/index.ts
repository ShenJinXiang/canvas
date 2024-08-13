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
    context.fillStyle = this.style;
    context.arc(0, this.amplitude * Math.sin(this.angle), this.radius, 0, Math.PI * 2, false);
    context.restore();
  }
}

export default class RainbowCandyAnimation extends Animate {
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
  }

  private initData() {

  }

  draw() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.restore();
  }

  public setRect(width: number, height: number): this {
    this.initRect(width, height);
    this.initData();
    return this;
  }
}
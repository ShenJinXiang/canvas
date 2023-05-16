import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string
  elementNumber: number
}

class Element {
  private x: number;
  private y: number;
  private radius: number;
  private width: number;
  private beginAngle: number;
  private angleStep: number;
  private style: string;
  private angle: number;
  constructor(x: number, y: number, radius: number, width: number, beginAngle: number, angleStep: number, style: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.width = width;
    this.beginAngle = beginAngle;
    this.angleStep = angleStep;
    this.style = style;
    this.angle = this.beginAngle;
  }
  update() {
    this.angle += this.angleStep;
  }
  draw(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.strokeStyle = this.style;
    ctx.arc(0, 0, this.radius, this.angle, Math.PI + this.angle, false);
    ctx.stroke();
    ctx.restore();
  }
  refresh(x: number, y: number, radius: number, width: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.width = width;
  }
}
export default class RotateConstructionAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#061928',
    elementNumber: 30
  };
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData(): this {
    const base = Math.min(this.width, this.height);
    const radius = 0.4 * base;
    const elementWidth = radius / this.option.elementNumber;
    return this;
  }

  draw(): void {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.context.fillStyle = 'red';
    this.context.fillRect(-120, -80, 240, 160);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
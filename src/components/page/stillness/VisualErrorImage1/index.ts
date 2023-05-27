import BaseCanvas from "@/lib/BaseCanvas";
import Point from "@/lib/Point";

class Parallelogram {
  private x: number;
  private y: number;
  private width1: number;
  private width2: number;
  private angle: number;
  private rotate: number;
  private path: Path2D;
  private points: Point[] = [];
  constructor(x: number, y: number, width1: number, width2: number, angle: number, rotate: number) {
    this.x = x;
    this.y = y;
    this.width1 = width1;
    this.width2 = width2;
    this.angle = angle;
    this.rotate = rotate;
    this.path = new Path2D();
    this.initPath();
  }
  initPath() {
    this.points = [
      { x: 0, y: 0 },
      { x: this.width2 * Math.cos(this.angle), y: this.width2 * Math.sin(this.angle) },
      { x: this.width2 * Math.cos(this.angle) + this.width1, y: this.width2 * Math.sin(this.angle) },
      { x: this.width1, y: 0 },
    ];
    this.path = new Path2D();
    this.points.forEach((item) => {
      this.path.lineTo(item.x, item.y);
    });
    this.path.closePath();
  }
  stroke(ctx: CanvasRenderingContext2D | null, style: string | CanvasGradient | CanvasPattern, lineWidth = 1) {
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate);
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.stroke(this.path);
    ctx.restore();
  }
  fill(ctx: CanvasRenderingContext2D | null, style: string | CanvasGradient | CanvasPattern) {
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate);
    ctx.fillStyle = style;
    ctx.fill(this.path);
    ctx.restore();
  }
}

export default class VisualErrorImage extends BaseCanvas {
  private elements: Parallelogram[] = []
  private color: string = 'green';
  private sideWidth: number = 0;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData(): this {
    const base = Math.min(this.width, this.height);
    this.sideWidth = base * 0.02;
    const radius1 = base * 0.3;
    const radius2 = base * 0.4;
    const num1 = Math.floor(radius1 * Math.PI / this.sideWidth);
    const num2 = Math.floor(radius2 * Math.PI / this.sideWidth);
    this.elements = [];
    for (let i = 0, angle = 2 * Math.PI / num1; i < num1; i++) {
      this.elements.push(new Parallelogram(
        radius1 * Math.cos(i * angle),
        radius1 * Math.sin(i * angle),
        this.sideWidth,
        this.sideWidth,
        2 * Math.PI / 3,
        i * angle - Math.PI / 2
      ));
    }
    for (let i = 0, angle = 2 * Math.PI / num2; i < num2; i++) {
      this.elements.push(new Parallelogram(
        radius2 * Math.cos(i * angle),
        radius2 * Math.sin(i * angle),
        this.sideWidth,
        this.sideWidth,
        Math.PI / 3,
        i * angle - Math.PI / 2
      ));
    }
    return this;
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.context.lineWidth = this.sideWidth * 0.4;
    this.context.strokeStyle = this.color;

    this.context.beginPath();
    this.context.moveTo(-this.sideWidth, 0);
    this.context.lineTo(this.sideWidth, 0);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(0, -this.sideWidth);
    this.context.lineTo(0, this.sideWidth);
    this.context.stroke();

    this.elements.forEach((item) => item.fill(this.context, this.color));
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
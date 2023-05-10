import BaseCanvas from "@/lib/BaseCanvas";
import Point from "@/lib/Point";

class Parallelogram {
  private x: number;
  private y: number;
  private width1: number;
  private width2: number;
  private angle: number;
  private rotate: number;
  private style: string;
  private path: Path2D;
  private points: Point[] = [];
  constructor(x: number, y: number, width1: number, width2: number, angle: number, rotate: number, style: string) {
    this.x = x;
    this.y = y;
    this.width1 = width1;
    this.width2 = width2;
    this.angle = angle;
    this.rotate = rotate;
    this.style = style;
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
    ctx.strokeStyle = style || this.style;
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
    ctx.fillStyle = style || this.style;
    ctx.fill(this.path);
    ctx.restore();
  }
}

export default class VisualErrorImage extends BaseCanvas {
  private elements = []
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData(): this {
    const base = Math.min(this.width, this.height);
    const sideWidth = base * 0.02;
    const radius1 = base * 0.3;
    const radius2 = base * 0.4;
    const num1 = Math.floor(radius1 * Math.PI / sideWidth);
    const num2 = Math.floor(radius2 * Math.PI / sideWidth);

    return this;
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    const p1 = new Parallelogram(-100, 0, 100, 120, Math.PI / 4, 0, '#084');
    p1.fill(this.context, '#084');
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
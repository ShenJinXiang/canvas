import { FillOption, StrokeOption } from "./DrawOption";

export interface PolygonOption {
  ox: number;
  oy: number;
  sideNum: number;
  radius: number;
  rotate: number;
}

export class Polygon {
  private ox: number;
  private oy: number;
  private sideNum: number;
  private radius: number;
  private rotate: number;
  private angleStep: number;
  private path: Path2D;
  constructor(options: PolygonOption) {
    this.ox = options.ox;
    this.oy = options.oy;
    this.sideNum = options.sideNum;
    this.radius = options.radius;
    this.rotate = options.rotate;
    if (this.sideNum < 3) {
      this.sideNum = 3;
    }

    this.angleStep = 2 * Math.PI / this.sideNum;
    this.path = this.generatePath();
  }

  setRadius(radius: number) {
    this.radius = radius;
    this.path = this.generatePath();
  }

  private generatePath(): Path2D {
    const path = new Path2D();
    for (let i = 0; i < this.sideNum; i++) {
        path.lineTo(
            this.radius * Math.cos(i * this.angleStep),
            this.radius * Math.sin(i * this.angleStep)
        );
    }
    path.closePath();
    return path;
  }

  stroke(context: CanvasRenderingContext2D | null, { lineWidth = 1, strokeStyle = '#000' }: StrokeOption) {
    if (!context) {
      return;
    }
    context.beginPath();
    context.save();
    context.translate(this.ox, this.oy);
    context.rotate(this.rotate);
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.stroke(this.path);
    context.restore();
  }

  fill(ctx: CanvasRenderingContext2D | null, { fillStyle = '#000' }: FillOption) {
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.translate(this.ox, this.oy);
    ctx.rotate(this.rotate);
    ctx.fillStyle = fillStyle;
    ctx.fill(this.path);
    ctx.restore();
  }

}

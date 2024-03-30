import { FillOption, StrokeOption } from "./DrawOption";

export interface PolygonOption {
  ox: number;
  oy: number;
  sideNum: number;
  radius: number;
  rotate: number;
}

export class Polygon {
  protected ox: number;
  protected oy: number;
  protected sideNum: number;
  protected radius: number;
  protected rotate: number;
  protected path: Path2D;
  constructor(options: PolygonOption) {
    this.ox = options.ox;
    this.oy = options.oy;
    this.sideNum = options.sideNum;
    this.radius = options.radius;
    this.rotate = options.rotate;
    if (this.sideNum < 3) {
      this.sideNum = 3;
    }

    this.path = this.generatePath();
  }

  setRadius(radius: number) {
    this.radius = radius;
    this.path = this.generatePath();
  }

  getRadius() {
    return this.radius;
  }

  setRotate(rotate: number) {
      this.rotate = rotate;
  }

  private generatePath(): Path2D {
    const angleStep = 2 * Math.PI / this.sideNum;
    const path = new Path2D();
    for (let i = 0; i < this.sideNum; i++) {
        path.lineTo(
            this.radius * Math.cos(i * angleStep),
            this.radius * Math.sin(i * angleStep)
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

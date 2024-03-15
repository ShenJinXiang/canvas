import Animate from "@/lib/Animate";
import { FillOption, StrokeOption } from "@/lib/DrawOption";

interface IOption {
  backgroundColor: string;
}

interface PolygonOption {
  ox: number;
  oy: number;
  sideNum: number;
  radius: number;
  rotate: number;
}

class Polygon {
  private ox: number;
  private oy: number;
  private sideNum: number;
  private radius: number;
  private rotate: number;
  private style: string;
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

export default class RotateConstructionAnimation extends Animate {
  private static readonly OPTION: IOption = {
    backgroundColor: '#000',
  }
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
  }

  draw() {
    if (!this.context) {
        return;
    }
    this.clear(RotateConstructionAnimation.OPTION.backgroundColor);
    this.context.save();
    // this.context.lineWidth = 2;
    // this.context.strokeStyle = 'red';
    // this.context.strokeRect(200, 200, 300, 220);
    const p = new Polygon({
      ox: this.width / 2,
      oy: this.height / 2,
      radius: 140,
      rotate: 0,
      sideNum: 5,
    });
    p.stroke(this.context, { lineWidth: 2, strokeStyle: 'red' });
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
}
}
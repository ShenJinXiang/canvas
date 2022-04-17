import { StrokeOption } from "./DrawOption";

export default class Line {
  sx: number;
  sy: number;
  private ex: number;
  private ey: number;
  constructor(sx: number, sy: number, ex: number, ey: number) {
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
  }

  stroke(context: CanvasRenderingContext2D | null, { strokeStyle = '#000', lineWidth = 1 }: StrokeOption) {
    if (!context) {
      return;
    }
    context.save();
    context.lineWidth = lineWidth || 1;
    context.strokeStyle = strokeStyle;
    context.beginPath();
    context.moveTo(this.sx, this.sy);
    context.lineTo(this.ex, this.ey);
    context.closePath();
    context.stroke();
    context.restore();
  }
}

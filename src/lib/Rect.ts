import { FillOption, StrokeOption } from "@/lib/DrawOption";

export default class Rect {
  sx: number;
  sy: number;
  width: number;
  height: number;
  constructor(sx: number, sy: number, width: number, height: number) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
  }
  stroke(context: CanvasRenderingContext2D | null, { lineWidth = 1, strokeStyle = '#000' }: StrokeOption) {
    if (!context) {
      return;
    }
    context.save();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.strokeRect(this.sx, this.sy, this.width, this.height);
    context.restore();
  }

  fill(ctx: CanvasRenderingContext2D | null, { fillStyle = '#000' }: FillOption) {
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.fillRect(this.sx, this.sy, this.width, this.height);
    ctx.restore();
  }
}
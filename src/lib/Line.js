export default class Line {
  constructor(sx, sy, ex, ey) {
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
  }

  draw(context, style, lineWidth) {
    const ctx = context;
    ctx.save();
    ctx.lineWidth = lineWidth || 1;
    ctx.strokeStyle = style;
    ctx.beginPath();
    ctx.moveTo(this.sx, this.sy);
    ctx.lineTo(this.ex, this.ey);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

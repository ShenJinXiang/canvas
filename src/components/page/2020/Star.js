export default class Start {
  constructor(ox, oy, radius, rotate) {
    this.ox = ox;
    this.oy = oy;
    this.radius = radius;
    this.rotate = rotate;
  }

  path(ctx) {
    ctx.translate(this.ox, this.oy);
    ctx.scale(this.radius, this.radius);
    ctx.rotate(this.rotate);
    ctx.beginPath();
    ctx.moveTo(1, 0);
    ctx.lineTo(Math.cos((4 * Math.PI) / 5), -Math.sin((4 * Math.PI) / 5));
    ctx.lineTo(Math.cos((-2 * Math.PI) / 5), -Math.sin((-2 * Math.PI) / 5));
    ctx.lineTo(Math.cos((2 * Math.PI) / 5), -Math.sin((2 * Math.PI) / 5));
    ctx.lineTo(Math.cos((-4 * Math.PI) / 5), -Math.sin((-4 * Math.PI) / 5));
    ctx.closePath();
  }

  stroke(context, lineWidth, style) {
    const ctx = context;
    ctx.save();
    this.path(ctx);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = style;
    ctx.stroke();
    ctx.restore();
  }

  fill(context, style) {
    const ctx = context;
    ctx.save();
    this.path(ctx);
    ctx.fillStyle = style;
    ctx.fill();
    ctx.restore();
  }
}

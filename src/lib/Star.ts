export default class Star {
  ox: number;
  oy: number;
  radius: number;
  rotate: number;

  constructor(ox: number, oy: number, radius: number, rotate: number) {
    this.ox = ox;
    this.oy = oy;
    this.radius = radius;
    this.rotate = rotate;
  }

  path(ctx: CanvasRenderingContext2D) {
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

  stroke(context: CanvasRenderingContext2D | null, lineWidth: number, style: string) {
    if (!context) {
      return;
    }
    context.save();
    this.path(context);
    context.lineWidth = lineWidth;
    context.strokeStyle = style;
    context.stroke();
    context.restore();
  }

  fill(ctx: CanvasRenderingContext2D | null, style: string) {
    if (!ctx) {
      return;
    }
    ctx.save();
    this.path(ctx);
    ctx.fillStyle = style;
    ctx.fill();
    ctx.restore();
  }
}

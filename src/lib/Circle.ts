import { FillOption } from "./DrawOption";

export default class Circle {
  ox: number;
  oy: number;
  radius: number;
  xVelocity: number;
  yVelocity: number;
  constructor(ox: number, oy: number, radius: number, xVelocity: number, yVelocity: number) {
    this.ox = ox;
    this.oy = oy;
    this.radius = radius;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
  }
  draw(context: CanvasRenderingContext2D | null, { fillStyle = '#000' }: FillOption) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.ox, this.oy);
    context.scale(this.radius, this.radius);
    context.fillStyle = fillStyle;
    context.beginPath();
    context.arc(0, 0, 1, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();
    context.restore();
  }
  update(minX: number, minY: number, maxX: number, maxY: number): Circle {
    this.ox += this.xVelocity;
    this.oy += this.yVelocity;
    if (this.ox - this.radius < minX) {
      this.ox = this.radius + minX;
      this.xVelocity = -this.xVelocity;
    }
    if (this.ox + this.radius > maxX) {
      this.ox = maxX - this.radius;
      this.xVelocity = -this.xVelocity;
    }
    if (this.oy - this.radius < minY) {
      this.oy = this.radius + minY;
      this.yVelocity = -this.yVelocity;
    }
    if (this.oy + this.radius > maxY) {
      this.oy = maxY - this.radius;
      this.yVelocity = -this.yVelocity;
    }
    return this;
  }
}
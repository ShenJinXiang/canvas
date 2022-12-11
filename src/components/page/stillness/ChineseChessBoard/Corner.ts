import { StrokeOption } from "@/lib/DrawOption";

export default class Corner {
  ox: number;
  oy: number;
  quadrants: number[];
  distance: number;
  lineLength: number;
  constructor(ox: number, oy: number, quadrants: number[], distance: number, lineLength: number) {
    this.ox = ox;
    this.oy = oy;
    this.quadrants = quadrants;
    this.distance = distance;
    this.lineLength = lineLength;
  }

  stroke(context: CanvasRenderingContext2D | null, { strokeStyle = '#000', lineWidth = 1 }: StrokeOption) {
    if (!context) {
      return;
    }
    context.save();
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.translate(this.ox, this.oy);
    this.quadrants.forEach((item) => {
      context.save();
      context.rotate(item * (Math.PI / 2));
      context.beginPath();
      context.moveTo(this.distance, this.distance + this.lineLength);
      context.lineTo(this.distance, this.distance);
      context.lineTo(this.distance + this.lineLength, this.distance);
      context.stroke();
      context.restore();
    });
    context.restore();
  }
}

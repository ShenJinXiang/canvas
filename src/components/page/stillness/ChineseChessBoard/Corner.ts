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

  stroke(context: CanvasRenderingContext2D | null, options: StrokeOption = {}) {
    if (!context) {
      return;
    }
    const { strokeStyle = '#000', lineWidth = 1 } = options;
    context.save();
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.translate(this.ox, this.oy);
    this.quadrants.forEach((item) => {
      this.drawQuadrant(context, item);
    });
    context.restore();
  }

  private drawQuadrant(context: CanvasRenderingContext2D, quadrant: number) {
    context.save();
    context.rotate(quadrant * (Math.PI / 2));
    context.beginPath();
    context.moveTo(this.distance, this.distance + this.lineLength);
    context.lineTo(this.distance, this.distance);
    context.lineTo(this.distance + this.lineLength, this.distance);
    context.stroke();
    context.restore();
  }
}


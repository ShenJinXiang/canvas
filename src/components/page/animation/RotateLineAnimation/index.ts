import Animate from "@/lib/Animate";

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  draw(context: CanvasRenderingContext2D | null, radius: number, color: string) {
    if (!context) {
      return;
    }
    context.save();
    context.beginPath();
    context.fillStyle = color;
    context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}
export class RotateLineAnimation extends Animate {
  sideNumber: number;
  pointNumber: number;
  points: Point[] = [];
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.sideNumber = 5;
    this.pointNumber = 15;
    this.initData();
  }

  private initData() {
    this.points = [];
  }

  draw() {
    this.clear();
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 340, 200);
    this.context.restore();
  }
}
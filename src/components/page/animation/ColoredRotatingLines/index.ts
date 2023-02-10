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

export default class ColoredRotatingLines extends Animate {
  pointNumber: number = 200;
  innerRadius: number = 0;
  outerRadius: number = 0;
  innerPoints: Point[] = [];
  outerPoints: Point[] = [];

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    this.innerRadius = Math.min(this.width, this.height) * .4 + 10;
    this.outerRadius = Math.sqrt(Math.pow(0.5 * this.width, 2) + Math.pow(0.5 * this.height, 2)) + 10;
    this.innerPoints = [];
    this.outerPoints = [];
    const angStep = 2 * Math.PI / this.pointNumber;
    for (let i = 0; i < this.pointNumber; i++) {
      this.innerPoints.push(new Point(this.innerRadius * Math.cos(i * angStep), this.innerRadius * Math.sin(i * angStep)));
      this.outerPoints.push(new Point(this.outerRadius * Math.cos(i * angStep), this.outerRadius * Math.sin(i * angStep)));
    }
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear('#000');
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.innerPoints.forEach((item) => {
      item.draw(this.context, 2, '#fff');
    });
    this.outerPoints.forEach((item) => {
      item.draw(this.context, 2, '#fff');
    });
    this.context.restore();
  }

}
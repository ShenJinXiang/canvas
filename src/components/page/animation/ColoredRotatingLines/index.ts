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
  current: number = 0;

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

  update() {
    this.current = performance.now() / 2000;
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear('#000');
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.innerPoints.forEach((item, index) => {
      const outerPoint: Point = this.outerPoints[index];
      const targetPoint: Point = this.innerPoints[Math.floor(index * this.current) % this.innerPoints.length];
      item.draw(this.context, 2, '#fff');
      this.drawLine(item, targetPoint, '#fff');
      this.drawLine(item, outerPoint, '#fff');
    });
    this.context.restore();
  }

  private drawLine(point1: Point, point2: Point, color: string) {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);
    this.context.stroke();
    this.context.restore();
  }

}
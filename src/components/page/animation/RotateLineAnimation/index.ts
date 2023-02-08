import Animate from "@/lib/Animate";
interface IOption {
  backgroundColor: string;
  pointRadius: number;
  pointColor: string;
  lineColor: string;
}
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
  private option: IOption = {
    backgroundColor: '#000',
    pointRadius: 2,
    pointColor: '#fff',
    lineColor: '#fff'
  };
  current: number;
  points: Point[] = [];
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.current = 0;
    this.sideNumber = 5;
    this.pointNumber = 15;
    this.initData();
  }

  private initData() {
    this.points = [];
    const rotateStep: number = 2 * Math.PI / this.sideNumber;
    const radius: number = Math.min(this.width, this.height) * 0.35;
    for (let i: number = 0; i < this.sideNumber; i++) {
      const startRotate: number = -0.5 * Math.PI + rotateStep * i;
      const endRotate: number = startRotate + rotateStep;
      const [sx, sy, ex, ey] = [
        radius * Math.cos(startRotate),
        radius * Math.sin(startRotate),
        radius * Math.cos(endRotate),
        radius * Math.sin(endRotate)
      ]
      const xStep = (ex - sx) / this.pointNumber;
      const yStep = (ey - sy) / this.pointNumber;
      for (let j = 0; j < this.pointNumber; j++) {
        this.points.push(new Point(sx + j * xStep, sy + j * yStep));
      }
    }
  }

  update() {
    this.current = performance.now() / 2000;
  }

  draw() {
    this.clear(this.option.backgroundColor);
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.points.forEach((item, index) => {
      const jndex = Math.floor(index * this.current) % this.points.length;
      this.drawLine(item, this.points[jndex]);
    });
    this.points.forEach((item, index) => item.draw(this.context, this.option.pointRadius, this.option.pointColor));
    this.context.restore();
  }
  private drawLine(point1: Point, point2: Point) {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.strokeStyle = this.option.lineColor;
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);
    this.context.stroke();
    this.context.restore();
  }
}
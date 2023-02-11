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
      let dist = this.pointDistance(item, targetPoint);
      if (dist > 1) {
        dist = ~~this.distance(0.5 * this.width, 0.5 * this.height, (item.x + targetPoint.x) / 2, (item.y + targetPoint.y) / 2);
      }
      let strokeStyle = 'hsla(' + this.mapVal(dist, 0, 2 * this.innerRadius, 0, 360) + ', 100%, 50%, .6)';
      // let strokeStyle = `hsla(${dist % 360}, 100%, 50%, 0.6)`;
      item.draw(this.context, 2, strokeStyle);
      this.drawLine(item, targetPoint, strokeStyle);
      this.drawLine(item, outerPoint, strokeStyle);
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

  private pointDistance(point1: Point, point2: Point) {
    return this.distance(point1.x, point1.y, point2.x, point2.y);
  }
  private distance(sx: number, sy: number, ex: number, ey: number): number {
    return Math.sqrt(Math.pow(sx - ex, 2) + Math.pow(sy - ey, 2));
  }
  private mapVal(num: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

}
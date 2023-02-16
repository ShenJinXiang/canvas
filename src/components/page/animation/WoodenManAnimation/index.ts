import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  bodyColor: string;
  fixedPointColor: string;
}

class FixedPoint {
  x: number;
  y: number;
  hide: boolean;
  constructor(x: number, y: number, hide: boolean = false) {
    this.x = x;
    this.y = y;
    this.hide = hide;
  }
  draw(context: CanvasRenderingContext2D | null, radius: number, style: string) {
    if (!context || this.hide) {
      return;
    }
    context.save();
    context.beginPath();
    context.fillStyle = style;
    context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}

const distance = (point1: FixedPoint, point2: FixedPoint) =>
  Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));

class Head {
  fixedPoint: FixedPoint;
  rotate: number;
  constructor(fixedPoint: FixedPoint, rotate: number) {
    this.fixedPoint = fixedPoint;
    this.rotate = rotate;
  }
  draw(context: CanvasRenderingContext2D | null, radius: number, style: string) {
    if (!context) {
      return;
    }
    context.save();
    context.beginPath();
    context.translate(this.fixedPoint.x, this.fixedPoint.y);
    context.fillStyle = style;
    context.arc(0.5 * radius * Math.cos(this.rotate), 0.5 * radius * Math.sin(this.rotate), radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}
class Limb {
  fixedPoint1: FixedPoint;
  fixedPoint2: FixedPoint;
  length: number;
  next: Limb | null = null;
  constructor(fixedPoint1: FixedPoint, fixedPoint2: FixedPoint) {
    this.fixedPoint1 = fixedPoint1;
    this.fixedPoint2 = fixedPoint2;
    this.length = distance(this.fixedPoint1, this.fixedPoint2);
  }

  setNextElement(next: Limb) {
    this.next = next;
  }

  draw(context: CanvasRenderingContext2D | null, limbSize: number, style: string) {
    if (!context) {
      return;
    }
    context.save();
    context.beginPath();
    context.lineWidth = limbSize;
    context.strokeStyle = style;
    context.lineCap = 'round';
    context.moveTo(this.fixedPoint1.x, this.fixedPoint1.y);
    context.lineTo(this.fixedPoint2.x, this.fixedPoint2.y);
    context.stroke();
    context.restore();
  }

}

export default class WoodenManAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#f1f1f1',
    bodyColor: '#333',
    fixedPointColor: '#e1e1e1'
  };
  points: FixedPoint[] = [];
  head: Head | null = null;
  limbs: Limb[] = [];
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    this.points = [
      new FixedPoint(400, 100),
      new FixedPoint(400, 150),
      new FixedPoint(300, 200),
      new FixedPoint(240, 260),
      new FixedPoint(500, 200),
      new FixedPoint(560, 260),
      new FixedPoint(400, 300),
      new FixedPoint(320, 420),
      new FixedPoint(480, 420),
      new FixedPoint(260, 520),
      new FixedPoint(540, 520),
      new FixedPoint(220, 520),
      new FixedPoint(580, 520),
    ];
    this.head = new Head(this.points[0], -0.5 * Math.PI);
    this.limbs = [
      new Limb(this.points[0], this.points[1]),
      new Limb(this.points[1], this.points[2]),
      new Limb(this.points[2], this.points[3]),
      new Limb(this.points[1], this.points[4]),
      new Limb(this.points[4], this.points[5]),
      new Limb(this.points[1], this.points[6]),
      new Limb(this.points[6], this.points[7]),
      new Limb(this.points[6], this.points[8]),
      new Limb(this.points[7], this.points[9]),
      new Limb(this.points[8], this.points[10]),
      new Limb(this.points[9], this.points[11]),
      new Limb(this.points[10], this.points[12]),
    ]
  }

  update() {
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.head?.draw(this.context, 40, this.option.bodyColor);
    this.limbs.forEach((item) => item.draw(this.context, 20, this.option.bodyColor));
    this.points.forEach((item) => item.draw(this.context, 3, this.option.fixedPointColor));
    this.context.restore();
  }
}
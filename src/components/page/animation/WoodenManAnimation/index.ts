import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  bodyColor: string;
  fixedPointColor: string;
}
interface ILimbSize {
  headRadius: number; // 头部半径
  neck: number;  // 脖子
  upperArm: number;  //  上臂
  lowerArm: number;  // 下臂
  body: number;  // 身躯
  thigh: number; // 大腿
  calf: number;  // 小腿
  foot: number;  // 脚
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
  baseSize: number = 0;
  points: FixedPoint[] = [];
  head: Head | null = null;
  limbs: Limb[] = [];
  limbSize: ILimbSize = {
    headRadius: 0,
    neck: 0,
    upperArm: 0,
    lowerArm: 0,
    body: 0,
    thigh: 0,
    calf: 0,
    foot: 0
  }
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    this.baseSize = Math.min(this.width, this.height) * 0.02;
    this.limbSize = {
      headRadius: 4 * this.baseSize,
      neck: 2 * this.baseSize,
      upperArm: 8 * this.baseSize,
      lowerArm: 6 * this.baseSize,
      body: 12 * this.baseSize,
      thigh: 9 * this.baseSize,
      calf: 7 * this.baseSize,
      foot: 1.5 * this.baseSize
    };
    this.points = [
      new FixedPoint(0, -this.limbSize.neck - this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(Math.PI / 12)),
      new FixedPoint(0, -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(Math.PI / 12)),
      new FixedPoint(0, -(this.limbSize.thigh + this.limbSize.calf) * Math.cos(Math.PI / 12)),

      new FixedPoint(this.limbSize.upperArm * Math.sin(Math.PI / 4), -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(Math.PI / 12) + this.limbSize.upperArm * Math.cos(Math.PI / 4)),
      new FixedPoint((this.limbSize.upperArm + this.limbSize.lowerArm) * Math.sin(Math.PI / 4), -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(Math.PI / 12) + (this.limbSize.upperArm + this.limbSize.lowerArm) * Math.cos(Math.PI / 4)),
      new FixedPoint(-this.limbSize.upperArm * Math.sin(Math.PI / 4), -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(Math.PI / 12) + this.limbSize.upperArm * Math.cos(Math.PI / 4)),
      new FixedPoint(-(this.limbSize.upperArm + this.limbSize.lowerArm) * Math.sin(Math.PI / 4), -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(Math.PI / 12) + (this.limbSize.upperArm + this.limbSize.lowerArm) * Math.cos(Math.PI / 4)),

      new FixedPoint(this.limbSize.thigh * Math.sin(Math.PI / 12), -this.limbSize.calf * Math.cos(Math.PI / 12)),
      new FixedPoint((this.limbSize.thigh + this.limbSize.calf) * Math.sin(Math.PI / 12), 0),
      new FixedPoint((this.limbSize.thigh + this.limbSize.calf) * Math.sin(Math.PI / 12) + this.limbSize.foot, 0),

      new FixedPoint(-this.limbSize.thigh * Math.sin(Math.PI / 12), -this.limbSize.calf * Math.cos(Math.PI / 12)),
      new FixedPoint(-(this.limbSize.thigh + this.limbSize.calf) * Math.sin(Math.PI / 12), 0),
      new FixedPoint(-(this.limbSize.thigh + this.limbSize.calf) * Math.sin(Math.PI / 12) - this.limbSize.foot, 0),
    ];
    this.head = new Head(this.points[0], -0.5 * Math.PI);
    this.limbs = [
      new Limb(this.points[0], this.points[1]),
      new Limb(this.points[1], this.points[2]),
      new Limb(this.points[1], this.points[3]),
      new Limb(this.points[3], this.points[4]),
      new Limb(this.points[1], this.points[5]),
      new Limb(this.points[5], this.points[6]),
      new Limb(this.points[2], this.points[7]),
      new Limb(this.points[7], this.points[8]),
      new Limb(this.points[8], this.points[9]),
      new Limb(this.points[2], this.points[10]),
      new Limb(this.points[10], this.points[11]),
      new Limb(this.points[11], this.points[12])
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
    this.context.translate(0.5 * this.width, this.height * 0.8);
    this.head?.draw(this.context, 40, this.option.bodyColor);
    this.limbs.forEach((item) => item.draw(this.context, 20, this.option.bodyColor));
    this.points.forEach((item) => item.draw(this.context, 3, this.option.fixedPointColor));
    this.context.restore();
  }
}
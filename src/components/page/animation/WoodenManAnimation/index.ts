import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

const deg = Math.PI / 180;
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
  limbWidth: number;
  jointRadius: number;
}

class FixedPoint {
  // x: number;
  // y: number;
  point: Point;
  hide: boolean;
  constructor(point: Point, hide: boolean = false) {
    this.point = point;
    this.hide = hide;
  }
  draw(context: CanvasRenderingContext2D | null, radius: number, style: string, index: number) {
    if (!context || this.hide) {
      return;
    }
    context.save();
    context.beginPath();
    context.fillStyle = style;
    context.arc(this.point.x, this.point.y, radius, 0, 2 * Math.PI, false);
    context.fill();

    context.beginPath();
    context.fillStyle = '#000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `${radius * 0.2}px`;
    context.fillText(`${index}`, this.point.x, this.point.y);
    context.restore();
  }
}

const distance = (point1: Point, point2: Point) =>
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
    context.translate(this.fixedPoint.point.x, this.fixedPoint.point.y);
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
    this.length = distance(this.fixedPoint1.point, this.fixedPoint2.point);
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
    context.moveTo(this.fixedPoint1.point.x, this.fixedPoint1.point.y);
    context.lineTo(this.fixedPoint2.point.x, this.fixedPoint2.point.y);
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
  pointPosition: Point[][] = [];
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
    foot: 0,
    limbWidth: 0,
    jointRadius: 0
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
      lowerArm: 7 * this.baseSize,
      body: 12 * this.baseSize,
      thigh: 8 * this.baseSize,
      calf: 8 * this.baseSize,
      foot: 2 * this.baseSize,
      limbWidth: 1.6 * this.baseSize,
      jointRadius: 0.4 * this.baseSize
    };
    this.pointPosition = [
      [
        { x: 0, y: -this.limbSize.neck - this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) },
        { x: 0, y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) },
        { x: 0, y: -(this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) },
        { x: this.limbSize.upperArm * Math.sin(45 * deg), y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) + this.limbSize.upperArm * Math.cos(45 * deg) },
        { x: (this.limbSize.upperArm + this.limbSize.lowerArm) * Math.sin(45 * deg), y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) + (this.limbSize.upperArm + this.limbSize.lowerArm) * Math.cos(45 * deg) },
        { x: -this.limbSize.upperArm * Math.sin(45 * deg), y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) + this.limbSize.upperArm * Math.cos(45 * deg) },
        { x: -(this.limbSize.upperArm + this.limbSize.lowerArm) * Math.sin(45 * deg), y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) + (this.limbSize.upperArm + this.limbSize.lowerArm) * Math.cos(45 * deg) },
        { x: this.limbSize.thigh * Math.sin(15 * deg), y: -this.limbSize.calf * Math.cos(15 * deg) },
        { x: (this.limbSize.thigh + this.limbSize.calf) * Math.sin(15 * deg), y: 0 },
        { x: (this.limbSize.thigh + this.limbSize.calf) * Math.sin(15 * deg) + this.limbSize.foot, y: 0 },
        { x: -this.limbSize.thigh * Math.sin(15 * deg), y: -this.limbSize.calf * Math.cos(15 * deg) },
        { x: -(this.limbSize.thigh + this.limbSize.calf) * Math.sin(15 * deg), y: 0 },
        { x: -(this.limbSize.thigh + this.limbSize.calf) * Math.sin(15 * deg) - this.limbSize.foot, y: 0 }
      ],
      [
        { x: 0, y: -this.limbSize.thigh - this.limbSize.body - this.limbSize.neck },
        { x: 0, y: -this.limbSize.thigh - this.limbSize.body },
        { x: 0, y: -this.limbSize.thigh },
        { x: this.limbSize.upperArm * Math.sin(45 * deg), y: -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * Math.cos(45 * deg) },
        { x: this.limbSize.upperArm * Math.sin(45 * deg) - this.limbSize.lowerArm * Math.sin(45 * deg), y: -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * Math.cos(45 * deg) + this.limbSize.lowerArm * Math.cos(45 * deg) },
        { x: -this.limbSize.upperArm * Math.sin(80 * deg), y: -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * Math.cos(80 * deg) },
        { x: -this.limbSize.upperArm * Math.sin(80 * deg), y: -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * Math.cos(80 * deg) + this.limbSize.lowerArm },
        { x: 0, y: 0 },
        { x: this.limbSize.calf, y: 0 },
        { x: this.limbSize.calf, y: -this.limbSize.foot },
        { x: -this.limbSize.thigh, y: -this.limbSize.thigh },
        { x: -this.limbSize.thigh, y: -this.limbSize.thigh + this.limbSize.calf },
        { x: -this.limbSize.thigh - this.limbSize.foot, y: -this.limbSize.thigh + this.limbSize.calf }
      ]
    ]
    this.points = [
      new FixedPoint(this.pointPosition[0][0]),
      new FixedPoint(this.pointPosition[0][1]),
      new FixedPoint(this.pointPosition[0][2]),
      new FixedPoint(this.pointPosition[0][3]),
      new FixedPoint(this.pointPosition[0][4]),
      new FixedPoint(this.pointPosition[0][5]),
      new FixedPoint(this.pointPosition[0][6]),
      new FixedPoint(this.pointPosition[0][7]),
      new FixedPoint(this.pointPosition[0][8]),
      new FixedPoint(this.pointPosition[0][9], true),
      new FixedPoint(this.pointPosition[0][10]),
      new FixedPoint(this.pointPosition[0][11]),
      new FixedPoint(this.pointPosition[0][12], true),
    ]
    /*
    this.points = [
      new FixedPoint(0, -this.limbSize.neck - this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg)),
      new FixedPoint(0, -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg)),
      new FixedPoint(0, -(this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg)),

      new FixedPoint(this.limbSize.upperArm * Math.sin(45 * deg), -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) + this.limbSize.upperArm * Math.cos(45 * deg)),
      new FixedPoint((this.limbSize.upperArm + this.limbSize.lowerArm) * Math.sin(45 * deg), -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) + (this.limbSize.upperArm + this.limbSize.lowerArm) * Math.cos(45 * deg)),
      new FixedPoint(-this.limbSize.upperArm * Math.sin(45 * deg), -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) + this.limbSize.upperArm * Math.cos(45 * deg)),
      new FixedPoint(-(this.limbSize.upperArm + this.limbSize.lowerArm) * Math.sin(45 * deg), -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * Math.cos(15 * deg) + (this.limbSize.upperArm + this.limbSize.lowerArm) * Math.cos(45 * deg)),

      new FixedPoint(this.limbSize.thigh * Math.sin(15 * deg), -this.limbSize.calf * Math.cos(15 * deg)),
      new FixedPoint((this.limbSize.thigh + this.limbSize.calf) * Math.sin(15 * deg), 0),
      new FixedPoint((this.limbSize.thigh + this.limbSize.calf) * Math.sin(15 * deg) + this.limbSize.foot, 0, true),

      new FixedPoint(-this.limbSize.thigh * Math.sin(15 * deg), -this.limbSize.calf * Math.cos(15 * deg)),
      new FixedPoint(-(this.limbSize.thigh + this.limbSize.calf) * Math.sin(15 * deg), 0),
      new FixedPoint(-(this.limbSize.thigh + this.limbSize.calf) * Math.sin(15 * deg) - this.limbSize.foot, 0, true),

      // new FixedPoint(0, -this.limbSize.thigh - this.limbSize.body - this.limbSize.neck),
      // new FixedPoint(0, -this.limbSize.thigh - this.limbSize.body),
      // new FixedPoint(0, -this.limbSize.thigh),

      // new FixedPoint(this.limbSize.upperArm * Math.sin(45 * deg), -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * Math.cos(45 * deg)),
      // new FixedPoint(this.limbSize.upperArm * Math.sin(45 * deg) - this.limbSize.lowerArm * Math.sin(45 * deg), -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * Math.cos(45 * deg) + this.limbSize.lowerArm * Math.cos(45 * deg)),
      // new FixedPoint(-this.limbSize.upperArm * Math.sin(80 * deg), -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * Math.cos(80 * deg)),
      // new FixedPoint(-this.limbSize.upperArm * Math.sin(80 * deg), -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * Math.cos(80 * deg) + this.limbSize.lowerArm),

      // new FixedPoint(0, 0),
      // new FixedPoint(this.limbSize.calf, 0),
      // new FixedPoint(this.limbSize.calf, -this.limbSize.foot),

      // new FixedPoint(-this.limbSize.thigh, -this.limbSize.thigh),
      // new FixedPoint(-this.limbSize.thigh, -this.limbSize.thigh + this.limbSize.calf),
      // new FixedPoint(-this.limbSize.thigh - this.limbSize.foot, -this.limbSize.thigh + this.limbSize.calf)

    ];
    */
    this.head = new Head(this.points[0], -90 * deg);
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
    this.head?.draw(this.context, this.limbSize.headRadius, this.option.bodyColor);
    this.limbs.forEach((item) => item.draw(this.context, this.limbSize.limbWidth, this.option.bodyColor));
    this.points.forEach((item, index) => item.draw(this.context, this.limbSize.jointRadius, this.option.fixedPointColor, index));
    this.context.restore();
  }
}
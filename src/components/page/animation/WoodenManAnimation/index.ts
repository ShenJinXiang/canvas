import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

const sinAngle = (angle: number) => Math.sin(angle * Math.PI / 180);
const cosAngle = (angle: number) => Math.cos(angle * Math.PI / 180);
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
  x: number = 0;
  y: number = 0;
  hide: boolean;
  constructor(hide: boolean = false) {
    this.hide = hide;
  }
  draw(context: CanvasRenderingContext2D | null, radius: number, style: string, index: number) {
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
    context.translate(this.fixedPoint.x, this.fixedPoint.y);
    context.fillStyle = style;
    context.arc(0.5 * radius * cosAngle(this.rotate), 0.5 * radius * sinAngle(this.rotate), radius, 0, 2 * Math.PI, false);
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
  currentRate: number = 0;
  refreshRate: number = 110;
  currentPositionIndex: number = 0;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    this.currentRate = 0;
    this.currentPositionIndex = 0;
    this.baseSize = Math.min(this.width, this.height) * 0.02;
    this.limbSize = {
      headRadius: 4,
      neck: 3,
      upperArm: 8,
      lowerArm: 7,
      body: 12,
      thigh: 8,
      calf: 8,
      foot: 2,
      limbWidth: 1.6,
      jointRadius: 0.4,
    };
    this.pointPosition = [
      [
        { x: 0, y: -this.limbSize.neck - this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * cosAngle(15) },
        { x: 0, y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * cosAngle(15) },
        { x: 0, y: -(this.limbSize.thigh + this.limbSize.calf) * cosAngle(15) },
        { x: this.limbSize.upperArm * sinAngle(45), y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * cosAngle(15) + this.limbSize.upperArm * cosAngle(45) },
        { x: (this.limbSize.upperArm + this.limbSize.lowerArm) * sinAngle(45), y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * cosAngle(15) + (this.limbSize.upperArm + this.limbSize.lowerArm) * cosAngle(45) },
        { x: -this.limbSize.upperArm * sinAngle(45), y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * cosAngle(15) + this.limbSize.upperArm * cosAngle(45) },
        { x: -(this.limbSize.upperArm + this.limbSize.lowerArm) * sinAngle(45), y: -this.limbSize.body - (this.limbSize.thigh + this.limbSize.calf) * cosAngle(15) + (this.limbSize.upperArm + this.limbSize.lowerArm) * cosAngle(45) },
        { x: this.limbSize.thigh * sinAngle(15), y: -this.limbSize.calf * cosAngle(15) },
        { x: (this.limbSize.thigh + this.limbSize.calf) * sinAngle(15), y: 0 },
        { x: (this.limbSize.thigh + this.limbSize.calf) * sinAngle(15) + this.limbSize.foot, y: 0 },
        { x: -this.limbSize.thigh * sinAngle(15), y: -this.limbSize.calf * cosAngle(15) },
        { x: -(this.limbSize.thigh + this.limbSize.calf) * sinAngle(15), y: 0 },
        { x: -(this.limbSize.thigh + this.limbSize.calf) * sinAngle(15) - this.limbSize.foot, y: 0 }
      ],
      [
        { x: 0, y: - this.limbSize.calf - this.limbSize.body - this.limbSize.neck },
        { x: 0, y: - this.limbSize.calf - this.limbSize.body },
        { x: 0, y: - this.limbSize.calf },
        { x: this.limbSize.upperArm, y: - this.limbSize.calf - this.limbSize.body },
        { x: this.limbSize.upperArm - this.limbSize.lowerArm * sinAngle(50), y: - this.limbSize.calf - this.limbSize.body + this.limbSize.lowerArm * cosAngle(50) },
        { x: -this.limbSize.upperArm, y: - this.limbSize.calf - this.limbSize.body },
        { x: -this.limbSize.upperArm + this.limbSize.lowerArm * sinAngle(50), y: - this.limbSize.calf - this.limbSize.body + this.limbSize.lowerArm * cosAngle(50) },
        { x: this.limbSize.thigh, y: - this.limbSize.calf },
        { x: this.limbSize.thigh, y: 0 },
        { x: this.limbSize.thigh + this.limbSize.foot, y: 0 },
        { x: -this.limbSize.thigh, y: - this.limbSize.calf },
        { x: -this.limbSize.thigh, y: 0 },
        { x: -this.limbSize.thigh - this.limbSize.foot, y: 0 },
      ],
      [
        { x: 0, y: -this.limbSize.thigh - this.limbSize.body - this.limbSize.neck },
        { x: 0, y: -this.limbSize.thigh - this.limbSize.body },
        { x: 0, y: -this.limbSize.thigh },
        { x: this.limbSize.upperArm * sinAngle(45), y: -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * cosAngle(45) },
        { x: this.limbSize.upperArm * sinAngle(45) - this.limbSize.lowerArm * sinAngle(45), y: -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * cosAngle(45) + this.limbSize.lowerArm * cosAngle(45) },
        { x: -this.limbSize.upperArm * sinAngle(80), y: -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * cosAngle(80) },
        { x: -this.limbSize.upperArm * sinAngle(80), y: -this.limbSize.thigh - this.limbSize.body + this.limbSize.upperArm * cosAngle(80) + this.limbSize.lowerArm },
        { x: 0, y: 0 },
        { x: this.limbSize.calf, y: 0 },
        { x: this.limbSize.calf, y: -this.limbSize.foot },
        { x: -this.limbSize.thigh, y: -this.limbSize.thigh },
        { x: -this.limbSize.thigh, y: -this.limbSize.thigh + this.limbSize.calf },
        { x: -this.limbSize.thigh - this.limbSize.foot, y: -this.limbSize.thigh + this.limbSize.calf }
      ],
      [
        { x: 0, y: -this.limbSize.calf - this.limbSize.body - this.limbSize.neck },
        { x: 0, y: -this.limbSize.calf - this.limbSize.body },
        { x: 0, y: -this.limbSize.calf },
        { x: this.limbSize.upperArm, y: -this.limbSize.calf - this.limbSize.body },
        { x: this.limbSize.upperArm + this.limbSize.lowerArm, y: -this.limbSize.calf - this.limbSize.body },
        { x: -this.limbSize.upperArm, y: -this.limbSize.calf - this.limbSize.body },
        { x: -this.limbSize.upperArm - this.limbSize.lowerArm, y: -this.limbSize.calf - this.limbSize.body },
        { x: this.limbSize.thigh, y: -this.limbSize.calf },
        { x: this.limbSize.thigh, y: 0 },
        { x: this.limbSize.thigh + this.limbSize.foot, y: 0 },
        { x: -this.limbSize.thigh * sinAngle(75), y: -this.limbSize.calf + this.limbSize.thigh * cosAngle(75) },
        { x: -this.limbSize.thigh * sinAngle(75) - this.limbSize.calf * sinAngle(45), y: -this.limbSize.calf + this.limbSize.thigh * cosAngle(75) + this.limbSize.calf * cosAngle(45) },
        { x: -this.limbSize.thigh * sinAngle(75) - this.limbSize.calf * sinAngle(45) - this.limbSize.foot * sinAngle(45), y: -this.limbSize.calf + this.limbSize.thigh * cosAngle(75) + this.limbSize.calf * cosAngle(45) - this.limbSize.foot * cosAngle(45) }
      ],
      [
        { x: 0, y: - this.limbSize.calf - this.limbSize.thigh - this.limbSize.body - this.limbSize.neck },
        { x: 0, y: - this.limbSize.calf - this.limbSize.thigh - this.limbSize.body },
        { x: 0, y: - this.limbSize.calf - this.limbSize.thigh },
        { x: this.limbSize.upperArm * sinAngle(80), y: - this.limbSize.calf - this.limbSize.thigh - this.limbSize.body - this.limbSize.upperArm * cosAngle(80) },
        { x: this.limbSize.upperArm * sinAngle(80) + this.limbSize.lowerArm, y: - this.limbSize.calf - this.limbSize.thigh - this.limbSize.body - this.limbSize.upperArm * cosAngle(80) },
        { x: -this.limbSize.upperArm * sinAngle(75), y: - this.limbSize.calf - this.limbSize.thigh - this.limbSize.body - this.limbSize.upperArm * cosAngle(75) },
        { x: -this.limbSize.upperArm * sinAngle(75) - this.limbSize.lowerArm * sinAngle(45), y: - this.limbSize.calf - this.limbSize.thigh - this.limbSize.body - this.limbSize.upperArm * cosAngle(75) - this.limbSize.lowerArm * cosAngle(45) },
        { x: this.limbSize.thigh * sinAngle(60), y: - this.limbSize.calf - this.limbSize.thigh - this.limbSize.thigh * cosAngle(60) },
        { x: this.limbSize.thigh * sinAngle(60) + this.limbSize.calf * sinAngle(35), y: - this.limbSize.calf - this.limbSize.thigh - this.limbSize.thigh * cosAngle(60) - this.limbSize.calf * cosAngle(35) },
        { x: this.limbSize.thigh * sinAngle(60) + this.limbSize.calf * sinAngle(35) - this.limbSize.foot * sinAngle(60), y: - this.limbSize.calf - this.limbSize.thigh - this.limbSize.thigh * cosAngle(60) - this.limbSize.calf * cosAngle(35) - this.limbSize.foot * cosAngle(60) },
        { x: 0, y: - this.limbSize.calf },
        { x: 0, y: 0 },
        { x: -this.limbSize.foot, y: 0 },
      ],
      [
        { x: 0, y: - this.limbSize.calf - this.limbSize.body - this.limbSize.neck },
        { x: 0, y: - this.limbSize.calf - this.limbSize.body },
        { x: 0, y: - this.limbSize.calf },
        { x: this.limbSize.upperArm * sinAngle(45), y: - this.limbSize.calf - this.limbSize.body + this.limbSize.upperArm * cosAngle(45) },
        { x: this.limbSize.upperArm * sinAngle(45) + this.limbSize.lowerArm * sinAngle(35), y: - this.limbSize.calf - this.limbSize.body + this.limbSize.upperArm * cosAngle(45) - this.limbSize.lowerArm * cosAngle(35) },
        { x: - this.limbSize.upperArm * sinAngle(60), y: - this.limbSize.calf - this.limbSize.body + this.limbSize.upperArm * cosAngle(60) },
        { x: - this.limbSize.upperArm * sinAngle(60) + this.limbSize.lowerArm * sinAngle(60), y: - this.limbSize.calf - this.limbSize.body + this.limbSize.upperArm * cosAngle(60) + this.limbSize.lowerArm * cosAngle(60) },
        { x: this.limbSize.thigh, y: - this.limbSize.calf },
        { x: this.limbSize.thigh, y: 0 },
        { x: this.limbSize.thigh + this.limbSize.foot, y: 0 },
        { x: -this.limbSize.thigh, y: - this.limbSize.calf },
        { x: -this.limbSize.thigh, y: 0 },
        { x: -this.limbSize.thigh - this.limbSize.foot, y: 0 },
      ]
    ]
    for (let i = 0; i < 13; i++) {
      this.points.push(new FixedPoint(i === 9 || i === 12));
    }
    this.refreshPointPosition(this.pointPosition[0]);
    this.head = new Head(this.points[0], -90);
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

  private refreshPointPosition(ps: Point[]) {
    this.points.forEach((item, index) => {
      item.x = ps[index].x;
      item.y = ps[index].y;
    });
  }

  update() {
    this.currentRate++;
    if (this.currentRate >= this.refreshRate) {
      this.currentPositionIndex++;
      if (this.currentPositionIndex >= this.pointPosition.length) {
        this.currentPositionIndex = 0;
      }
      this.currentRate = 0;
    }
    const positions = this.pointPosition[this.currentPositionIndex];
    this.points.forEach((item, index) => {
      item.x += (positions[index].x * this.baseSize - item.x) * 0.15;
      item.y += (positions[index].y * this.baseSize - item.y) * 0.15;
    });
    // console.log('currentPositionIndex', this.currentPositionIndex);
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.translate(0.5 * this.width, this.height * 0.8);
    this.head?.draw(this.context, this.limbSize.headRadius * this.baseSize, this.option.bodyColor);
    this.limbs.forEach((item) => item.draw(this.context, this.limbSize.limbWidth * this.baseSize, this.option.bodyColor));
    this.points.forEach((item, index) => item.draw(this.context, this.limbSize.jointRadius * this.baseSize, this.option.fixedPointColor, index));
    this.context.restore();
  }
}
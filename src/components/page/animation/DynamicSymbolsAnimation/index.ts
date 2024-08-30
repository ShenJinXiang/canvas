import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

interface IOption {
  showColor: string;
  xRatio: number; // 横向比例
  yRatio: number; // 纵向比例
}

const OPTION: IOption = {
  showColor: '#fff',
  xRatio: 0.7,
  yRatio: 5
};

function distance(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
class BezierLine {
  private start: Point; 
  private control1: Point; 
  private control2: Point;
  private end: Point;
  private lenArr: number[] = [];
  constructor(start: Point, control1: Point, control2: Point, end: Point) {
    this.start = start;
    this.control1 = control1;
    this.control2 = control2;
    this.end = end;
  }

  public point(t : number): Point {
        const x = Math.pow(1 - t, 3) * this.start.x + 3 * Math.pow(1 - t, 2) * t * this.control1.x + 3 * (1 - t) * Math.pow(t, 2) * this.control2.x + Math.pow(t, 3) * this.end.x;
        const y = Math.pow(1 - t, 3) * this.start.y + 3 * Math.pow(1 - t, 2) * t * this.control1.y + 3 * (1 - t) * Math.pow(t, 2) * this.control2.y + Math.pow(t, 3) * this.end.y;
    return {x, y};
  }

  private initLengthArr(totalStep: number) {
    this.lenArr = [];
    let totalLength = 0;
    this.lenArr.push(totalLength);
    let lastPoint = this.point(0);
    for (let i = 1; i <= totalStep; i++) {
        const t = i / totalStep;
        const currentPoint = this.point(t);
        totalLength += distance(currentPoint, lastPoint);
        this.lenArr.push(totalLength);
        lastPoint = currentPoint;
    }
    return totalLength;
  }

  public particles(stepLength: number, totalStep: number): Point[] {
    this.initLengthArr(totalStep);
    const length = this.lenArr[this.lenArr.length - 1];

    let points: Point[] = [this.point(0)];
    let currentLength: number = 0;
    let lastPoint: Point = points[0];
    do {
      let currentStep: number = 1;
      while(currentLength + stepLength > this.lenArr[currentStep]) {
        currentStep++;
      }
      const t = currentStep / totalStep;
      const nextPoint: Point = this.point(t);
      points.push(nextPoint);
      currentLength += distance(nextPoint, lastPoint);
      lastPoint = nextPoint;
    } while(currentLength < length);
    return points;
  }

  public path(path: Path2D) {
    path.bezierCurveTo(this.control1.x, this.control1.y, this.control2.x, this.control2.y, this.end.x, this.end.y);
  }


}
class Line {
  start: Point;
  end: Point;
  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }
  public particles(stepLength: number): Point[] {
    const arr: Point[]  = [];
    const lineLength = distance(this.start, this.end);
    let lineAngle = Math.atan((this.end.y - this.start.y) / (this.end.x - this.start.x));
    if (this.end.x < this.start.x) {
      lineAngle = Math.PI + lineAngle;
    }
    for (let len = 0; len <= lineLength; len += stepLength) {
      arr.push({
        x: this.start.x + len * Math.cos(lineAngle),
        y: this.start.y + len * Math.sin(lineAngle)
      });
    }
    return arr;
  }
}
export default class DynamicSymbolsAnimation extends Animate {

  private lineWidth: number = 1;
  private step: number = 1;
  private bezierLines: BezierLine[] = [];
  private lines: Line[] = [];
  private particles: Point[] = [];
  private currentIndex: number = 0;
  private nodeLength: number = 0;

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    const endpointx = this.width * 0.07;
    const endpointy = endpointx * OPTION.xRatio;
    const contropointx = endpointx * OPTION.yRatio;
    const contropointy = endpointy * OPTION.yRatio;
    this.lineWidth = this.width * 0.005;
    this.lineWidth = this.lineWidth < 2 ? this.lineWidth = 2 : this.lineWidth;
    const startPoint1 = {x: endpointx, y: endpointy};
    const endPoint1 = {x: endpointx, y: -endpointy};
    const startPoint2 = {x: -endpointx, y: endpointy};
    const endPoint2 = {x: -endpointx, y: -endpointy};
    const controPoint11 = {x: contropointx, y: contropointy};
    const controPoint12 = {x: contropointx, y: -contropointy};
    const controPoint21 = {x: -contropointx, y: contropointy};
    const controPoint22 = {x: -contropointx, y: -contropointy};
    this.lines = [
      new Line(endPoint2, startPoint1),
      new Line(endPoint1, startPoint2)
      // new Line(startPoint1, endPoint2),
      // new Line(endPoint1, startPoint2)
    ];
    this.bezierLines = [
      new BezierLine(startPoint1, controPoint11, controPoint12, endPoint1),
      new BezierLine(startPoint2, controPoint21, controPoint22, endPoint2),
    ];
    this.initParticles();
    this.currentIndex = 250;
    this.nodeLength = Math.floor(this.particles.length / 2);
  }

  update(): void {
    this.currentIndex += 8;
    if (this.currentIndex >= this.particles.length) {
      this.currentIndex = this.currentIndex % this.particles.length;
    }
  }

  draw() {
    if (!this.context) {
      return;
    }

    this.context.save();
    this.drawBackground();
    // this.drawBaseline();
    // this.drawParticles();
    this.context.translate(this.width / 2, this.height / 2);
    this.particles.forEach((item, index) => {
      const endIndex = this.currentIndex + this.nodeLength;
      const length = this.particles.length;
      if (index >= this.currentIndex && index < endIndex) {
        this.drawParticle(item);
      } 
      if (endIndex > length && index < (endIndex % length)) {
        this.drawParticle(item);
      }
    });
    this.context.restore();
  }

  drawParticle(p: Point) {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = OPTION.showColor;
    this.context.arc(p.x, p.y, this.step, 0, 2 * Math.PI, false);
    this.context.fill();
    this.context.restore();
  }

  drawBaseline() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.translate(this.width / 2, this.height / 2);
    this.context.strokeStyle = OPTION.showColor;
    this.context.lineWidth = this.lineWidth;
    const path = new Path2D();
    path.moveTo(this.lines[0].end.x, this.lines[0].end.y);
    this.bezierLines[0].path(path);
    path.lineTo(this.lines[1].start.x, this.lines[1].start.y);
    this.bezierLines[1].path(path);
    path.closePath();
    this.context.stroke(path);
    this.context.restore();
  }

  drawParticles() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.translate(this.width / 2, this.height / 2);
    this.particles.forEach(element => {
      if (!this.context) {
        return;
      }
      this.context.beginPath();
      this.context.strokeStyle = OPTION.showColor;
      this.context.arc(element.x, element.y, 10, 0, 2 * Math.PI, false);
      this.context.stroke();
      
    });
    this.context.restore();
  }

  private initParticles() {
    this.particles = [];
    this.step = this.lineWidth / 2;
    this.particles.push(...this.lines[0].particles(this.step));
    this.particles.push(...this.bezierLines[0].particles(this.step, this.width * 2));
    this.particles.push(...this.lines[1].particles(this.step));
    this.particles.push(...this.bezierLines[1].particles(this.step, this.width * 2));
    console.log(this.particles);
  }


  private drawBackground() {
    if (!this.context) {
      return;
    }
    const grad = this.context.createLinearGradient(0, this.height, this.width, 0);
    grad.addColorStop(0, '#d16ba5');
    grad.addColorStop(1 / 11, '#c777b9');
    grad.addColorStop(2 / 11, '#ba83ca');
    grad.addColorStop(3 / 11, '#aa8fd8');
    grad.addColorStop(4 / 11, '#9a9ae1');
    grad.addColorStop(5 / 11, '#8aa7ec');
    grad.addColorStop(6 / 11, '#79b3f4');
    grad.addColorStop(7 / 11, '#69bff8');
    grad.addColorStop(8 / 11, '#52cffe');
    grad.addColorStop(9 / 11, '#41dfff');
    grad.addColorStop(10 / 11, '#46eefa');
    grad.addColorStop(1, '#5ffbf1');
    this.context.fillStyle = grad;
    this.context.fillRect(0, 0, this.width, this.height);
  }


  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
  
}
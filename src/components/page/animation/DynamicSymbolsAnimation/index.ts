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
export default class DynamicSymbolsAnimation extends Animate {

  private endpointx: number = 0;
  private endpointy: number = 0;
  private contropointx: number = 0;
  private contropointy: number = 0;
  private lineWidth: number = 1;
  private startPoint: Point = {x: 0, y: 0};
  private endPoint: Point = {x: 0, y: 0};
  private controPoint1: Point = {x: 0, y: 0};
  private controPoint2: Point = {x: 0, y: 0};
  private particles: Point[] = [];

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.endpointx = this.width * 0.07;
    this.endpointy = this.endpointx * OPTION.xRatio;
    this.contropointx = this.endpointx * OPTION.yRatio;
    this.contropointy = this.endpointy * OPTION.yRatio;
    this.lineWidth = this.width * 0.005;
    this.lineWidth = this.lineWidth < 2 ? this.lineWidth = 2 : this.lineWidth;
    this.startPoint = {x: this.endpointx, y: this.endpointy};
    this.endPoint = {x: this.endpointx, y: -this.endpointy};
    this.controPoint1 = {x: this.contropointx, y: this.contropointy};
    this.controPoint2 = {x: this.contropointx, y: -this.contropointy};
    this.initParticles();
  }

  draw() {
    if (!this.context) {
      return;
    }

    this.context.save();
    this.drawBackground();
    this.drawBaseline();
    this.drawParticles();
    this.context.restore();
  }

  drawBaseline() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.translate(this.width / 2, this.height / 2);
    for (let i = 0; i < 2; i++) {
      this.context.save();
      if (i === 1) {
        this.context.rotate(Math.PI);
      }
      this.context.beginPath();
      this.context.strokeStyle = OPTION.showColor;
      this.context.lineWidth = this.lineWidth;
      this.context.moveTo(0, 0);
      this.context.lineTo(this.startPoint.x, this.startPoint.y);
      this.context.bezierCurveTo(this.controPoint1.x, this.controPoint1.y, this.controPoint2.x, this.controPoint2.y, this.endPoint.x, this.endPoint.y);
      this.context.lineTo(0, 0);
      this.context.stroke();
      this.context.restore();
    }
    this.context.beginPath();
    this.context.strokeStyle = '#000';
    this.context.moveTo(this.startPoint.x, this.startPoint.y);
    this.context.lineTo(this.endPoint.x, this.endPoint.y);
    this.context.stroke();
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
    const step = this.lineWidth / 2;
    const lineLength = this.distance(0, 0, this.startPoint.x, this.startPoint.y);
    const lineAngle = Math.atan(this.startPoint.y / this.startPoint.x);
    for (let len = 0; len <= lineLength; len += step) {
      this.particles.push({
        x: len * Math.cos(lineAngle),
        y: len * Math.sin(lineAngle)
      });
    }
    const arr = [];
    for (let i = 0; i < 100; i++) {
      const p = this.bezierPoint(this.startPoint, this.controPoint1, this.controPoint2, this.endPoint, i * 0.5 / 100);
      this.particles.push(p);
      arr.push(p);
    }
    for (let i = 1; i < arr.length; i++) {
      console.log('i', this.distance(arr[i].x, arr[i].y, arr[i - 1].x, arr[i - 1].y));
    }
    // let t = 0;
    // let num = 0;
    // while(t <= 0.5) {
      // num += 1;
      // console.log('t', t, 'num', num);
      // if (num >= 34) {
      //   debugger;
      // }
      // t = this.bezierTByLen(this.startPoint, step, t, t + 0.05, 0);
      // this.particles.push(this.bezierPoint(this.startPoint, this.controPoint1, this.controPoint2, this.endPoint, t));
    // }
  }

  private distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
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

  // private bezierTByLen(basePoint: Point, len: number, minT: number, maxT: number, num: number): number {
  //   num += 1;
  //   const t = (maxT + minT) / 2;
  //   console.log('num：', num, 'minT:', minT, 'maxT:', maxT, 't:', t);
  //   // 0.003170424221263341 
  //   if (t - minT < Math.pow(10, -16)) {
  //     return t;
  //   }
  //   const p = this.bezierPoint(this.startPoint, this.controPoint1, this.controPoint2, this.endPoint, t);
  //   const d = this.distance(basePoint.x, basePoint.y, p.x, p.y);
  //   const minLen = Math.max(len * 0.1, 1);
  //   if (Math.abs(d - len) <= minLen || num > 80) {
  //     return t;
  //   }
  //   if (d > len) {
  //     return this.bezierTByLen(basePoint, len, minT, t, num);
  //   } else {
  //     return this.bezierTByLen(basePoint, len, t, maxT, num);
  //   }
  // }

  // private bezierTByLen(basePoint: Point, baset: number, len: number, dt: number, ddt: number): number {
  //   const t = baset + dt;
  //   const p = this.bezierPoint(this.startPoint, this.controPoint1, this.controPoint2, this.endPoint, t);
  //   const d = this.distance(basePoint.x, basePoint.y, p.x, p.y);
  //   const minLen = len * 0.1;
  //   if (Math.abs(d - len) <= minLen) {
  //     return t;
  //   }
  //   if (Math.abs(d - len) > len) {
  //     ddt = ddt
  //   } else {
  //     ddt = ddt * 0.8;
  //   }
  //   if (d > len) {
  //     dt = dt - ddt;
  //   } else {
  //     dt = dt + ddt;
  //   }
  //   return this.bezierTByLen(basePoint, baset, len, dt, ddt);
  // }

  private bezierPoint( startPoint: Point, controPoint1: Point, controPoint2: Point, endPoint: Point, t : number): Point {
        const x = Math.pow(1 - t, 3) * startPoint.x + 3 * Math.pow(1 - t, 2) * t * controPoint1.x + 3 * (1 - t) * Math.pow(t, 2) * controPoint2.x + Math.pow(t, 3) * endPoint.x;
        const y = Math.pow(1 - t, 3) * startPoint.y + 3 * Math.pow(1 - t, 2) * t * controPoint1.y + 3 * (1 - t) * Math.pow(t, 2) * controPoint2.y + Math.pow(t, 3) * endPoint.y;
    return {x, y};
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
  
}
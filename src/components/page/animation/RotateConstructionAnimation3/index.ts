import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

enum ElementPostionType {
  M, L, R
}
enum TaskStatus {
  PREPARE, DOING, COMPLETE
}

class Element {
  roundRadius: number;
  rotate: number = 0;
  lineWidth: number = 1;
  lineColor: string;
  pointColor: string;
  pointRadius: number;
  start: Point = { x: 0, y: 0 };
  end: Point = { x: 0, y: 0 };
  leftPoint: Point = { x: 0, y: 0 };
  rightPoint: Point = { x: 0, y: 0 };
  middelPoint: Point = { x: 0, y: 0 };
  positionPoint: Point;
  positionType: ElementPostionType;
  constructor(roundRadius: number, lineWidth: number, lineColor: string, pointColor: string, positionType: ElementPostionType = ElementPostionType.M, position: Point = { x: 0, y: 0 }) {
    this.roundRadius = roundRadius;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.pointColor = pointColor;
    this.pointRadius = this.lineWidth * 0.35;
    this.positionPoint = { x: position.x, y: position.y };
    this.positionType = positionType;
    this.refreshByPositionType();
  }

  private refreshByPositionType() {
    switch (this.positionType) {
      case ElementPostionType.L:
        this.start = { x: -this.lineWidth, y: 0 };
        this.leftPoint = { x: 0, y: 0 };
        this.middelPoint = { x: this.roundRadius, y: 0 };
        this.rightPoint = { x: 2 * this.roundRadius, y: 0 };
        this.end = { x: 2 * this.roundRadius + this.lineWidth, y: 0 };
        break;
      case ElementPostionType.M:
        this.start = { x: -this.roundRadius - this.lineWidth, y: 0 };
        this.leftPoint = { x: -this.roundRadius, y: 0 };
        this.middelPoint = { x: 0, y: 0 };
        this.rightPoint = { x: this.roundRadius, y: 0 };
        this.end = { x: this.roundRadius + this.lineWidth, y: 0 };
        break;
      case ElementPostionType.R:
        this.start = { x: -2 * this.roundRadius - this.lineWidth, y: 0 };
        this.leftPoint = { x: -2 * this.roundRadius, y: 0 };
        this.middelPoint = { x: -this.roundRadius, y: 0 };
        this.rightPoint = { x: 0, y: 0 };
        this.end = { x: this.lineWidth, y: 0 };
        break;
    }

  }

  position(positionType: ElementPostionType, x: number, y: number) {
    this.positionType = positionType;
    this.positionPoint.x = x;
    this.positionPoint.y = y;
    this.refreshByPositionType();
  }

  setRotate(rotate: number) {
    this.rotate = rotate;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.positionPoint.x, this.positionPoint.y);
    context.rotate(this.rotate);
    context.lineCap = 'round';
    context.beginPath();
    context.strokeStyle = this.lineColor;
    context.lineWidth = this.lineWidth;
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(this.end.x, this.end.y);
    context.stroke();
    this.drawPoint(context, this.middelPoint);
    this.drawPoint(context, this.leftPoint);
    this.drawPoint(context, this.rightPoint);
    context.restore();
  }

  drawPoint(context: CanvasRenderingContext2D, p: Point) {
    context.beginPath();
    context.fillStyle = this.pointColor;
    context.arc(p.x, p.y, this.pointRadius, 0, 2 * Math.PI, false);
    context.fill();
  }
}

class ElementTask {
  private element: Element;
  private position: Point;
  private positionType: ElementPostionType;
  private startAngle: number;
  private endAngle: number;
  private angleStep: number;
  private duration: number;
  private taskStatus: TaskStatus = TaskStatus.PREPARE;
  private current: number = 0;
  private currentAngle: number = 0;
  private counterclockwise: boolean;
  constructor(element: Element, position: Point, positionType: ElementPostionType, startAngle: number, endAngle: number, duration: number, counterclockwise: boolean = false) {
    this.element = element;
    this.position = position;
    this.positionType = positionType;
    const rPi = 2 * Math.PI;
    startAngle = startAngle % rPi;
    endAngle = endAngle % rPi;
    startAngle = startAngle < 0 ? startAngle + rPi : startAngle;
    endAngle = endAngle < 0 ? endAngle + rPi : endAngle;
    if (!counterclockwise) {
      startAngle = startAngle > endAngle ? startAngle - rPi : startAngle;
    } else {
      endAngle = endAngle > startAngle ? endAngle - rPi : endAngle;
    }
    this.duration = duration;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.angleStep = (this.endAngle - this.startAngle) / this.duration;
    this.counterclockwise = counterclockwise;
    this.reset();
  }
  update() {
    if (this.taskStatus === TaskStatus.DOING) {
      this.current++;
      this.currentAngle = this.startAngle + this.angleStep * this.current;
      this.element.setRotate(this.currentAngle);
      if (this.current >= this.duration) {
        this.taskStatus = TaskStatus.COMPLETE;
        this.current = this.duration;
        this.currentAngle = this.endAngle;
      }
    }
  }
  start() {
    this.taskStatus = TaskStatus.DOING;
    this.current = 0;
    this.currentAngle = this.startAngle;
  }
  reset() {
    this.taskStatus = TaskStatus.PREPARE;
    this.element.position(this.positionType, this.position.x, this.position.y);
    this.current = 0;
    this.currentAngle = this.startAngle;
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    switch (this.taskStatus) {
      case TaskStatus.PREPARE:
        break;
      case TaskStatus.DOING:
        break;
      case TaskStatus.COMPLETE:
        break;
    }
    this.element.draw(context);
  }
}

export default class RotateConstructionAnimation extends Animate {
  tasks: ElementTask[] = [];
  element: Element | null = null;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    const PI = Math.PI;
    const element = new Element(100, 12, '#ccc', '#666');
    this.tasks = [
      new ElementTask(element, { x: 400, y: 200 }, ElementPostionType.L, -PI / 6, Math.PI * 0.5, 200, false)
    ]
    this.tasks[0].start();

  }

  update() {
    this.tasks.forEach((item) => item.update());
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.tasks.forEach((item) => item.draw(this.context));
    // this.context.beginPath();
    // this.context.moveTo(500, 400);
    // this.context.lineTo(700, 400);
    // this.context.stroke();
    // this.context.beginPath();
    // this.context.moveTo(600, 300);
    // this.context.lineTo(600, 500);
    // this.context.stroke();
    this.context.restore();
  }

  public setRect(width: number, height: number): this {
    this.width = width;
    this.height = height;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    this.initData();
    return this;
  }

}
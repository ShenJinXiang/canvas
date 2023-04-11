import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

enum ElementPostionType {
  M, L, R
}

class Element {
  roundRadius: number;
  rotate: number = 0;
  lineWidth: number = 1;
  lineColor: string;
  pointColor: string;
  pointRadius: number;
  leftPoint: Point;
  rightPoint: Point;
  middelPoint: Point;
  positionPoint: Point;
  positionType: ElementPostionType;
  constructor(roundRadius: number, lineWidth: number, lineColor: string, pointColor: string) {
    this.roundRadius = roundRadius;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.pointColor = pointColor;
    this.pointRadius = this.lineWidth * 0.35;
    this.leftPoint = { x: -this.roundRadius, y: 0 };
    this.middelPoint = { x: 0, y: 0 };
    this.rightPoint = { x: this.roundRadius, y: 0 };
    this.positionPoint = { x: 0, y: 0 };
    this.positionType = ElementPostionType.M;
  }

  position(positionType: ElementPostionType, x: number, y: number) {
    this.positionType = positionType;
    this.positionPoint.x = x;
    this.positionPoint.y = y;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.positionPoint.x, this.positionPoint.y);
    switch (this.positionType) {
      case ElementPostionType.L:
        context.translate(-this.leftPoint.x, -this.leftPoint.y);
        break;
      case ElementPostionType.R:
        context.translate(-this.rightPoint.x, -this.rightPoint.y);
        break;
      default:
        context.translate(0, 0);
    }
    context.lineCap = 'round';
    context.beginPath();
    context.strokeStyle = this.lineColor;
    context.lineWidth = this.lineWidth;
    context.moveTo(-this.roundRadius - this.lineWidth, 0);
    context.lineTo(this.roundRadius + this.lineWidth, 0);
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

class LineAnimation {
  constructor(element: Element, duration: number) { }
}

export default class RotateConstructionAnimation extends Animate {
  element: Element | null = null;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.element = new Element(200, 12, '#ccc', '#666');
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.element?.position(ElementPostionType.M, 400, 200);
    this.element?.draw(this.context);
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
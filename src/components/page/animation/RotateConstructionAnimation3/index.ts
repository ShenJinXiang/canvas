import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

class LineDrawer {
  lineLength: number;
  rotate: number = 0;
  lineWidth: number = 1;
  lineColor: string;
  pointColor: string;
  pointRadius: number;
  sPoint: Point;
  ePoint: Point;
  mPoint: Point;
  constructor(lineLength: number, lineWidth: number, lineColor: string, pointColor: string) {
    this.lineLength = lineLength;
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    this.pointColor = pointColor;
    this.pointRadius = this.lineWidth * 0.35;
    this.sPoint = { x: 0, y: 0 };
    this.ePoint = { x: this.lineLength, y: 0 };
    this.mPoint = { x: 0.5 * this.lineLength, y: 0 };
  }

  position(x: number, y: number) {
    this.sPoint.x = x;
    this.sPoint.y = y;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.sPoint.x, this.sPoint.y);
    context.lineCap = 'round';
    context.beginPath();
    context.strokeStyle = this.lineColor;
    context.lineWidth = this.lineWidth;
    context.moveTo(0, 0);
    context.lineTo(this.ePoint.x, this.ePoint.y);
    context.stroke();
    this.drawPoint(context, { x: 0, y: 0 });
    this.drawPoint(context, this.ePoint);
    this.drawPoint(context, this.mPoint);
    context.restore();
  }

  drawPoint(context: CanvasRenderingContext2D, p: Point) {
    context.beginPath();
    context.fillStyle = this.pointColor;
    context.arc(p.x, p.y, this.pointRadius, 0, 2 * Math.PI, false);
    context.fill();
  }
}

export default class RotateConstructionAnimation extends Animate {
  lineDrawer: LineDrawer | null = null;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.lineDrawer = new LineDrawer(400, 12, '#ccc', '#666');
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.lineDrawer?.position(100, 200);
    this.lineDrawer?.draw(this.context);
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
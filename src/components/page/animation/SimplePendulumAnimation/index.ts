import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

interface IOption {
  backgroundColor: string;
  lineColor: string;
}
class Element {
  ox: number;
  oy: number;
  lineLength: number;
  bottomRadius: number;
  bottomAngleStep: number;
  currentButtomAngle: number;
  ballX: number = 0;
  ballY: number = 0;
  ballColor: string;
  constructor(ox: number, oy: number, lineLength: number, bottomRadius: number, ballColor: string) {
    this.ox = ox;
    this.oy = oy;
    this.lineLength = lineLength;
    this.ballColor = ballColor;
    this.bottomRadius = bottomRadius;
    // this.bottomRadius = this.lineLength * Math.sin(maxAngle);
    this.bottomAngleStep = 6 * 2 * Math.PI / this.lineLength;
    this.currentButtomAngle = 0;
  }
  update() {
    this.currentButtomAngle += this.bottomAngleStep;
    this.ballX = this.bottomRadius * Math.cos(this.currentButtomAngle);
    const a = Math.asin(Math.abs(this.ballX) / this.lineLength);
    this.ballY = this.lineLength * Math.cos(a);
  }
  draw(context: CanvasRenderingContext2D | null, lineColor: string, ballRadius: number) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.ox, this.oy);

    context.beginPath();
    context.strokeStyle = lineColor;
    context.moveTo(0, 0);
    context.lineTo(this.ballX, this.ballY);
    context.stroke();

    context.beginPath();
    context.fillStyle = this.ballColor;
    context.arc(this.ballX, this.ballY, ballRadius, 0, 2 * Math.PI, false);
    context.fill();

    context.restore();
  }
}
export default class SimplePendulumAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#000',
    lineColor: 'rgba(255, 255, 255, 0.5)'
  }
  private elementNumber: number = 24;
  private elements: Element[] = [];
  private origin: Point;
  private ballRadius: number = 0;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.origin = { x: 0.5 * this.width, y: 10 };
    this.initData();
  }

  private initData() {
    this.ballRadius = this.height * 0.015;
    const colorStep = 360 / this.elementNumber;
    for (let i: number = 0; i < this.elementNumber; i++) {
      this.elements.push(new Element(
        this.origin.x,
        this.origin.y,
        this.height - 20 - (i * this.ballRadius),
        this.height * 0.2 - (i * this.ballRadius * 0.1),
        `hsla(${i * colorStep}, 80%, 60%, 1)`,
      ));
    }
  }

  update() {
    this.elements.forEach((item) => item.update());
  }


  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.elements.forEach((item) => item.draw(this.context, this.option.lineColor, this.ballRadius));
    this.context.restore();
  }
}
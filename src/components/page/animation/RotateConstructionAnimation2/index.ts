import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string
};

class Element {
  baseAngle: number;
  lineColor: string;
  current: number;
  angleStep: number;
  ballColor: string;
  constructor(baseAngle: number, lineColor: string, beginAngle: number, angleStep: number, ballColor: string) {
    this.baseAngle = baseAngle;
    this.lineColor = lineColor;
    this.current = beginAngle;
    this.angleStep = angleStep;
    this.ballColor = ballColor;
  }
  update() {
    this.current += this.angleStep;
  }
  draw(context: CanvasRenderingContext2D | null, baseRadius: number, ballRadius: number) {
    if (!context) {
      return;
    }
    context.save();
    context.rotate(this.baseAngle);

    context.beginPath();
    context.strokeStyle = this.lineColor;
    context.moveTo(-baseRadius, 0);
    context.lineTo(baseRadius, 0);
    context.stroke();

    context.beginPath();
    context.fillStyle = this.ballColor;
    context.arc(baseRadius * Math.cos(this.current), 0, ballRadius, 0, 2 * Math.PI, false);
    context.fill();

    context.restore();
  }
}

export default class RotateConstructionAnimation extends Animate {
  elementNumber: number;
  radius: number = 0;
  ballRadius: number = 0;
  private option: IOption = {
    backgroundColor: '#000'
  };
  constructor(width: number, height: number, elementNumber: number) {
    super();
    this.initRect(width, height);
    this.elementNumber = elementNumber;
    this.initData();
  }

  private initData() {
    const base = Math.min(this.width, this.height);
    this.radius = 0.45 * base;
    this.ballRadius = 0.01 * base;
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.fillStyle = '#084';
    this.context.fillRect(400, 100, 320, 200);
    this.context.restore();
  }
}
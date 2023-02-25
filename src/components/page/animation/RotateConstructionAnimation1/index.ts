import Animate from "@/lib/Animate";
interface IOption {
  backgroundColor: string;
  lineColor: string;
  angleStep: number;
};

class Element {
  ox: number;
  oy: number;
  lineColor: string;
  angle: number;
  angleStep: number;
  ballColor: string;
  counterclockwise: boolean;
  constructor(ox: number, oy: number, lineColor: string, beginAngle: number, angleStep: number, ballColor: string, counterclockwise: boolean) {
    this.ox = ox;
    this.oy = oy;
    this.lineColor = lineColor;
    this.angle = beginAngle;
    this.angleStep = angleStep;
    this.ballColor = ballColor;
    this.counterclockwise = counterclockwise;
  }
  update() {
    this.angle = this.counterclockwise ? this.angle + this.angleStep : this.angle - this.angleStep;
  }
  draw(context: CanvasRenderingContext2D | null, radius: number, ballRadius: number) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.ox, this.oy);
    context.beginPath();
    context.strokeStyle = this.lineColor;
    context.arc(0, 0, radius, 0, 2 * Math.PI, false);
    context.stroke();

    context.beginPath();
    context.fillStyle = this.ballColor;
    context.arc(
      radius * Math.cos(this.angle),
      radius * Math.sin(this.angle),
      ballRadius,
      0,
      2 * Math.PI,
      false
    );
    context.fill();
    context.restore();
  }
}

export default class RotateConstructionAnimation extends Animate {
  baseRadius: number = 0;
  elementRadius: number = 0;
  ballRadius: number = 0;
  elementNumber: number = 18;
  option: IOption = {
    backgroundColor: '#000',
    lineColor: 'rgba(255, 255, 255, 0.5)',
    angleStep: Math.PI / 90
  };
  elements: Element[] = [];
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    const base = Math.min(this.width, this.height);
    this.baseRadius = base * 0.15;
    this.elementRadius = base * 0.3;
    this.ballRadius = base * 0.01;
    this.elements = [];
    const elementAngStep = 2 * Math.PI / this.elementNumber;
    const colorStep = 360 / this.elementNumber;
    for (let i = 0; i < this.elementNumber; i++) {
      this.elements.push(new Element(
        this.baseRadius * Math.cos(i * elementAngStep),
        this.baseRadius * Math.sin(i * elementAngStep),
        this.option.lineColor,
        -i * elementAngStep,
        this.option.angleStep,
        `hsla(${i * colorStep}, 80%, 60%, 1)`,
        false
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
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.elements.forEach((item) => item.draw(this.context, this.elementRadius, this.ballRadius));
    this.context.restore();
  }
}
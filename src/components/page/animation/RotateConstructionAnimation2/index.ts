import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  lineColor: string;
  angleStep: number;
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
  elements: Element[] = [];
  private option: IOption = {
    backgroundColor: '#000',
    lineColor: 'rgba(255, 255, 255, 0.5)',
    angleStep: Math.PI / 90
  };
  constructor(width: number, height: number, elementNumber: number) {
    super();
    this.initRect(width, height);
    this.elementNumber = elementNumber;
    this.initData();
    this.initElements();
  }

  private initData() {
    const base = Math.min(this.width, this.height);
    this.radius = 0.45 * base;
    this.ballRadius = 0.01 * base;
  }

  private initElements() {
    this.elements = [];
    const angleStep = Math.PI / this.elementNumber;
    const colorStep = 360 / this.elementNumber;
    for (let i = 0; i < this.elementNumber; i++) {
      this.elements.push(new Element(
        i * angleStep,
        this.option.lineColor,
        -i * angleStep,
        this.option.angleStep,
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
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.context.beginPath();
    this.context.strokeStyle = this.option.lineColor;
    this.context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
    this.context.stroke();
    this.elements.forEach((item) => item.draw(this.context, this.radius, this.ballRadius));
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

  public setElementNumber(elementNumber: number): this {
    this.elementNumber = elementNumber;
    this.initElements();
    return this;
  }
}
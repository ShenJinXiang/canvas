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
  constructor(ox: number, oy: number, lineLength: number, maxAngle: number, bottomAngleStep: number, ballColor: string) {
    this.ox = ox;
    this.oy = oy;
    this.lineLength = lineLength;
    this.ballColor = ballColor;
    // this.bottomRadius = bottomRadius;
    this.bottomRadius = this.lineLength * Math.sin(maxAngle);
    // this.bottomAngleStep = 0.5 * Math.PI / Math.sqrt(this.lineLength);
    this.bottomAngleStep = bottomAngleStep;
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
    lineColor: 'rgba(255, 255, 255, 0.3)'
  }
  private elementNumber: number = 0;
  private elements: Element[] = [];
  private origin: Point;
  private ballRadius: number = 0;
  constructor(width: number, height: number, elementNumber: number) {
    super();
    this.initRect(width, height);
    this.elementNumber = elementNumber;
    this.origin = { x: 0.5 * this.width, y: 10 };
    this.initData();
  }

  private initData() {
    this.ballRadius = this.height * 0.015;
    const colorStep = 360 / this.elementNumber;
    const baseAngle = 0.3 * Math.PI / Math.sqrt(this.height - 20);
    const angleStep = Math.PI / 2048;
    this.elements = [];
    for (let i: number = 0; i < this.elementNumber; i++) {
      this.elements.push(new Element(
        this.origin.x,
        this.origin.y,
        // Math.pow(0.3 * Math.PI / (baseAngle + (i * angleStep)), 2),
        this.height - 20 - (i * this.ballRadius),
        Math.PI / 12,
        baseAngle + (i * angleStep),
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
    this.initData();
    return this;
  }
}

/**
 * ax + b = k * y
 * a(x + 1) + b = k * z
 * angle = PI / Math.sqrt(l) 
 * Math.sqrt(l) = PI / angle,
 */
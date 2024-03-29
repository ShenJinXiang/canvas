import Animate from "@/lib/Animate";
import Point from "@/lib/Point";

interface IOption {
  backgroundColor: string;
  lineColors: string[];
  arrowStyle: string;
  arrowAngleStep: number;
};

class Element {
  private point: Point;
  private lineLength: number;
  private lineWidth: number;
  private lineStyle: string;
  private hasArrow: boolean = false;
  private arrowWidth: number = 0;
  private arrowHeight: number = 0;
  private arrowH: number = 0;
  private arrowStyle: string = '';
  private angle: number = 0;
  private angleStep: number = 0;
  constructor(point: Point, lineLength: number, lineWidth: number, lineStyle: string, hasArrow: boolean) {
    this.point = point;
    this.lineLength = lineLength;
    this.lineWidth = lineWidth;
    this.lineStyle = lineStyle;
    this.hasArrow = hasArrow;
  }

  arrow(arrowWidth: number, arrowHeight: number, arrowStyle: string, angle: number, angleStep: number) {
    this.arrowWidth = arrowWidth;
    this.arrowHeight = arrowHeight;
    this.arrowStyle = arrowStyle;
    this.angle = angle;
    this.angleStep = angleStep;
  }

  update() {
    if (this.hasArrow) {
      this.angle += this.angleStep;
      this.arrowH = this.arrowHeight * Math.sin(this.angle);
    }
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.point.x, this.point.y);
    context.beginPath();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.lineStyle;
    context.moveTo(0, 0);
    context.lineTo(0, this.lineLength);
    context.stroke();
    if (this.hasArrow) {
      context.strokeStyle = this.arrowStyle;
      context.lineCap = 'round';
      context.beginPath();
      context.moveTo(-this.arrowWidth, this.arrowH);
      context.lineTo(0, 0);
      context.lineTo(this.arrowWidth, this.arrowH);
      context.stroke();

      context.beginPath();
      context.moveTo(-this.arrowWidth, this.lineLength - this.arrowH);
      context.lineTo(0, this.lineLength);
      context.lineTo(this.arrowWidth, this.lineLength - this.arrowH);
      context.stroke();
    }
    context.restore();
  }
}

export default class VisualErrorAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#061928',
    lineColors: ['coral', 'Cyan'],
    arrowStyle: '#dddddd',
    arrowAngleStep: Math.PI / 40
  };
  private lineWidth: number = 1;
  private lineLength: number = 1;
  private lineSpace: number = 1;
  private elements: Element[] = [];
  private arrowWidth: number = 1;
  private arrowHeight: number = 1;
  private arrowAngleStep: number = 0;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
    this.initElements();
  }

  initData() {
    this.lineLength = this.height / 7;
    this.lineWidth = this.lineLength * 0.03;
    this.lineSpace = this.lineLength * 0.2;
    this.arrowWidth = this.lineSpace / 3;
    this.arrowHeight = this.lineLength / 4;
    this.initElements();
  }

  private initElements() {
    this.elements = [];
    for (let y = -this.lineLength / 2, yCount = 0, angle = 0; y < this.height + this.lineLength / 2; y += this.lineLength, yCount++, angle += Math.PI / 3) {
      for (let x = 2 * this.lineSpace / 3, ang = angle; x < this.width; x += this.lineSpace) {
        if (yCount % 2 === 0) {
          const element = new Element({ x, y }, this.lineLength, this.lineWidth, this.option.lineColors[0], true);
          element.arrow(this.arrowWidth, this.arrowHeight, this.option.arrowStyle, ang += 0.2, this.option.arrowAngleStep);
          this.elements.push(element);
        } else {
          this.elements.push(new Element(
            { x, y },
            this.lineLength,
            this.lineWidth,
            this.option.lineColors[1],
            false
          ));
        }
      }
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
    this.elements.forEach((item) => item.draw(this.context));
    this.context.restore();
  }
  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
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
  constructor(point: Point, lineLength: number, lineWidth: number, lineStyle: string) {
    this.point = point;
    this.lineLength = lineLength;
    this.lineWidth = lineWidth;
    this.lineStyle = lineStyle;
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
    context.restore();
  }
}

export default class VisualErrorAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#ccc',
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
  }

  initData() {
    this.lineLength = this.height / 7;
    this.lineWidth = this.lineLength * 0.03;
    this.lineSpace = this.lineLength * 0.2;
    this.arrowWidth = this.lineSpace / 3;
    this.arrowHeight = this.lineLength / 4;
    this.elements = [];
    for (let y = -this.lineLength / 2, yCount = 0; y < this.height + this.lineLength / 2; y += this.lineLength, yCount++) {
      for (let x = 2 * this.lineSpace / 3; x < this.width; x += this.lineSpace) {
        if (yCount % 2 === 0) {
          this.elements.push(new Element(
            { x, y },
            this.lineLength,
            this.lineWidth,
            this.option.lineColors[0]
          ));
        } else {
          this.elements.push(new Element(
            { x, y },
            this.lineLength,
            this.lineWidth,
            this.option.lineColors[1]
          ));
        }
      }
    }
    console.log(this.elements);
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
  }
}
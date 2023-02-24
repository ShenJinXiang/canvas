import Animate from "@/lib/Animate";
interface IOption {
  backgroundColor: string;
  lineColor: string;
};

class Element {
  ox: number;
  oy: number;
  radius: number;
  lineColor: string;
  constructor(ox: number, oy: number, radius: number, lineColor: string) {
    this.ox = ox;
    this.oy = oy;
    this.radius = radius;
    this.lineColor = lineColor;
  }
  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.ox, this.oy);
    context.beginPath();
    context.strokeStyle = this.lineColor;
    context.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
    context.stroke();
    context.restore();
  }
}

export default class RotateConstructionAnimation extends Animate {
  baseRadius: number = 0;
  elementRadius: number = 0;
  ballRadius: number = 0;
  elementNumber: number = 6;
  option: IOption = {
    backgroundColor: '#000',
    lineColor: 'rgba(255, 255, 255, 0.5)',
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
    for (let i = 0; i < this.elementNumber; i++) {
      this.elements.push(new Element(
        this.baseRadius * Math.cos(i * elementAngStep),
        this.baseRadius * Math.sin(i * elementAngStep),
        this.elementRadius,
        this.option.lineColor
      ));
    }
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.elements.forEach((item) => item.draw(this.context));
    this.context.restore();
  }
}
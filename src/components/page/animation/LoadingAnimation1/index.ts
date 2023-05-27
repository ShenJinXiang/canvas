import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  elementNumber: number;
  elementColors: string[];
  roStep: number;
};

class Element {
  rotate: number;
  currentRo: number;
  sinVal: number = 0;
  cosVal: number = 0;
  color: string;
  constructor(rotate: number, color: string, beginRo: number) {
    this.rotate = rotate;
    this.color = color;
    this.currentRo = beginRo;
    this.sinVal = Math.sin(this.currentRo);
    this.cosVal = Math.cos(this.currentRo);
  }

  update(roStep: number) {
    this.currentRo += roStep;
    this.sinVal = Math.sin(this.currentRo);
    this.cosVal = Math.cos(this.currentRo);
  }

  draw(context: CanvasRenderingContext2D | null, radius: number, size: number, sizeRange: number, range: number) {
    if (!context) {
      return;
    }
    context.save();
    context.beginPath();
    context.rotate(this.rotate);
    context.fillStyle = this.color;
    context.arc(radius + this.cosVal * range, 0, size + sizeRange * this.sinVal, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }
}
export default class LoadingAnimation extends Animate {

  radius: number = 0;
  elementSize: number = 0;
  elementSizeRange: number = 0;
  elementRange: number = 0;
  elements: Element[] = [];
  option: IOption = {
    backgroundColor: '#ddd',
    elementNumber: 36,
    elementColors: ['#000', '#fff'],
    // elementColors: ['hsla(0, 75%, 60%, 1)', 'hsla(120, 75%, 60%, 1)', 'hsla(240, 75%, 60%, 1)', 'hsla(280, 75%, 60%, 1)'],
    roStep: Math.PI / 30
  }

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData() {
    this.radius = Math.min(this.width, this.height) * 0.35;
    this.elementSize = this.radius * 0.04;
    this.elementRange = this.radius * 0.1;
    this.elementSizeRange = this.radius * 0.005;
    this.elements = [];
    const colorBeginRoStep = 2 * Math.PI / this.option.elementColors.length;
    const beginRoStep = 2 * Math.PI / (this.option.elementNumber / 6);
    const elementRotateStep = 2 * Math.PI / this.option.elementNumber;
    this.option.elementColors.forEach((color, index) => {
      for (let i = 0; i < this.option.elementNumber; i++) {
        this.elements.push(new Element(
          i * elementRotateStep,
          color,
          colorBeginRoStep * index + i * beginRoStep
        ));
      }
    });
  }

  update() {
    this.elements.forEach((item) => item.update(this.option.roStep));
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);

    this.elements.forEach((item) => {
      if (item.sinVal < 0) {
        item.draw(this.context, this.radius, this.elementSize, this.elementSizeRange, this.elementRange);
      }
    });
    this.elements.forEach((item) => {
      if (item.sinVal >= 0) {
        item.draw(this.context, this.radius, this.elementSize, this.elementSizeRange, this.elementRange);
      }
    });
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
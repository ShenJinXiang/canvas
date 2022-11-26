import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  outer: number;
  inner: number;
};
class ColorItem {
  sAngle: number;
  eAngle: number;
  iRadius: number;
  oRadius: number;
  fillStyle: string;
  constructor(sAngle: number, eAngle: number, iRadius: number, oRadius: number, fillStyle: string) {
    this.sAngle = sAngle;
    this.eAngle = eAngle;
    this.iRadius = iRadius;
    this.oRadius = oRadius;
    this.fillStyle = fillStyle;
  }

  draw(context: CanvasRenderingContext2D | null) {
    if (!context) {
      return;
    }
    context.save();
    context.beginPath();
    context.fillStyle = this.fillStyle;
    context.arc(0, 0, this.iRadius, this.sAngle, this.eAngle, false);
    context.lineTo(Math.cos(this.eAngle) * this.oRadius, Math.sin(this.eAngle) * this.oRadius);
    context.arc(0, 0, this.oRadius, this.eAngle, this.sAngle, true);
    context.closePath();
    context.fill();
    context.restore();
  }
}
export default class ColorTurntable extends Animate {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  width: number;
  height: number;
  option: IOption = {
    backgroundColor: '#f1f1f1',
    outer: 0.4,
    inner: 0.25
  };
  colorNumber: number = 0;
  outerRadius: number = 0;
  innerRadius: number = 0;
  outerItems: ColorItem[] = [];
  innerItems: ColorItem[] = [];
  angleStep: number = Math.PI / 180;
  innerAngle: number = 0;
  outerAngle: number = 0;
  angleSpeed: number = Math.PI / 360;
  innerSpeed: number = 0;
  outerSpeed: number = 0;
  constructor(width: number, height: number, colorNumber: number, innerSpeed: number, outerSpeed: number) {
    super();
    this.width = width;
    this.height = height;
    this.colorNumber = colorNumber;
    this.innerSpeed = innerSpeed;
    this.outerSpeed = outerSpeed;
    this.initData();
  }

  private initData(): this {
    const rectWidth = Math.min(this.width, this.height);
    this.innerRadius = rectWidth * this.option.inner;
    this.outerRadius = rectWidth * this.option.outer;
    this.outerItems = [];
    this.innerItems = [];
    const angleStep = 2 * Math.PI / this.colorNumber;
    const colorStep = 360 / this.colorNumber;
    for (let i = 0; i < this.colorNumber; i++) {
      this.outerItems.push(new ColorItem(angleStep * i, angleStep * (i + 1), this.innerRadius - 1, this.outerRadius, `hsla(${colorStep * i}, 100%, 50%, 1)`));
      this.innerItems.push(new ColorItem(angleStep * i, angleStep * (i + 1), 0, this.innerRadius, `hsla(${colorStep * i}, 100%, 50%, 1)`));
    }

    return this;
  }

  initCanvas(canvas: HTMLCanvasElement): this {
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }

  update(): void {
    this.outerAngle -= this.outerSpeed * this.angleSpeed;
    this.innerAngle += this.innerSpeed * this.angleSpeed;
  }

  draw(): void {
    if (!this.canvas || !this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.context.translate(this.width / 2, this.height / 2);
    this.drawOuter();
    this.drawShadow();
    this.drawInner();
    this.context.restore();
  }

  private drawOuter() {
    if (!this.canvas || !this.context) {
      return;
    }
    this.context.save();
    this.context.rotate(this.outerAngle);
    this.outerItems.forEach((item) => item.draw(this.context));
    this.context.restore();
  }
  private drawInner() {
    if (!this.canvas || !this.context) {
      return;
    }
    this.context.save();
    this.context.rotate(this.innerAngle);
    this.innerItems.forEach((item) => item.draw(this.context));
    this.context.restore();
  }
  private drawShadow() {
    if (!this.canvas || !this.context) {
      return;
    }
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    this.context.shadowColor = 'rgba(0, 0, 0, 0.5)'
    this.context.shadowOffsetX = 0;
    this.context.shadowOffsetY = 0;
    this.context.shadowBlur = this.innerRadius * 0.4;
    this.context.arc(0, 0, this.innerRadius - 1, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }
  private clear(): this {
    if (!this.canvas || !this.context) {
      return this;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.option.backgroundColor;
    this.context.fillRect(0, 0, this.width, this.height);
    return this;
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
  public setColorNumber(colorNumber: number): this {
    this.colorNumber = colorNumber;
    this.initData();
    return this;
  }
  public setInnerSpeed(innerSpeed: number): this {
    this.innerSpeed = innerSpeed;
    return this;
  }
  public setOuterSpeed(outerSpeed: number): this {
    this.outerSpeed = outerSpeed;
    return this;
  }

}

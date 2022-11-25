import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  colorNums: number;
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

  draw(context: CanvasRenderingContext2D | null, hasShadow: boolean = false) {
    if (!context) {
      return;
    }
    context.save();
    if (hasShadow) {
      context.shadowColor = 'rgba(0, 0, 0, 0.2)'
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = this.oRadius * 0.4;
    }
    context.beginPath();
    context.arc(0, 0, this.iRadius, this.sAngle, this.eAngle, false);
    context.lineTo(Math.cos(this.eAngle) * this.oRadius, Math.sin(this.eAngle) * this.oRadius);
    context.arc(0, 0, this.oRadius, this.eAngle, this.sAngle, true);
    context.closePath();
    context.fillStyle = this.fillStyle;
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
    colorNums: 3,
    outer: 0.4,
    inner: 0.25
  };
  outerRadius: number = 0;
  innerRadius: number = 0;
  outerItems: ColorItem[] = [];
  innerItems: ColorItem[] = [];
  angleStep: number = Math.PI / 180;
  innerAngle: number = 0;
  outerAngle: number = 0;
  angleSpeed: number = Math.PI / 360;
  innerAngleSpeeds: number = 0;
  outerAngleSpeeds: number = 0;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.initData();
  }

  private initData(): this {
    const rectWidth = Math.min(this.width, this.height);
    this.innerRadius = rectWidth * this.option.inner;
    this.outerRadius = rectWidth * this.option.outer;
    this.outerItems = [];
    this.innerItems = [];
    const angleStep = 2 * Math.PI / this.option.colorNums;
    const colorStep = 360 / this.option.colorNums;
    for (let i = 0; i < this.option.colorNums; i++) {
      this.outerItems.push(new ColorItem(angleStep * i, angleStep * (i + 1), this.innerRadius, this.outerRadius, `hsla(${colorStep * i}, 100%, 50%, 1)`));
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
    this.outerAngle -= this.outerAngleSpeeds * this.angleSpeed;
    this.innerAngle += this.innerAngleSpeeds * this.angleSpeed;
  }

  draw(): void {
    if (!this.canvas || !this.context) {
      return;
    }
    this.clear();
    this.context.save();
    this.context.translate(this.width / 2, this.height / 2);
    this.drawOuter();
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
    this.innerItems.forEach((item) => item.draw(this.context, true));
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

}

import BaseCanvas from "@/lib/BaseCanvas";
import Point from "@/lib/Point";

interface IOption {
  backgroundColor: string;
  showColor: string;
  minSize: number
}

class Element {
  private x: number;
  private y: number;
  private radius: number;
  private ps: Point[] = [];
  private ps1: Point[] = [];
  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.initData();
  }
  private initData() {
    this.ps = [];
    const angleStep = 2 * Math.PI / 6;
    const beginAngle = -Math.PI / 2;
    for (let i = 0; i < 6; i++) {
      this.ps.push({
        x: this.radius * Math.cos(beginAngle + i * angleStep),
        y: this.radius * Math.sin(beginAngle + i * angleStep)
      });
    }
    const base = this.radius / 6;

    this.ps1 = [];
    const angleStep1 = 2 * Math.PI / 3;
    const beginAngle1 = - Math.PI;
    for (let i = 0; i < 3; i++) {
      this.ps1.push({
        x: base * Math.cos(beginAngle1 + i * angleStep1),
        y: base * Math.sin(beginAngle1 + i * angleStep1)
      });
    }
  }

  draw(context: CanvasRenderingContext2D | null, showColor: string) {
    if (!context) {
      return;
    }

    context.save();
    context.translate(this.x, this.y);
    context.strokeStyle = showColor;
    context.beginPath();
    this.ps.forEach(item => context.lineTo(item.x, item.y));
    context.closePath();
    context.stroke();

    context.beginPath();
    this.ps1.forEach(item => context.lineTo(item.x, item.y));
    context.closePath();
    context.stroke();

    context.restore();
  }
}

export default class Background extends BaseCanvas {
  private static readonly option: IOption = {
    backgroundColor: '#000',
    showColor: '#fff',
    minSize: 40
  };
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.markCanvas.setStyle('rgba(250, 250, 250, 0.5)');
    this.initData();
  }

  private initData() {

  }

  public draw() {
    if (!this.context) {
      return;
    }
    const ele: Element = new Element(this.width * 0.5, this.height * 0.5, 100);
    this.clear(Background.option.backgroundColor);
    this.context.save();

    this.context.strokeStyle = '#fff';
    this.context.beginPath();
    this.context.moveTo(0, 0.5 * this.height);
    this.context.lineTo(this.width, 0.5 * this.height);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(0.5 * this.width, 0);
    this.context.lineTo(0.5 * this.width, this.height);
    this.context.stroke();

    ele.draw(this.context, Background.option.showColor);
    this.context.restore();
    this.drawMark();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
  backgroundColor: string;
  showColor: string;
  ratio: number;
  minSize: number
}

class Element {
  private x: number;
  private y: number;
  private xr: number;
  private yr: number;
  constructor(x:number, y: number, xr: number, yr: number) {
    this.x = x;
    this.y = y;
    this.xr = xr;
    this.yr = yr;
  }

  draw(context: CanvasRenderingContext2D | null, showColor: string, lineWidth: number) {
    if (!context) {
      return;
    }

    const xRatio = 0.7;
    const yRatio = 0.6;

    context.save();
    context.lineWidth = lineWidth;
    context.strokeStyle = showColor;
    context.translate(this.x, this.y);
    context.beginPath();
    context.moveTo(this.xr, 0);
    context.bezierCurveTo(this.xr * xRatio, this.yr * yRatio, this.xr * (1- xRatio), this.yr * (1-yRatio), 0, this.yr);
    context.bezierCurveTo(-this.xr * (1-xRatio), this.yr * (1-yRatio), -this.xr * xRatio, this.yr * yRatio, -this.xr, 0);
    context.bezierCurveTo(-this.xr * xRatio, -this.yr * yRatio, -this.xr * (1-xRatio), -this.yr * (1-yRatio), 0, -this.yr);
    context.bezierCurveTo(this.xr * (1-xRatio), -this.yr * (1-yRatio), this.xr * xRatio, -this.yr * yRatio, this.xr, 0);
    context.closePath();
    context.stroke();
    const r = this.xr * 0.2;
    this.arc(context, this.xr, 0, r, showColor);
    this.arc(context, 0, this.yr, r, showColor);
    this.arc(context, -this.xr, 0, r, showColor);
    this.arc(context, 0, -this.yr, r, showColor);
    context.restore();
  }
  private arc(context:CanvasRenderingContext2D, x: number, y: number, r: number, showColor: string) {
    if (!context) {
      return;
    }
    context.save();
    context.fillStyle = showColor;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
  }
}

export default class Background extends BaseCanvas {
  private static OPTION: IOption = {
    backgroundColor: '#000',
    showColor: '#fff',
    ratio: 1.4,
    minSize: 10
  };
  private elements: Element[] = [];
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.markCanvas.setStyle('rgba(250, 250, 250, 0.5)');
    this.initData();
  }

  private initData() {
    this.elements = [];
    const base = this.width * 0.01;
    const ratio = Background.OPTION.ratio;
    for (let w = 0; w < this.width + base * 2; w += base * 2) {
      for (let h = 0; h < this.height + base * ratio * 2; h += base * ratio * 2) {
        this.elements.push(new Element(w, h, base, base * ratio));
      }
    }

  }

  public draw() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.clear(Background.OPTION.backgroundColor);
    this.elements.forEach(item => item.draw(this.context, Background.OPTION.showColor, 1));
    this.context.restore();
    this.drawMark();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
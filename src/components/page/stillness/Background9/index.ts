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
  private element: Element;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.markCanvas.setStyle('rgba(250, 250, 250, 0.5)');
    this.initData();
    this.element = new Element(this.width / 2, this.height / 2, 100, 100 * Background.OPTION.ratio);
  }

  private initData() {

  }

  public draw() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.clear(Background.OPTION.backgroundColor);
    this.element.draw(this.context, Background.OPTION.showColor, 2);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
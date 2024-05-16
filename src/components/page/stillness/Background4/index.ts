import BaseCanvas from "@/lib/BaseCanvas";

interface IOption {
  backgroundColor: string;
  showColor: string;
  minSize: number;
}

class Element {
  private x: number;
  private y: number;
  private size: number;
  private p: number;
  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.p = this.size / 8;
  }
  draw(context: CanvasRenderingContext2D | null, showColor: string, backgroundColor: string) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.x, this.y);
    context.beginPath();
    context.fillStyle = showColor;
    context.rotate(-3 * Math.PI / 4);

    context.translate(-0.5 * this.size + 0.5 * this.p, -0.5 * this.size + 0.5 * this.p);
    context.fillStyle = showColor;
    context.fillRect(0, 0, 7 * this.p, 7 * this.p);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 6 * this.p, 6 * this.p);
    context.fillStyle = showColor;
    context.fillRect(0, 0, 5 * this.p, 5 * this.p);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 4 * this.p, 4 * this.p);
    context.fillStyle = showColor;
    context.fillRect(0, 0, 3 * this.p, 3 * this.p);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, 2 * this.p, 2 * this.p);
    context.fillStyle = showColor;
    context.fillRect(0, 0, this.p, this.p);
    context.restore();
  }
}

export default class Background extends BaseCanvas {
  private elements: Element[] = [];
  private static readonly OPTION: IOption = {
    backgroundColor: '#000',
    showColor: '#f1f1f1',
    minSize: 50
  }
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.elements = [
      new Element(0.5 * this.width, 0.5 * this.height, 100),
    ];
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(Background.OPTION.backgroundColor);
    this.context.save();
    this.elements.forEach(element => element.draw(this.context, Background.OPTION.showColor, Background.OPTION.backgroundColor));
    this.context.restore();
    this.drawMark();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
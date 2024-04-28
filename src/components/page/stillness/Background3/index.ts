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
    this.p = this.size / 24;
  }
  draw(context: CanvasRenderingContext2D | null, showColor: string) {
    if (!context) {
      return;
    }
    const lineWidth = 10;
    context.save();
    context.translate(this.x, this.y);
    // context.lineWidth = lineWidth;
    context.strokeStyle = showColor;
    // context.strokeRect(-0.5 * this.size + 0.5 * lineWidth, -0.5 * this.size + 0.5 * lineWidth, this.size - lineWidth, this.size - lineWidth);
    context.lineWidth = this.p;

    for (let i = 0; i < 6; i++) {
      const s = (i * 2 + 0.5) * this.p;
      context.strokeRect(-s, -s, 2 * s, 2 * s);
    }
    // context.strokeRect(-2.5 * this.p, -2.5 * this.p, 5 * this.p, 5 * this.p);

    // context.strokeStyle = 'red';
    // context.lineWidth = 1;
    // context.strokeRect(-0.5 * this.size, -0.5 * this.size, this.size, this.size);
    context.restore();
  }
}

export default class Background extends BaseCanvas {
  private static readonly OPTION: IOption = {
    backgroundColor: '#000',
    showColor: '#f1f1f1',
    minSize: 30
  }
  private elements: Element[] = [];
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.elements = [
      new Element(0.5 * this.width, 0.5 * this.height, 100)
    ]
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(Background.OPTION.backgroundColor);
    this.context.save();
    this.elements.forEach((item) => item.draw(this.context, Background.OPTION.showColor));
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
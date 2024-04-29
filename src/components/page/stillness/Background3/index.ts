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
    this.p = this.size / 23;
  }
  draw(context: CanvasRenderingContext2D | null, showColor: string) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.x, this.y);
    context.strokeStyle = showColor;
    context.lineWidth = this.p;
    for (let i = 0; i < 6; i++) {
      const s = (i * 2 + 0.5) * this.p;
      context.strokeRect(-s, -s, 2 * s, 2 * s);
    }
    context.restore();
  }
}

export default class Background extends BaseCanvas {
  private static readonly OPTION: IOption = {
    backgroundColor: '#000',
    showColor: '#f1f1f1',
    minSize: 50
  }
  private elements: Element[] = [];
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.elements = [];
    let size = Math.min(this.width, this.height) / 12;
    size = size < Background.OPTION.minSize ? Background.OPTION.minSize : size;
    for (let i = 0; i * size < this.width + size; i++) {
      for (let j = 0; j * size < this.height + size; j++) {
        this.elements.push(new Element(i * size, j * size, size));
      }
    }
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.clear(Background.OPTION.backgroundColor);
    this.context.save();
    this.elements.forEach((item) => item.draw(this.context, Background.OPTION.showColor));
    this.drawMark();
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
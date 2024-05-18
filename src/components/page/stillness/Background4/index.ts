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
    context.strokeStyle = showColor;
    // context.strokeRect(-0.5 * this.size, -0.5 * this.size, this.size, this.size);

    context.translate(-0.5 * this.size + 0.5 * this.p, -0.5 * this.size + 0.5 * this.p);
    context.lineWidth = this.p;
    for (let i = 0; i < 8; i += 2) {
      const n = i + 0.5;
      context.beginPath();
      context.moveTo(n * this.p, 0);
      context.lineTo(n * this.p, n * this.p)
      context.lineTo(0, n * this.p)
      context.stroke();
    }

    // for (let i = 7; i >= 0; i -= 1) {
    //   context.fillStyle = i % 2 === 0 ? backgroundColor : showColor;
    //   context.fillRect(0, 0, i * this.p, i * this.p);
    // }
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
    this.elements = [];
    let size = Math.min(this.width, this.height) / 12;
    size = size < Background.OPTION.minSize ? Background.OPTION.minSize : size;
    for (let i = 0; i * size < this.width + size; i++) {
      for (let j = 0; j * size < this.height + size; j++) {
        this.elements.push(new Element(i * size, j * size, size / Math.sqrt(2)));
        this.elements.push(new Element((i + 0.5) * size, (j + 0.5) * size, size / Math.sqrt(2)));
      }
    }
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
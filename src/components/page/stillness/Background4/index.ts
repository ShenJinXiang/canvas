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
    this.p = this.size / 7.5;
  }
  draw(context: CanvasRenderingContext2D | null, showColor: string) {
    if (!context) {
      return;
    }
    context.save();
    context.translate(this.x, this.y);
    context.beginPath();
    context.fillStyle = showColor;
    context.rotate(Math.PI / 4);

    context.strokeStyle = showColor;
    context.strokeRect(-0.5 * this.size, -0.5 * this.size, this.size, this.size);
    context.moveTo(0, 0);
    context.lineTo(this.size / 2, this.size / 2);
    context.stroke();
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
    this.elements.forEach(element => element.draw(this.context, Background.OPTION.showColor));
    this.context.restore();
    this.drawMark();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
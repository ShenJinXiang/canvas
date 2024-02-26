import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
};

class Element {
  private ox: number;
  private oy: number;
  private radius: number;
  private color: string;
  private sideNum: number;
  constructor(ox: number, oy: number, radius: number, color: string, sideNum: number) {
    this.ox = ox;
    this.oy = oy;
    this.radius = radius;
    this.color = color;
    this.sideNum = sideNum;
  }
  draw(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.translate(this.ox, this.oy);
    ctx.scale(this.radius, this.radius);
    ctx.rotate(-Math.PI / 2);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    let step = 2 * Math.PI / this.sideNum;
    for (let i = 0; i < this.sideNum; i++) {
        ctx.lineTo(Math.cos(i * step), Math.sin(i * step));
    }
    ctx.fill();
    ctx.restore();
  }
}

export default class FractalImage extends Animate {
  private static readonly option: IOption = {
    backgroundColor: '#000',
  };
  elements: Element[] = [];
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }
  initData() {
    this.elements = [
      new Element(0.5 * this.width, 0.5 * this.height, 0.2 * this.height, 'red', 3),
    ];
  }
  draw(): void {
    if (!this.context) {
        return;
    }
    this.clear(FractalImage.option.backgroundColor);
    this.context.save();
    this.elements.forEach((item) => item.draw(this.context));
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
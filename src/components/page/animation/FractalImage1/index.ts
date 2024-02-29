import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string;
  deepNum: number;
  color: string;
  timeStep: number;
};

class Element {
  private static readonly rotate: number = -Math.PI / 2;
  private ox: number;
  private oy: number;
  private radius: number;
  private color: string;
  private sideNum: number;
  private step: number;

  constructor(ox: number, oy: number, radius: number, color: string, sideNum: number) {
    this.ox = ox;
    this.oy = oy;
    this.radius = radius;
    this.color = color;
    this.sideNum = sideNum;
    this.step = 2 * Math.PI / this.sideNum;
  }
  draw(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) {
      return;
    }
    ctx.save();
    ctx.translate(this.ox, this.oy);
    ctx.scale(this.radius, this.radius);
    ctx.rotate(Element.rotate);
    ctx.beginPath();
    ctx.fillStyle = this.color;
    for (let i = 0; i < this.sideNum; i++) {
        ctx.lineTo(Math.cos(i * this.step), Math.sin(i * this.step));
    }
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  children(): Element[] {
    const r = this.radius / 3;
    const children = [
      new Element(this.ox, this.oy, r, this.color, this.sideNum),
      ...Array.from({ length: this.sideNum}, (_, i) => {
        const angle = Element.rotate + i * this.step;
        return new Element(
          this.ox + r * 2 * Math.cos(angle),
          this.oy + r * 2 * Math.sin(angle),
          r, this.color, this.sideNum
        );
      })
    ];
    return children;
  }
}

export default class FractalImage extends Animate {
  private static readonly option: IOption = {
    backgroundColor: '#fff',
    deepNum: 6,
    color: '#0075c9',
    timeStep: 100,
  };
  private sideNum: number = 6;
  private elementGroups: Element[][] = [];
  private currentIndex: number = 0;
  private current: number = 0;
  constructor(width: number, height: number, sideNum: number) {
    super();
    this.sideNum = sideNum;
    this.initRect(width, height);
    this.initData();
  }
  initData() {
    this.initElementGroups();
  }
  initElementGroups() {
    this.elementGroups = [];
    for (let i = 0; i < FractalImage.option.deepNum; i++) {
        let eles: Element[] = [];
        if (i == 0) {
            eles.push(new Element(this.width / 2, this.height / 2, Math.min(this.width, this.height) * 0.45, FractalImage.option.color, this.sideNum));
        } else {
            this.elementGroups[i - 1].forEach(item => eles.push(...item.children()));
        }
        this.elementGroups.push(eles);
    }
  }
  update(): void {
    this.current++;
    if (this.current >= FractalImage.option.timeStep) {
        this.current = 0;
        this.isDraw = true;
        this.currentIndex++;
        if (this.currentIndex >= FractalImage.option.deepNum) {
            this.currentIndex = 0;
        }
    } else {
        this.isDraw = false;
    }
  }
  draw(): void {
    if (!this.context) {
        return;
    }
    this.clear(FractalImage.option.backgroundColor);
    this.context.save();
    this.elementGroups[this.currentIndex].forEach((item) => item.draw(this.context));
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }

  public setSideNum(sideNum: number) {
    if (this.sideNum !== sideNum) {
      this.sideNum = sideNum;
      this.initData();
    }
  }
}
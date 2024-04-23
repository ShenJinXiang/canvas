import Animate from "@/lib/Animate";
import { StrokeOption } from "@/lib/DrawOption";

interface IOption {
  backgroundColor: string;
  lineWidth: number;
  lineColor: string;
}

class Element {
  private x: number;
  private y: number;
  private len: number;
  private angle: number;
  private current: number;
  private time: number;
  private lenStep: number;
  constructor(x: number, y: number, len: number, angle: number, time: number) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.angle = angle;
    this.time = time;
    this.current = 0;
    this.lenStep = this.len / (2 * this.time);
  }

  update() {
    if (this.current < this.time) {
      this.current += 1;
    }
  }

  draw(context: CanvasRenderingContext2D|null, { lineWidth = 1, strokeStyle = 'red' }: StrokeOption) {
    if (!context) {
      return;
    }
    context.save();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.beginPath();
    context.moveTo(-this.lenStep * this.current, 0);
    context.lineTo(this.lenStep * this.current, 0);
    context.stroke();
    context.restore();
  }
}

export default class FractalImage extends Animate {
  private static readonly OPTION: IOption = {
    backgroundColor: '#f1f1f1',
    lineWidth: 1,
    lineColor: '#0075c9'
  }
  private element: Element|null = null;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.element = new Element(this.width / 2, this.height / 2, 400, 0, 100);
  }

  update() {
    this.element?.update();
  }

  draw(): void {
    if (!this.context) {
        return;
    }
    this.clear(FractalImage.OPTION.backgroundColor);
    this.context.save();
    if (this.element) {
      this.element.draw(this.context, {
        lineWidth: FractalImage.OPTION.lineWidth,
        strokeStyle: FractalImage.OPTION.lineColor
      });
    }
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
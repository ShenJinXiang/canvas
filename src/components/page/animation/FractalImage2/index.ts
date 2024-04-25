import Animate from "@/lib/Animate";
import { StrokeOption } from "@/lib/DrawOption";

interface IOption {
  backgroundColor: string;
  lineWidth: number;
  lineColor: string;
  ratio: number;
  deepNum: number;
  time: number;
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

  draw(context: CanvasRenderingContext2D | null, { lineWidth = 1, strokeStyle = 'red' }: StrokeOption) {
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

  setCurrent(current: number) {
    this.current = current;
  }

  setComplete() {
    this.current = this.time;
  }

  children(ratio: number): Element[] {
    const len = this.len * ratio;
    const angle = this.angle + Math.PI / 2;
    return [
      new Element(
        this.x + 0.5 * this.len * Math.cos(this.angle),
        this.y + 0.5 * this.len * Math.sin(this.angle),
        len,
        angle,
        this.time
      ),
      new Element(
        this.x - 0.5 * this.len * Math.cos(this.angle),
        this.y - 0.5 * this.len * Math.sin(this.angle),
        len,
        angle,
        this.time
      )
    ]

  }
}

export default class FractalImage extends Animate {
  private static readonly OPTION: IOption = {
    backgroundColor: '#f1f1f1',
    lineWidth: 1,
    lineColor: '#0075c9',
    ratio: 0.7,
    deepNum: 13,
    time: 50
  }
  private elementGroup: Element[][] = [];
  private currentDeep: number = 0;
  private currentTime: number = 0;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.currentDeep = 0;
    this.currentTime = 0;
    this.initElementGroup();
  }

  initElementGroup() {
    this.elementGroup = [];
    for (let i = 0; i < FractalImage.OPTION.deepNum; i++) {
      const eles: Element[] = [];
      if (i === 0) {
        eles.push(new Element(this.width / 2, this.height / 2, this.width / 2.2, 0, FractalImage.OPTION.time));
      } else {
        this.elementGroup[i - 1].forEach(item => eles.push(...item.children(FractalImage.OPTION.ratio)));
      }
      this.elementGroup.push(eles);
    }
  }

  update() {
    this.elementGroup.forEach((item, index) => {
      if (this.currentDeep === index) {
        item.forEach(ele => ele.update());
      }
      if (this.currentDeep > index) {
        item.forEach(ele => ele.setComplete());
      }
    });
    this.currentTime++;
    if (this.currentTime >= FractalImage.OPTION.time) {
      this.currentTime = 0;
      this.currentDeep++;
      if (this.currentDeep >= FractalImage.OPTION.deepNum) {
        this.currentDeep = 0;
        this.elementGroup.forEach((item) => {
          item.forEach(ele => ele.setCurrent(0))
        })
      }
    }
  }

  draw(): void {
    if (!this.context) {
      return;
    }
    this.clear(FractalImage.OPTION.backgroundColor);
    this.context.save();
    this.elementGroup.forEach((item, index) => {
      if (this.currentDeep >= index) {
        item.forEach(ele => ele.draw(this.context, {
          lineWidth: FractalImage.OPTION.lineWidth,
          strokeStyle: FractalImage.OPTION.lineColor
        }));
      }
    });
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
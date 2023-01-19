import Animate from "@/lib/Animate";
import { random } from "@/lib/Kit";
interface IOption {
  minV: number;
  maxV: number;
};

class Laster {
  x: number;
  y: number;
  v: number;
  len: number = 200;
  constructor(x: number, y: number, v: number) {
    this.x = x;
    this.y = y;
    this.v = v;
  }

  draw(context: CanvasRenderingContext2D | null, alpha: number) {
    if (!context) {
      return;
    }
    context.save();
    const grad = context.createLinearGradient(this.x, this.y, this.x, this.y + this.len);
    grad.addColorStop(0, `hsla(340, 100%, 100%, ${alpha})`);
    grad.addColorStop(1, `hsla(340, 100%, 50%, 0)`);
    context.strokeStyle = grad;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.len);
    context.stroke();
    context.restore();
  }
}
export default class LaserEffect extends Animate {
  width: number;
  height: number;
  option: IOption = {
    maxV: 3,
    minV: 1
  };
  lasterNum: number;
  lasters: Laster[] = [];
  constructor(width: number, height: number, lasterNum: number) {
    super();
    this.width = width;
    this.height = height;
    this.lasterNum = lasterNum;
    this.initData();
  }
  initData(): this {
    this.lasters = [];
    for (let i = 0; i < this.lasterNum; i++) {
      this.lasters.push(new Laster(
        random(this.width),
        random(this.height),
        random(this.option.minV, this.option.maxV)
      ));
    }
    return this;
  }
  initCanvas(canvas: HTMLCanvasElement): this {
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    return this;
  }

  update(): void {
    this.lasters.forEach((item) => {
      item.y -= item.v;
      if (item.y + item.len < 0) {
        item.y = this.height;
      }
    })
  }

  draw(): void {
    if (!this.context) {
      return;
    }
    this.clear('hsl(261,43%,7%)');
    this.lasters.forEach((item) => item.draw(this.context, 1 - (this.height - item.y) / this.height * 0.8));
  }

  public setRect(width: number, height: number): this {
    this.width = width;
    this.height = height;
    if (this.canvas) {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    this.initData();
    return this;
  }
  public setLasterNumber(lasterNumber: number): this {
    this.lasterNum = lasterNumber;
    this.initData();
    return this;
  }

}
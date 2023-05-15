import Animate from "@/lib/Animate";

interface IOption {
  backgroundColor: string
}

export default class RotateConstructionAnimation extends Animate {
  private option: IOption = {
    backgroundColor: '#061928',
  };
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData(): this {
    return this;
  }

  draw(): void {
    if (!this.context) {
      return;
    }
    this.clear(this.option.backgroundColor);
    this.context.save();
    this.context.translate(0.5 * this.width, 0.5 * this.height);
    this.context.fillStyle = 'red';
    this.context.fillRect(-120, -80, 240, 160);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
import Animate from "@/lib/Animate";

interface IOption {
  background: string;
}

export default class CardioidAnimation extends Animate {
  private static readonly OPTION: IOption = {
    background: "#000",
  };
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }
  private initData() {
  }
  draw() {
    if (!this.context) {
      return;
    }
    this.clear(CardioidAnimation.OPTION.background);
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 100, 200, 136);
    this.context.restore();
  }
  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
import Animate from "@/lib/Animate";

export default class CardioidAnimation extends Animate {

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
    this.clear();
    this.context.save();
    this.context.translate(0.5 * this.width, 0.45 * this.height);
    this.context.fillStyle = '#084';
    this.context.fillRect(-140, -50, 280, 100);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }

}
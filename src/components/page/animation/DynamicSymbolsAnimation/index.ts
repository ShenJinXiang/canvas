import Animate from "@/lib/Animate";

export default class DynamicSymbolsAnimation extends Animate {

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {

  }

  draw() {
    if (!this.context) {
      return;
    }

    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(100, 200, 200, 120);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
  
}
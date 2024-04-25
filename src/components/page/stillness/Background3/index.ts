import BaseCanvas from "@/lib/BaseCanvas";

export default class Background extends BaseCanvas {
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
    this.clear();
    this.context.save();
    this.context.fillStyle = 'red';
    this.context.fillRect(200, 200, 100, 80);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
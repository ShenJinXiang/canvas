import BaseCanvas from "@/lib/BaseCanvas";

export default class ColorBoard extends BaseCanvas {
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
  }

  draw() {
    if (!this.context) {
      return;
    }

    this.context.save();
    this.context.fillStyle = '#084';
    this.context.fillRect(100, 100, 200, 140);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
  }
}
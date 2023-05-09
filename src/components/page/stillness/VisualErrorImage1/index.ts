import BaseCanvas from "@/lib/BaseCanvas";

export default class VisualErrorImage extends BaseCanvas {

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  private initData(): this {
    return this;
  }

  draw() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.strokeStyle = '#084';
    this.context.lineWidth = 2;
    this.context.strokeRect(200, 200, 400, 320);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
  }
}
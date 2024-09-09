import BaseCanvas from "@/lib/BaseCanvas";

export default class Background extends BaseCanvas {

  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.markCanvas.setStyle('rgba(250, 250, 250, 0.5)');
    this.initData();
  }

  private initData() {

  }

  public draw() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.fillStyle = '#084';
    this.context.fillRect(200, 200, 400, 320);
    this.context.restore();
    this.drawMark();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}
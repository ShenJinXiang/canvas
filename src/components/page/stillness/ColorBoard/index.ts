import BaseCanvas from "@/lib/BaseCanvas";

export default class ColorBoard extends BaseCanvas {
  private ox: number = 0;
  private oy: number = 0;
  constructor(width: number, height: number) {
    super();
    this.initRect(width, height);
    this.initData();
  }

  initData() {
    this.ox = 0.5 * this.width;
    this.oy = 0.5 * this.height;
  }

  draw() {
    if (!this.context) {
      return;
    }

    this.context.save();
    this.context.translate(this.ox, this.oy);
    const imageData = this.context.createImageData(this.width, this.height);
    const pixelData = imageData.data;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
          let p = y * this.width + x;
          pixelData[4 * p] = Math.pow(Math.cos(Math.atan2(x - this.ox, y - this.oy) / 2), 2) * 255;
          pixelData[4 * p + 1] = Math.pow(Math.cos(Math.atan2(x - this.ox, y - this.oy) / 2 - 2 * Math.acos(-1) / 3), 2) * 255;
          pixelData[4 * p + 2] = Math.pow(Math.cos(Math.atan2(x - this.ox, y - this.oy) / 2 + 2 * Math.acos(-1) / 3), 2) * 255;
          pixelData[4 * p + 3] = 255;
      }
    }
    this.context.putImageData(imageData, 0, 0, 0, 0, this.width, this.height);
    this.context.restore();
  }

  public setRect(width: number, height: number) {
    this.initRect(width, height);
    this.initData();
    this.draw();
  }
}